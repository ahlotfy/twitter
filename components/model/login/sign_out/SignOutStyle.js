import styled from "@emotion/styled";

const Container = styled.div`
  background-color: var(--Theme);
  width: 100%;
  padding: 15px 20px;
  color: var(--ColorElement);
  font-style: normal;
  font-family: var(--SecondFontFamliy);
  line-height: var(--VerySmallLineHeight);
`;
const Logo = styled.div`
  display: flex;
  justify-content: center;
  svg {
    width: 150px;
    height: 150px;
    color: var(--LogoColor);
  }
`;
const Paragraph = styled.p`
  margin: 20px 0px 15px;
  font-size: var(--VerySmallFontSize);
  font-weight: var(--SmallFontWeight);
`;
const Button = styled.button`
  cursor: pointer;
  color: rgb(15, 20, 25);
  background-color: rgb(255, 255, 255);
  border: 1px solid;
  width: -webkit-fill-available;
  border-radius: 25px;
  outline: none;
  font-style: normal;
  font-family: var(--SecondFontFamliy);
  font-size: var(--LargeFontSize);
  font-weight: var(--LargeFontWeight);
  line-height: var(--SmallLineHeight);
  padding: 12px 0px;
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
  &.sign_out {
    background-color: var(--MainColor);
    color: #fff;
  }
`;
export { Container, Logo, Paragraph, Button };
