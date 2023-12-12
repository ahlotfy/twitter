const { default: styled } = require("@emotion/styled");

const Container = styled.div`
  background-color: var(--Theme);
  max-height: 400px;
  overflow-y: scroll;
`;
const Option = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  cursor: pointer;
  background-color: transparent;
  transition: background-color var(--MainTransition);
  color: var(--ColorTingeElement);
  :hover {
    background-color: var(--HoverTheme);
  }
  div {
    width: 90%;
    h4,
    p {
      font-family: var(--MainFontFamliy);
    }
    h4 {
      font-size: var(--LargeFontSize);
      font-weight: var(--LargeFontWeight);
      line-height: var(--LargeLineHeight);
      margin-bottom: 8px;
    }
    p {
      font-size: var(--VerySmallFontSize);
      font-weight: var(--SmallFontWeight);
    }
  }
  input {
    width: 16px;
    height: 16px;
    cursor: pointer;
  }
`;
export { Container, Option };
