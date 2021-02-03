#[macro_use]
extern crate diesel;

use self::diesel::prelude::*;
use actix_web::{guard, middleware, web, App, HttpResponse, HttpServer};
use async_graphql::http::{playground_source, GraphQLPlaygroundConfig};
use async_graphql::*;
use async_graphql::{Context, Object, Result};
use async_graphql::{EmptySubscription, Schema};
use async_graphql_actix_web::{Request, Response};
use dotenv::dotenv;
use job_interview::{create_connection_pool, get_conn};
use std::sync::Arc;

mod questions;
pub mod schema;

use self::questions::models::*;
use self::schema::questions as questions_schema;

#[derive(Debug)]
pub struct QueryRoot;

#[Object]
impl QueryRoot {
  /// Add two parameters and return their sum
  async fn add(&self, _ctx: &Context<'_>, a: i32, b: i32) -> i32 {
    println!("{:?}", &self);
    a + b
  }

  async fn parse_with_extensions(&self, input: Option<String>) -> Result<f32> {
    match input {
      Some(value) => Ok(value.parse()?),
      None => Ok("234a".parse()?),
    }
  }

  async fn get_question(&self, ctx: &Context<'_>) -> Vec<Question> {
    questions_schema::table
      .load(&get_conn(ctx))
      .expect("Can't get questions")
  }
}

pub struct Mutation;

#[Object]
impl Mutation {
  async fn create_question(
    &self,
    ctx: &Context<'_>,
    question: QuestionInput,
  ) -> Result<Question, Error> {
    let new_question = QuestionInput {
      title: question.title,
      body: question.body,
    };

    let created_question_entity = diesel::insert_into(questions_schema::table)
      .values(&new_question)
      .get_result(&get_conn(ctx))
      .expect("Error saving new post");

    Ok(Question::from(created_question_entity))
  }
}

pub type TestSchema = Schema<QueryRoot, Mutation, EmptySubscription>;

async fn index(schema: web::Data<TestSchema>, req: Request) -> Response {
  schema.execute(req.into_inner()).await.into()
}

async fn index_playground() -> HttpResponse {
  HttpResponse::Ok()
    .content_type("text/html; charset=utf-8")
    .body(playground_source(
      GraphQLPlaygroundConfig::new("/").subscription_endpoint("/"),
    ))
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
  dotenv().ok();
  env_logger::init();

  let pool = create_connection_pool();
  let arc_pool = Arc::new(pool);

  let schema = Schema::build(QueryRoot, Mutation, EmptySubscription)
    .data(arc_pool)
    .finish();

  HttpServer::new(move || {
    App::new()
      // enable logger
      .data(schema.clone())
      .wrap(middleware::Logger::default())
      .service(web::resource("/").guard(guard::Post()).to(index))
      .service(web::resource("/").guard(guard::Get()).to(index_playground))
  })
  .bind("127.0.0.1:8080")?
  .run()
  .await
}
