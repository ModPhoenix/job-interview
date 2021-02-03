use diesel::Queryable;

use async_graphql::*;

use crate::schema::questions;

#[derive(InputObject, Insertable)]
#[table_name = "questions"]
pub struct QuestionInput {
  pub title: String,
  pub body: String,
}

#[derive(SimpleObject, Queryable)]
pub struct Question {
  pub id: i32,
  pub title: String,
  pub body: String,
  pub published: bool,
}
