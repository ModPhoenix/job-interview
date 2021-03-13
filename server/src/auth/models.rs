use async_graphql::{async_trait, guard::Guard, Context, Enum, Result};
use serde::{Deserialize, Serialize};
use strum_macros::{Display, EnumString};

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Claims {
    // issuer
    // pub iss: String,
    // subject
    pub sub: i32,
    // issued at
    pub iat: i64,
    // expiry
    pub exp: i64,
    // username
    pub username: String,
    // user role
    pub role: String,
}

#[derive(Enum, Eq, PartialEq, Display, EnumString, Copy, Clone, Debug)]
#[strum(serialize_all = "SCREAMING_SNAKE_CASE")]
pub enum Role {
    Admin,
    User,
}

pub struct RoleGuard {
    pub role: Role,
}

#[async_trait::async_trait]
impl Guard for RoleGuard {
    async fn check(&self, ctx: &Context<'_>) -> Result<()> {
        let role: Option<&Role> = ctx.data_opt();

        if role == Some(&self.role) || role == Some(&Role::Admin) {
            Ok(())
        } else {
            Err("Forbidden".into())
        }
    }
}
