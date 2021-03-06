use crate::questions::models::Question;
use crate::schema::{interviews, interviews_questions, questions};
use crate::utils::database::get_conn;
// use crate::DBLoader;
// use async_graphql::dataloader::DataLoader;
use async_graphql::*;
use diesel::prelude::*;

#[derive(Identifiable, Queryable, PartialEq, Debug)]
#[table_name = "interviews"]
pub struct Interview {
    id: i32,
    title: String,
    description: Option<String>,
    status: String,
}

#[Object]
impl Interview {
    async fn id(&self) -> i32 {
        self.id
    }

    async fn title(&self) -> String {
        self.title.to_string()
    }

    async fn description(&self) -> &Option<String> {
        &self.description
    }

    async fn status(&self) -> String {
        self.status.to_string()
    }

    async fn questions(&self, ctx: &Context<'_>) -> Vec<Question> {
        // let data_loader = ctx
        //   .data::<DataLoader<DBLoader>>()
        //   .expect("Can't get data loader");

        // // let details = data_loader.load_one(planet_id).await?;

        // let ids: Vec<i32> = vec![1, 2];
        // let ids_iter = ids.iter();

        // let questions_entities = data_loader
        //   .load_many(&ids_iter)
        //   .await
        //   .expect("Can't get data loader");

        // let result: String = questions_entities.ok_or_else(|| "Not found".into());

        InterviewsQuestions::belonging_to(self)
            .inner_join(questions::table)
            .select(questions::all_columns)
            .load::<Question>(&get_conn(ctx))
            .expect("Can't get questions for interview")
    }
}

#[derive(InputObject, Insertable)]
#[table_name = "interviews"]
struct InterviewInput {
    pub title: String,
    pub description: Option<String>,
    pub status: String,
}

#[derive(Identifiable, Queryable, Associations, PartialEq, Debug)]
#[belongs_to(Interview)]
#[belongs_to(Question)]
#[table_name = "interviews_questions"]
pub struct InterviewsQuestions {
    id: i32,
    interview_id: i32,
    question_id: i32,
}

#[derive(InputObject, Insertable, Debug)]
#[table_name = "interviews_questions"]
struct InterviewsQuestionsInput {
    interview_id: i32,
    question_id: i32,
}

#[derive(Default)]
pub struct InterviewsQuery;

#[Object]
impl InterviewsQuery {
    async fn interviews(
        &self,
        ctx: &Context<'_>,
        limit: Option<i32>,
        offset: Option<i32>,
    ) -> Vec<Interview> {
        use crate::schema::interviews::dsl::*;

        let limit: i64 = limit.unwrap_or(50).into();
        let offset: i64 = offset.unwrap_or(0).into();

        interviews
            .limit(limit)
            .offset(offset)
            .load(&get_conn(ctx))
            .expect("Can't get interviews")
    }
}

#[derive(Default)]
pub struct InterviewsMutation;

#[Object]
impl InterviewsMutation {
    async fn create_interview(
        &self,
        ctx: &Context<'_>,
        title: String,
        description: Option<String>,
        status: String,
        questions: Vec<i32>,
    ) -> Result<Interview, Error> {
        let new_interview = InterviewInput {
            title,
            description,
            status,
        };

        let conn = get_conn(ctx);

        let created_interview_entity: Interview = diesel::insert_into(interviews::table)
            .values(&new_interview)
            .get_result(&conn)?;

        let new_interviews_questions: Vec<InterviewsQuestionsInput> = questions
            .iter()
            .map(|id| InterviewsQuestionsInput {
                interview_id: created_interview_entity.id,
                question_id: *id,
            })
            .collect();

        diesel::insert_into(interviews_questions::table)
            .values(&new_interviews_questions)
            .execute(&get_conn(ctx))?;

        Ok(created_interview_entity)
    }
}
