#[macro_use]
extern crate diesel;

use crate::graphql::DBLoader;
use crate::handlers::{index, index_playground};
use actix_cors::Cors;
use actix_web::{guard, http::header, middleware, web, App, HttpServer};
use async_graphql::{dataloader::DataLoader, extensions::ApolloTracing, EmptySubscription, Schema};
use dotenv::dotenv;
use std::sync::Arc;

mod auth;
mod graphql;
mod handlers;
mod interviews;
mod questions;
mod schema;
mod users;
mod utils;

use self::graphql::{MutationRoot, QueryRoot};
use self::utils::database::create_connection_pool;

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
