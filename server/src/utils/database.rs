use async_graphql::Context;
use diesel::pg::PgConnection;
use diesel::r2d2::PooledConnection;
use diesel::r2d2::{ConnectionManager, Pool};
use std::env;
use std::sync::Arc;

pub type PgPool = Pool<ConnectionManager<PgConnection>>;

pub fn create_connection_pool() -> PgPool {
    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    let manager = ConnectionManager::<PgConnection>::new(database_url);

    Pool::builder()
        .build(manager)
        .expect("Failed to create pool")
}

type Conn = PooledConnection<ConnectionManager<PgConnection>>;

pub fn get_conn(ctx: &Context<'_>) -> Conn {
    ctx.data::<Arc<PgPool>>()
        .expect("Can't get pool")
        .get()
        .expect("Can't get DB connection")
}
