import { ButtonHTMLAttributes, ReactElement, ReactNode } from "react";
import styled from "styled-components";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const ButtonW = styled.button`
  height: 36px;
  padding-left: 16px;
  padding-right: 16px;
  font-family: "Roboto", sans-serif;
  font-size: 16px;
  font-weight: 500;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.onPrimary};
  border-radius: ${({ theme }) => theme.borderRadius};
  background-color: ${({ theme }) => theme.colors.primary};
  border: 0;
  outline: 0;
`;

function Button({ children, ...rest }: Props): ReactElement {
  return <ButtonW {...rest}>{children}</ButtonW>;
}

export default Button;
