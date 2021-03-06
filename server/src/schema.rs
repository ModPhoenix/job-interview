table! {
    interviews (id) {
        id -> Int4,
        title -> Text,
        description -> Nullable<Text>,
        status -> Text,
    }
}

table! {
    interviews_questions (id) {
        id -> Int4,
        interview_id -> Nullable<Int4>,
        question_id -> Nullable<Int4>,
    }
}

table! {
    questions (id) {
        id -> Int4,
        user_id -> Int4,
        title -> Text,
        body -> Text,
        updated_at -> Timestamp,
        created_at -> Timestamp,
    }
}

table! {
    users (id) {
        id -> Int4,
        hash -> Bytea,
        salt -> Varchar,
        email -> Varchar,
        role -> Varchar,
        name -> Varchar,
        created_at -> Timestamp,
    }
}

joinable!(interviews_questions -> interviews (interview_id));
joinable!(interviews_questions -> questions (question_id));
joinable!(questions -> users (user_id));

allow_tables_to_appear_in_same_query!(
    interviews,
    interviews_questions,
    questions,
    users,
);
