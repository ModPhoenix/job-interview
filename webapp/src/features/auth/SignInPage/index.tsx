import { ReactElement } from "react";
import styled from "styled-components";
import { H1, Logo, Paper } from "../../../components";
import { SignInInput, useSignInMutation } from "../../../generated";
import { useSignIn } from "../../../hooks";
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
  const [signInMutation, { data, error }] = useSignInMutation();

  useSignIn({ accessToken: data?.signIn });

  async function onSubmit(values: SignInInput) {
    await signInMutation({
      variables: {
        input: values,
      },
    });
  }

  return (
    <SignInPageW>
      <Paper>
        <Logo />
        <H1>Sign in to your account</H1>
        <SignInForm onSubmit={onSubmit} errorMessage={error?.message} />
      </Paper>
    </SignInPageW>
  );
}

export default SignInPage;
