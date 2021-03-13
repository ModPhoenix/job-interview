use actix_web::{web, HttpRequest, HttpResponse};
use async_graphql::http::{playground_source, GraphQLPlaygroundConfig};
use async_graphql_actix_web::{Request, Response};

use crate::{
    auth::managers::{get_claims_from_request, get_role},
    graphql::AppSchema,
};

pub async fn index(
    schema: web::Data<AppSchema>,
    http_request: HttpRequest,
    request: Request,
) -> Response {
    let mut query = request.into_inner();

    let maybe_claims = get_claims_from_request(http_request);

    if let Some(claims) = maybe_claims {
        let role = get_role(&claims);

        println!("claims: {:?}", claims);
        println!("role: {:?}", role);

        query = query.data(claims).data(role);
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
