# Job-interview

Tutorial project in Rust with graphql api.

## Getting Started

```sh
git clone https://github.com/ModPhoenix/job-interview.git
```

### 1. Start server

Setup database and run migrations

```sh
git clone https://github.com/ModPhoenix/job-interview.git
cd job-interview/server
docker-compose up
cp .env.example .env
diesel setup --database-url='postgres://postgres:admin@localhost/job-interview'
diesel migration run
```

Run server

```sh
cargo run
```

Or run watch

```sh
cargo install cargo-watch
cargo watch -x run
```

### 2. Start webapp

```sh
cd job-interview/webapp
yarn install
yarn start
```
