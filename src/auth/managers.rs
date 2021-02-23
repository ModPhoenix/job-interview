use super::models::{Claims, Role};
use actix_web::HttpRequest;
use chrono::{Duration, Local};
use jsonwebtoken::{decode, encode, DecodingKey, EncodingKey, Header, TokenData, Validation};
use lazy_static::lazy_static;
use std::str::FromStr;

lazy_static! {
    static ref JWT_SECRET_KEY: String =
        std::env::var("JWT_SECRET_KEY").expect("Can't read JWT_SECRET_KEY");
}

pub fn create_token(username: String, role: Role) -> String {
    let iat = Local::now();
    let exp = iat + Duration::minutes(60);

    let claims = Claims {
        sub: username,
        iat: iat.timestamp(),
        exp: exp.timestamp(),
        role: role.to_string(),
    };

    encode(
        &Header::default(),
        &claims,
        &EncodingKey::from_secret(JWT_SECRET_KEY.as_ref()),
    )
    .expect("Can't create token")
}

pub fn get_role(http_request: HttpRequest) -> Option<Role> {
    http_request
        .headers()
        .get("Authorization")
        .and_then(|header_value| {
            header_value.to_str().ok().map(|s| {
                let jwt_start_index = "Bearer ".len();
                let jwt = s[jwt_start_index..s.len()].to_string();
                let token_data = decode_token(&jwt);
                Role::from_str(&token_data.claims.role).expect("Can't parse role")
            })
        })
}

fn decode_token(token: &str) -> TokenData<Claims> {
    decode::<Claims>(
        &token,
        &DecodingKey::from_secret(JWT_SECRET_KEY.as_ref()),
        &Validation::default(),
    )
    .expect("Can't decode token")
}
