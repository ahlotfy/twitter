import styled from "@emotion/styled";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 2;
  min-height: 100vh;
  border-left: 1px solid;
  border-right: 1px solid;
  border-color: var(--MainBorderColor);
  @media (max-width: 576px) {
    border: none;
  }
`;

export { Container };
