import styled from "@emotion/styled";
const Container = styled.div`
  padding: 15px;
  border-top: 1px solid;
  border-bottom: 1px solid;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-color: var(--MainBorderColor);
  span,
  div {
    background-color: transparent !important;
    color: var(--ColorElement);
  }
  div.ant-select {
    width: 100% !important;
  }
`;
export { Container };
