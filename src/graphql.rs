use crate::interviews::models::{InterviewsMutation, InterviewsQuery};
use crate::questions::models::{QuestionsMutation, QuestionsQuery};
use crate::utils::database::PgPool;
use async_graphql::*;
use std::sync::Arc;

#[derive(MergedObject, Default)]
pub struct QueryRoot(QuestionsQuery, InterviewsQuery);

#[derive(MergedObject, Default)]
pub struct MutationRoot(QuestionsMutation, InterviewsMutation);

pub type AppSchema = Schema<QueryRoot, MutationRoot, EmptySubscription>;

pub struct DBLoader {
  pub pool: Arc<PgPool>,
}
