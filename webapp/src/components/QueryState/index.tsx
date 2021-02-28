import { ReactElement, ReactNode } from "react";
import styled from "styled-components";
import { QueryStateData } from "../../types";
import SpinnerContainer from "../Spinner";

const QueryStateW = styled.div``;

const QueryStateErrorText = styled.div``;

interface Props extends Omit<QueryStateData<never>, "data"> {
  children: ReactNode;
}

function QueryState({ loading, error, children }: Props): ReactElement {
  if (loading) {
    return (
      <QueryStateW>
        <SpinnerContainer />
      </QueryStateW>
    );
  }

  if (error) {
    return (
      <QueryStateW>
        <QueryStateErrorText>
          Oh, it seems that something went wrong 😭
        </QueryStateErrorText>
      </QueryStateW>
    );
  }

  return <>{children}</>;
}

export default QueryState;
