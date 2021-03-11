import { ReactElement } from "react";
import { Controller, useForm } from "react-hook-form";
import styled from "styled-components";
import { Button } from "../../../components";
import TextField, { TextFieldW } from "../../../components/Fields/TextField";
import { SignInInput } from "../../../generated";

const Form = styled.form`
  display: flex;
  flex-direction: column;

  ${TextFieldW} {
    margin-bottom: 24px;
  }
`;

interface Props {
  onSubmit: (data: SignInInput) => Promise<void>;
}

export function SignInForm({ onSubmit }: Props): ReactElement {
  const { handleSubmit, control } = useForm<SignInInput>({
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

      <Button type="submit">Sign In</Button>
    </Form>
  );
}
