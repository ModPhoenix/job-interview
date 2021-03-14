use crate::{
    auth::schema::AuthMutation,
    interviews::models::{InterviewsMutation, InterviewsQuery},
    questions::schema::{QuestionsMutation, QuestionsQuery},
    users::models::{UsersMutation, UsersQuery},
    utils::database::PgPool,
};
use async_graphql::*;
use std::sync::Arc;

#[derive(MergedObject, Default)]
pub struct QueryRoot(UsersQuery, QuestionsQuery, InterviewsQuery);

#[derive(MergedObject, Default)]
pub struct MutationRoot(
    AuthMutation,
    UsersMutation,
    QuestionsMutation,
    InterviewsMutation,
);

pub type AppSchema = Schema<QueryRoot, MutationRoot, EmptySubscription>;

pub struct DBLoader {
    pub pool: Arc<PgPool>,
}
