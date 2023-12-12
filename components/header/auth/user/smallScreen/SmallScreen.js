import styled from "@emotion/styled";
const Footer = styled.div`
  width: 100%;
  z-index: 199;
  height: 52px;
  align-items: center;
  position: fixed;
  bottom: 0;
  border-top: 1px solid;
  background-color: var(--Theme);
  border-color: var(--MainBorderColor);
  display: none;
  @media (max-width: 576px) {
    display: flex;
  }
`;
const Option = styled.div`
  width: 100%;
  height: 100%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;
export { Footer, Option };
