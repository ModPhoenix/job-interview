import { ReactElement } from "react";
import { Controller, useForm } from "react-hook-form";
import styled from "styled-components";
import { Button, HelperText } from "../../../components";
import TextField, { TextFieldW } from "../../../components/Fields/TextField";
import { SignInInput } from "../../../generated";

const Form = styled.form`
  display: flex;
  flex-direction: column;

  ${TextFieldW} {
    margin-bottom: 24px;
  }

  ${HelperText} {
    margin-bottom: 16px;
    text-align: center;
  }
`;

interface Props {
  onSubmit: (data: SignInInput) => Promise<void>;
  errorMessage: string | undefined;
}

export function SignInForm({ onSubmit, errorMessage }: Props): ReactElement {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<SignInInput>({
    mode: "onBlur",
    defaultValues: {
      username: "",
      password: "",
    },
  });

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        id="username"
        name="username"
        rules={{ required: true }}
        render={({ ref, ...otherProps }) => (
          <TextField inputRef={ref} placeholder="Username" {...otherProps} />
        )}
      />
      <Controller
        control={control}
        id="password"
        name="password"
        rules={{ required: true }}
        render={({ ref, ...otherProps }) => {
          return (
            <TextField
              inputRef={ref}
              type="password"
              placeholder="Password"
              {...otherProps}
            />
          );
        }}
      />

      {errorMessage && <HelperText error>{errorMessage}</HelperText>}

      <Button type="submit" disabled={isSubmitting}>
        Sign In
      </Button>
    </Form>
  );
}
