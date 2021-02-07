# Job-interview

Tutorial project in Rust with graphql api.

## Getting Started

```sh
git clone https://github.com/ModPhoenix/job-interview.git
cd job-interview
docker-compose up
cp .env.example .env
diesel setup --database-url='postgres://postgres:admin@localhost/job-interview'
diesel migration run
cargo run
```

or

```sh
cargo install cargo-watch
cargo watch -x run
```