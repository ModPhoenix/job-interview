import { ReactElement } from "react";
import styled from "styled-components";

const LogoW = styled.span`
  font-size: 24px;
`;

function Logo(): ReactElement {
  return <LogoW>🧑🏻‍💻</LogoW>;
}

export default Logo;
