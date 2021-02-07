use crate::schema::questions;
use crate::utils::database::get_conn;
use async_graphql::*;
use diesel::prelude::*;

#[derive(InputObject, Insertable)]
#[table_name = "questions"]
pub struct QuestionInput {
  pub title: String,
  pub body: String,
}

#[derive(SimpleObject, Identifiable, Queryable, PartialEq, Debug)]
pub struct Question {
  pub id: i32,
  pub title: String,
  pub body: String,
}

#[derive(Default)]
pub struct QuestionsQuery;

#[Object]
impl QuestionsQuery {
  async fn get_questions(
    &self,
    ctx: &Context<'_>,
    limit: Option<i32>,
    offset: Option<i32>,
  ) -> Vec<Question> {
    use crate::schema::questions::dsl::*;

    let limit: i64 = limit.unwrap_or(50).into();
    let offset: i64 = offset.unwrap_or(0).into();

    questions
      .limit(limit)
      .offset(offset)
      .load(&get_conn(ctx))
      .expect("Can't get questions")
  }
}

#[derive(Default)]
pub struct QuestionsMutation;

#[Object]
impl QuestionsMutation {
  async fn create_question(
    &self,
    ctx: &Context<'_>,
    title: String,
    body: String,
  ) -> Result<Question, Error> {
    let new_question = QuestionInput { title, body };

    let created_question_entity = diesel::insert_into(questions::table)
      .values(&new_question)
      .get_result(&get_conn(ctx))
      .expect("Error saving new post");

    Ok(Question::from(created_question_entity))
  }
}
