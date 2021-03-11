import { InputHTMLAttributes, ReactElement } from "react";
import styled from "styled-components";

export const TextFieldW = styled.input`
  display: block;
  width: 100%;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #fff;
  background-color: #000;
  background-clip: padding-box;
  border: 1px solid #2f3336;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border-radius: ${({ theme }) => theme.borderRadius};
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  :focus {
    color: #fff;
    background-color: #000;
    border-color: #86b7fe;
    outline: 0;
    box-shadow: 0 0 0 0.25rem rgb(13 110 253 / 25%);
  }
`;

interface Props extends InputHTMLAttributes<Omit<HTMLInputElement, "type">> {
  inputRef?: React.MutableRefObject<HTMLInputElement>;
}

function TextField({ inputRef, ...rest }: Props): ReactElement {
  return <TextFieldW ref={inputRef} type="text" {...rest} />;
}

export default TextField;
