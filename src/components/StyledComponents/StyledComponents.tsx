import styled from "styled-components";
export type ProgressBarLoadingProps = {
  number: number;
  color: string;
};
export const ProgressBarLoading = styled.div<ProgressBarLoadingProps>`
  width: ${(props) => props.number + "%"};
  height: 8px;
  border-radius: 4px;
  background-color: ${(props) => props.color};
`;
