import styled from "@emotion/styled";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 2;
  position: relative;
  min-height: 100vh;
  box-sizing: border-box;
  &.ltr {
    border-left: 1px solid var(--MainBorderColor);
  }
  &.rtl {
    border-right: 1px solid var(--MainBorderColor);
  }
  @media (max-width: 992px) {
    display: none;
    &.visible {
      display: flex;
    }
    &.ltr,
    &.rtl {
      border: none;
    }
  }
`;
const Arrow = styled.div`
  width: 30.4px;
  height: 30.4px;
  border-radius: 50%;
  display: none;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  fill: var(--ColorElement);
  :hover {
    background-color: var(--HoverTheme);
  }
  @media (max-width: 992px) {
    display: flex;
  }
  svg {
    width: 18px;
    height: 18px;
  }
`;
const Paragraph = styled.div`
  margin-top: 10px;
  padding-left: 14px;
  padding-right: 14px;
  font-style: normal;
  font-family: var(--MainFontFamliy);
  font-size: var(--SmallFontSize);
  font-weight: var(--SmallFontWeight);
  line-height: var(--VerySmallLineHeight);
  color: var(--ColorIntenseElement);
`;
const Content = styled.div`
  margin-top: 10px;
`;
export { Container, Arrow, Paragraph, Content };
