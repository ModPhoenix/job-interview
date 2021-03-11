import { ButtonHTMLAttributes, ReactElement, ReactNode } from "react";
import styled from "styled-components";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const ButtonW = styled.button`
  height: 36px;
  padding-left: 16px;
  padding-right: 16px;
  text-transform: uppercase;
  border-radius: 2px;
  border: 0;
  outline: 0;
`;

function Button({ children, ...rest }: Props): ReactElement {
  return <ButtonW {...rest}>{children}</ButtonW>;
}

export default Button;
