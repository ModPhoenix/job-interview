#[macro_use]
extern crate diesel;

use crate::graphql::DBLoader;
use actix_cors::Cors;
use actix_web::http::header;
use actix_web::{guard, middleware, web, App, HttpResponse, HttpServer};
use async_graphql::dataloader::DataLoader;
use async_graphql::extensions::ApolloTracing;
use async_graphql::http::{playground_source, GraphQLPlaygroundConfig};
use async_graphql::{EmptySubscription, Schema};
use async_graphql_actix_web::{Request, Response};
use dotenv::dotenv;
use std::sync::Arc;

mod graphql;
mod interviews;
mod questions;
mod schema;
mod utils;

use self::graphql::{AppSchema, MutationRoot, QueryRoot};
use self::utils::database::create_connection_pool;

async fn index(schema: web::Data<AppSchema>, req: Request) -> Response {
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
    let cloned_pool = Arc::clone(&arc_pool);

    let data_loader = DataLoader::new(DBLoader { pool: cloned_pool });

    let schema = Schema::build(
        QueryRoot::default(),
        MutationRoot::default(),
        EmptySubscription,
    )
    .data(arc_pool)
    .data(data_loader)
    .extension(ApolloTracing)
    .finish();

    HttpServer::new(move || {
        App::new()
            .data(schema.clone())
            // enable logger
            .wrap(middleware::Logger::default())
            .wrap(
                Cors::default()
                    .allowed_origin("http://localhost:8000")
                    .allowed_origin("http://localhost:3000")
                    .allowed_methods(vec!["GET", "POST"])
                    .allowed_headers(vec![header::AUTHORIZATION, header::ACCEPT])
                    .allowed_header(header::CONTENT_TYPE)
                    .supports_credentials()
                    .max_age(3600),
            )
            .service(web::resource("/").guard(guard::Post()).to(index))
            .service(web::resource("/").guard(guard::Get()).to(index_playground))
    })
    .bind("127.0.0.1:8000")?
    .run()
    .await
}
