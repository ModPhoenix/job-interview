import React, { ChangeEvent, ReactElement, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import styled from "styled-components";
import { Button, Editor, PageLayout } from "../../../components";
import QuestionList from "../QuestionList";
import { TextField } from "../../../components/Fields";
import { useQuestionsQuery } from "../../../generated";

const CREATE_QUESTION = gql`
  mutation CreateQuestion($title: String!, $body: String!) {
    createQuestion(title: $title, body: $body) {
      id
      title
      body
    }
  }
`;

const MainContainer = styled.div`
  display: flex;
  justify-content: space-between;
  min-height: calc(100vh - 64px);
`;

const LeftContainer = styled.div`
  width: 50%;
  border-left: 1px solid #2f3336;
`;

const RightContainer = styled.div`
  position: relative;
  width: 50%;
  border-left: 1px solid #2f3336;
  border-right: 1px solid #2f3336;
`;

function QuestionsPage(): ReactElement {
  const [question, setQuestion] = useState("");
  const [value, setValue] = useState("**Hello world!!!**");

  const { loading, error, data } = useQuestionsQuery();

  const [createQuestion] = useMutation(CREATE_QUESTION, {
    update(cache, { data: { createQuestion } }) {
      cache.modify({
        fields: {
          questions(existingQuestions = []) {
            const newQuestionRef = cache.writeFragment({
              data: createQuestion,
              fragment: gql`
                fragment NewQuestion on questions {
                  id
                  title
                  body
                }
              `,
            });

            return [newQuestionRef, ...existingQuestions];
          },
        },
      });
    },
  });

  function onChangeQuestion(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;

    setQuestion(value);
  }

  function onSubmitQuestion(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    createQuestion({ variables: { title: question, body: value } });
  }

  return (
    <PageLayout>
      <MainContainer>
        <LeftContainer>
          <form onSubmit={onSubmitQuestion}>
            <TextField
              placeholder="Question"
              value={question}
              onChange={onChangeQuestion}
            />
            <Editor value={value} onChange={setValue} />
            <Button type="submit">Add Question</Button>
          </form>
        </LeftContainer>
        <RightContainer>
          <QuestionList loading={loading} error={error} data={data} />
        </RightContainer>
      </MainContainer>
    </PageLayout>
  );
}

export default QuestionsPage;
