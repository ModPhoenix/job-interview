import { ReactElement, ReactNode } from "react";
import styled from "styled-components";

const PageLayoutWrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

interface Props {
  children: ReactNode;
}

function PageLayout({ children }: Props): ReactElement {
  return <PageLayoutWrapper>{children}</PageLayoutWrapper>;
}

export default PageLayout;
