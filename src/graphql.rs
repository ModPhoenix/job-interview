use crate::questions::models::{QuestionsMutation, QuestionsQuery};
use async_graphql::*;

#[derive(MergedObject, Default)]
pub struct QueryRoot(QuestionsQuery);

#[derive(MergedObject, Default)]
pub struct MutationRoot(QuestionsMutation);

pub type AppSchema = Schema<QueryRoot, MutationRoot, EmptySubscription>;