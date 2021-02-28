CREATE TABLE interviews (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  "description" TEXT,
  "status" TEXT NOT NULL
);

CREATE TABLE interviews_questions (
  id SERIAL PRIMARY KEY,
  interview_id integer references interviews(id),
  question_id integer references questions(id)
);
