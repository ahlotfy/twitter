import styled from "@emotion/styled";
const Container = styled.div`
  width: 100%;
  border: 1px solid;
  border-radius: 10px;
  padding-bottom: 14px;
  border-color: var(--MainBorderColor);
`;
const Button = styled.button`
  cursor: pointer;
  color: rgb(15, 20, 25);
  background-color: rgb(255, 255, 255);
  border: 1px solid;
  height: 36px;
  outline-style: none;
  width: -webkit-fill-available;
  border-radius: 25px;
  outline: none;
  font-style: normal;
  font-family: var(--SecondFontFamliy);
  font-size: var(--MediumFontSize);
  font-weight: var(--LargeFontWeight);
  line-height: var(--SmallLineHeight);
  padding: 0px 10px;
  margin: 8px 11px;
  transition: background-color var(--MainTransition);
  border-color: transparent;
  :focus-within {
    outline: 2px solid var(--MainColor);
  }
  :hover {
    background-color: rgb(230, 230, 230);
    border-color: var(--MainBorderColor);
  }
  &.sign_in {
    margin: 12px 11px 4px;
    background-color: var(--MainColor) !important;
    color: var(--ColorElement);
    :hover {
      background-color: var(--HoverMainColor) !important;
    }
  }
`;
const Note = styled.div`
  h2 {
    padding: 11px 14px;
    font-style: normal;
    font-family: var(--SecondFontFamliy);
    font-size: var(--XLargeFontSize);
    font-weight: var(--XLargeFontWeight);
    line-height: var(--LargeLineHeight);
    color: var(--ColorTingeElement);
  }
  p {
    font-style: normal;
    font-family: var(--SecondFontFamliy);
    font-size: var(--VerySmallFontSize);
    font-weight: var(--SmallFontWeight);
    line-height: var(--VerySmallLineHeight);
    padding-left: 11px;
    padding-right: 11px;
    color: var(--ColorIntenseElement);
    span {
      color: var(--MainColor);
      cursor: pointer;
      :hover {
        text-decoration: underline;
      }
    }
  }
`;
export { Container, Note, Button };
