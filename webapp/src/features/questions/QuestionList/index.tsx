import { gql, useMutation } from "@apollo/client";
import { ReactElement } from "react";
import styled from "styled-components";
import QueryState from "../../../components/QueryState";
import { QuestionsData, QueryStateData } from "../../../types";
import QuestionItem from "./QuestionItem";

const DELETE_QUESTION = gql`
  mutation DeleteQuestion($questionId: Int!) {
    deleteQuestion(questionId: $questionId)
  }
`;

const QuestionListW = styled.div``;

function QuestionList(props: QueryStateData<QuestionsData>): ReactElement {
  const { data } = props;

  const [deleteQuestion] = useMutation(DELETE_QUESTION);

  const onDeleteQuestion = (questionId: number) => () => {
    deleteQuestion({
      variables: { questionId },
      update: (cache) => {
        cache.modify({
          fields: {
            questions(existingQuestionsRefs, { readField }) {
              return existingQuestionsRefs.filter(
                (commentRef: any) => questionId !== readField("id", commentRef)
              );
            },
          },
        });
      },
    });
  };

  return (
    <QuestionListW>
      <QueryState {...props}>
        {data &&
          data.questions.map((question) => (
            <QuestionItem
              key={question.id}
              question={question}
              onDeleteQuestion={onDeleteQuestion}
            />
          ))}
      </QueryState>
    </QuestionListW>
  );
}

export default QuestionList;
