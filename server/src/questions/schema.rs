use async_graphql::*;
use async_graphql::{Context, Error, Object};
use chrono::NaiveDateTime;

use crate::users::models::User;

use super::models::Question;

#[Object]
impl Question {
    async fn id(&self) -> i32 {
        self.id
    }

    async fn title(&self) -> String {
        self.title.to_string()
    }

    async fn body(&self) -> String {
        self.body.to_string()
    }

    async fn author(&self, ctx: &Context<'_>) -> Result<User, Error> {
        self.creator(ctx)
    }

    async fn updated_at(&self) -> NaiveDateTime {
        self.updated_at
    }

    async fn created_at(&self) -> NaiveDateTime {
        self.created_at
    }
}

#[derive(Default)]
pub struct QuestionsQuery;

#[Object]
impl QuestionsQuery {
    async fn questions(
        &self,
        ctx: &Context<'_>,
        limit: Option<i32>,
        offset: Option<i32>,
    ) -> Result<Vec<Question>, Error> {
        Question::list(ctx, limit, offset)
    }
}
