use std::str::FromStr;

use async_graphql::*;
use diesel::prelude::*;

use super::{managers::create_token, models::Role};
use crate::{
    schema::users,
    users::{models::User, utils::verify},
    utils::database::get_conn,
};

#[derive(InputObject)]
struct SignInInput {
    username: String,
    password: String,
}
#[derive(Default)]
pub struct AuthMutation;

#[Object]
impl AuthMutation {
    async fn sign_in(&self, ctx: &Context<'_>, input: SignInInput) -> Result<String, Error> {
        let maybe_user: Option<User> = users::table
            .filter(users::name.eq(input.username))
            .first(&get_conn(ctx))
            .ok();

        if let Some(user) = maybe_user {
            let is_verify = verify(&user, &input.password);

            if is_verify {
                let role = Role::from_str(user.role.to_uppercase().as_str())?;
                return Ok(create_token(user.id, user.name, role));
            }
        }

        Err(Error::new("Can't authenticate a user"))
    }
}
