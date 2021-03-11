import React, { ReactElement } from "react";
import styled from "styled-components";
import { Paper } from "../../../components";
import { SignInInput } from "../../../generated";
import { SignInForm } from "./SignInForm";

const SignInPageW = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 64px);

  ${Paper} {
    width: 400px;
  }
`;

function SignInPage(): ReactElement {
  async function onSubmit(values: SignInInput) {
    console.log("values :>> ", values);
  }

  return (
    <SignInPageW>
      <Paper>
        <SignInForm onSubmit={onSubmit} />
      </Paper>
    </SignInPageW>
  );
}

export default SignInPage;
