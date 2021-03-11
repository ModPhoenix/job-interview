import React, { ReactElement } from "react";
import styled from "styled-components";
import { H1, Logo, Paper } from "../../../components";
import { SignInInput } from "../../../generated";
import { SignInForm } from "./SignInForm";

const SignInPageW = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 64px);

  ${Paper} {
    padding: 48px;
    width: 400px;
  }
`;

function SignInPage(): ReactElement {
  async function onSubmit(values: SignInInput) {
    console.log("values :>> ", values);
  }

  return (
    <SignInPageW>
      <Logo />
      <H1>Sign in to your account</H1>
      <Paper>
        <SignInForm onSubmit={onSubmit} />
      </Paper>
    </SignInPageW>
  );
}

export default SignInPage;
