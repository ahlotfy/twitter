import styled from "@emotion/styled";
const Title = styled.div`
  background-color: var(--Theme);
  width: 100%;
  padding-left: 10px;
  padding-right: 10px;
  z-index: 199;
  height: 48px;
  display: flex;
  align-items: center;
  position: relative;
  backdrop-filter: blur(12px);
  color: var(--ColorElement);
  border-bottom: 1px solid var(--MainBorderColor);
  h2 {
    margin: 0px 15px;
    font-style: normal;
    font-family: var(--MainFontFamliy);
    font-size: var(--XLargeFontSize);
    font-weight: var(--LargeFontWeight);
    line-height: var(--LargeLineHeight);
  }
`;
const Arrow = styled.div`
  width: 30.4px;
  height: 30.4px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  fill: var(--ColorElement);
  :hover {
    background-color: var(--HoverTheme);
  }
  svg {
    width: 18px;
    height: 18px;
  }
`;
export { Title, Arrow };
