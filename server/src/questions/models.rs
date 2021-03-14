use crate::graphql::DBLoader;
use crate::schema::questions;
use crate::utils::database::get_conn;
use crate::{
    auth::models::{Claims, Role, RoleGuard},
    users::models::User,
};
use async_graphql::dataloader::Loader;
use async_graphql::guard::Guard;
use async_graphql::*;
use chrono::NaiveDateTime;
use diesel::dsl::any;
use diesel::prelude::*;
use std::collections::HashMap;

#[derive(InputObject, Insertable)]
#[table_name = "questions"]
pub struct QuestionInput {
    pub user_id: i32,
    pub title: String,
    pub body: String,
}

#[derive(Identifiable, Queryable, PartialEq, Clone, Debug)]
pub struct Question {
    pub id: i32,
    pub user_id: i32,
    pub title: String,
    pub body: String,
    pub updated_at: NaiveDateTime,
    pub created_at: NaiveDateTime,
}

impl Question {
    pub fn list(
        ctx: &Context<'_>,
        limit: Option<i32>,
        offset: Option<i32>,
    ) -> Result<Vec<Question>, Error> {
        use crate::schema::questions::dsl::*;

        let limit: i64 = limit.unwrap_or(50).into();
        let offset: i64 = offset.unwrap_or(0).into();

        Ok(questions
            .order(id.desc())
            .limit(limit)
            .offset(offset)
            .load(&get_conn(ctx))?)
    }

    pub fn creator(&self, ctx: &Context<'_>) -> Result<User, Error> {
        use crate::schema::users::dsl::*;

        let user = users
            .find(self.user_id)
            .get_result::<User>(&get_conn(ctx))?;

        Ok(user)
    }
}

#[derive(Default)]
pub struct QuestionsMutation;

#[Object]
impl QuestionsMutation {
    #[graphql(guard(RoleGuard(role = "Role::User")))]
    async fn create_question(
        &self,
        ctx: &Context<'_>,
        title: String,
        body: String,
    ) -> Result<Question, Error> {
        let claims = &ctx.data::<Claims>()?;

        println!("ctx_data claims {:?}", claims);

        let new_question = QuestionInput {
            user_id: claims.sub,
            title,
            body,
        };

        let created_question_entity = diesel::insert_into(questions::table)
            .values(&new_question)
            .get_result(&get_conn(ctx))?;

        Ok(created_question_entity)
    }

    /// Mutation returns 1 if deleted question by id or 0 if question not found
    async fn delete_question(&self, ctx: &Context<'_>, question_id: i32) -> Result<usize, Error> {
        use crate::schema::questions::dsl::*;

        Ok(diesel::delete(questions.filter(id.eq(&question_id))).execute(&get_conn(ctx))?)
    }
}

#[async_trait::async_trait]
impl Loader<i32> for DBLoader {
    type Value = Question;
    type Error = Error;

    async fn load(&self, keys: &[i32]) -> Result<HashMap<i32, Self::Value>, Self::Error> {
        let conn = self.pool.get().expect("Can't get DB connection");

        let questions_entities = questions::table
            .filter(questions::id.eq(any(keys)))
            .load(&conn)
            .expect("Can't get questions");

        Ok(questions_entities
            .iter()
            .map(|question: &Self::Value| (question.id, Question::from(question.clone())))
            .collect::<HashMap<_, _>>())
    }
}
