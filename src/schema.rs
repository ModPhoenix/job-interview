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
        title -> Text,
        body -> Text,
    }
}

joinable!(interviews_questions -> interviews (interview_id));
joinable!(interviews_questions -> questions (question_id));

allow_tables_to_appear_in_same_query!(
    interviews,
    interviews_questions,
    questions,
);
