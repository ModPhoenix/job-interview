import styled from "styled-components";

const Paper = styled.div`
  padding: 24px;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius};
`;

export default Paper;
