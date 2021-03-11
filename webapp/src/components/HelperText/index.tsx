import styled from "styled-components/macro";

interface Props {
  error?: boolean;
}

const HelperText = styled.div<Props>`
  font-size: 14px;
  color: ${({ error, theme }) =>
    error ? theme.colors.error : theme.colors.primary};
`;

export default HelperText;
