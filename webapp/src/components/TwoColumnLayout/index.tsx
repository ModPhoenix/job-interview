import { ReactElement, ReactNode } from "react";
import styled from "styled-components";

const MainContainer = styled.div`
  display: flex;
`;

const LeftContainer = styled.div`
  width: 50%;
  padding: 24px;
  border-left: 1px solid #2f3336;
`;

const RightContainer = styled.div`
  width: 50%;
  padding: 24px;
  border-left: 1px solid #2f3336;
  border-right: 1px solid #2f3336;
`;

interface Props {
  leftContent: ReactNode;
  rightContent: ReactNode;
}

function TwoColumnLayout({ leftContent, rightContent }: Props): ReactElement {
  return (
    <MainContainer>
      <LeftContainer>{leftContent}</LeftContainer>
      <RightContainer>{rightContent}</RightContainer>
    </MainContainer>
  );
}

export default TwoColumnLayout;
