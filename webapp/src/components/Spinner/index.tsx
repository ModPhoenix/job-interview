import { ReactElement } from "react";
import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const Spinner = styled.div`
  height: 50px;
  width: 50px;
  border: 4px #2f3336 solid;
  border-top: 4px white solid;
  border-radius: 50%;
  animation: ${rotate} 0.8s infinite linear;
`;

const SpinnerContainerW = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function SpinnerContainer(): ReactElement {
  return (
    <SpinnerContainerW>
      <Spinner />
    </SpinnerContainerW>
  );
}

export default SpinnerContainer;
