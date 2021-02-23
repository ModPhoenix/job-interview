use actix_web::{web, HttpRequest, HttpResponse};
use async_graphql::http::{playground_source, GraphQLPlaygroundConfig};
use async_graphql_actix_web::{Request, Response};

use crate::{auth::managers::get_role, graphql::AppSchema};

pub async fn index(
    schema: web::Data<AppSchema>,
    http_request: HttpRequest,
    request: Request,
) -> Response {
    let mut query = request.into_inner();

    let maybe_role = get_role(http_request);

    if let Some(role) = maybe_role {
        println!("role: {}", role);
        query = query.data(role);
    }

    schema.execute(query).await.into()
}

pub async fn index_playground() -> HttpResponse {
    HttpResponse::Ok()
        .content_type("text/html; charset=utf-8")
        .body(playground_source(
            GraphQLPlaygroundConfig::new("/").subscription_endpoint("/"),
        ))
}
