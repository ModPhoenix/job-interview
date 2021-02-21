use crate::schema::users;
use crate::utils::database::get_conn;
use async_graphql::*;
use chrono::*;
use diesel::prelude::*;

use super::utils::{make_hash, make_salt};

#[derive(Debug, Queryable, SimpleObject, Clone)]
pub struct User {
    pub id: i32,
    #[graphql(visible = false)]
    pub hash: Vec<u8>,
    #[graphql(visible = false)]
    pub salt: String,
    pub email: String,
    pub role: String,
    pub name: String,
    pub created_at: NaiveDateTime,
}

#[derive(Debug, Insertable)]
#[table_name = "users"]
pub struct InsertableUser {
    pub hash: Vec<u8>,
    pub salt: String,
    pub email: String,
    pub created_at: NaiveDateTime,
    pub name: String,
    pub role: String,
}

#[derive(Debug, SimpleObject)]
pub struct UserData {
    pub name: String,
    pub email: String,
    pub password: String,
}

impl From<UserData> for InsertableUser {
    fn from(user_data: UserData) -> Self {
        let UserData {
            name,
            email,
            password,
            ..
        } = user_data;

        let salt = make_salt();
        let hash = make_hash(&password, &salt).to_vec();
        Self {
            email,
            hash,
            created_at: chrono::Local::now().naive_local(),
            salt,
            name,
            role: "user".to_owned(),
        }
    }
}

#[derive(Clone, Default)]
pub struct LoggedUser(pub Option<User>);

impl From<User> for LoggedUser {
    fn from(slim_user: User) -> Self {
        LoggedUser(Some(slim_user))
    }
}

#[derive(Default)]
pub struct UsersQuery;

#[Object]
impl UsersQuery {
    async fn users(
        &self,
        ctx: &Context<'_>,
        limit: Option<i32>,
        offset: Option<i32>,
    ) -> Result<Vec<User>, Error> {
        use crate::schema::users::dsl::*;

        let limit: i64 = limit.unwrap_or(50).into();
        let offset: i64 = offset.unwrap_or(0).into();

        Ok(users
            .order(id.desc())
            .limit(limit)
            .offset(offset)
            .load(&get_conn(ctx))?)
    }
}

#[derive(Default)]
pub struct UsersMutation;

#[Object]
impl UsersMutation {
    async fn create_user(
        &self,
        ctx: &Context<'_>,
        name: String,
        email: String,
        password: String,
    ) -> Result<User, Error> {
        let user_data = UserData {
            name,
            email,
            password,
        };

        let user: InsertableUser = user_data.into();
        let inserted_user: User = diesel::insert_into(users::table)
            .values(&user)
            .get_result(&get_conn(ctx))?;
        Ok(inserted_user.into())
    }
}
