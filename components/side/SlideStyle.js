import styled from "@emotion/styled";
const Container = styled.div`
  display: flex;
  flex: 1.2;
  flex-direction: column;
  height: calc(100vh - 11px);
  align-items: center;
  margin-top: 11px;
  @media (max-width: 992px) {
    display: none;
  }
`;
const Content = styled.div`
  position: fixed;
  width: 350px;
  @media (max-width: 1200px) {
    width: 315px;
  }
  @media (max-width: 992px) {
    width: 200px;
  }
`;
const OutBox = styled.div`
  margin-top: 14px;
  div:first-of-type {
    margin-bottom: 5px;
  }
  div {
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-style: normal;
    font-family: var(--SecondFontFamliy);
    font-size: var(--VerySmallFontSize);
    font-weight: var(--SmallFontWeight);
    line-height: var(--VerySmallLineHeight);
    padding: 1px;
    color: var(--ColorIntenseElement);
    span {
      text-align: center;
      cursor: pointer;
      :hover {
        text-decoration: underline;
      }
    }
  }
`;
export { Container, Content, OutBox };
