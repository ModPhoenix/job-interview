import { ReactElement } from "react";
import styled from "styled-components";
import { Questions } from "../../../types";

const QuestionItemW = styled.div`
  padding: 12px 12px 12px 48px;
  border-bottom: 1px solid #2f3336;
`;

interface Props {
  question: Questions;
  onDeleteQuestion: (id: number) => () => void;
}

function QuestionItem({ question, onDeleteQuestion }: Props): ReactElement {
  return (
    <QuestionItemW onClick={onDeleteQuestion(question.id)}>
      {question.title}
    </QuestionItemW>
  );
}

export default QuestionItem;
