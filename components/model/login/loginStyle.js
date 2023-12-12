import styled from "@emotion/styled";
const Container = styled.div`
  padding: 0px 15px;
  width: 100%;
  margin: auto;
  color: var(--ColorElement);
  background-color: var(--Theme);
  & a.nav {
    display: inline-block;
    margin-top: 5px;
  }
`;
const H1 = styled.h1`
  color: inherit;
  margin: 0px;
`;
const CloseWidnow = styled.div`
  button {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    margin: 0px 10px;
    border: none;
    :hover {
      background-color: var(--HoverTheme);
    }
    span svg {
      fill: var(--ColorElement);
    }
  }
`;
const Content = styled.div`
  width: 100%;
  padding: 6px 10px 4px;
  margin-top: 15px;
  border-radius: 5px;
  border: 2px solid transparent;
  transition: border 0.1s;
  color: var(--ColorElement);
  border-color: var(--MainBorderColor);
  &.select-style {
    margin: 20px 5px;
    padding: 4px 10px 0px;
  }
  :focus-within {
    border: 2px solid var(--MainColor);
  }
  :focus-within label h4 {
    color: var(--MainColor);
  }
  &.invalid:focus-within label h4 {
    color: red !important;
  }
  :focus-within label p {
    color: var(--MainColor);
  }
  &.invalid:focus-within label p {
    color: red !important;
  }
  .input-style,
  input {
    padding: 2px 0px 4px 0px;
    margin: 0px;
    border: none;
    outline: none;
    box-shadow: none;
    width: 100%;
    background-color: transparent;
    font-style: normal;
    font-family: var(--MainFontFamliy);
    font-size: var(--LargeFontSize);
    font-weight: var(--SmallFontWeight);
    line-height: var(--MediumLineHeight);
    color: var(--ColorElement);
  }
  &.invalid {
    border-color: red !important;
    color: red !important;
  }
  span.ant-input-password-icon {
    svg {
      color: var(--MainColor);
      width: 18px;
      height: 18px;
    }
  }
`;
const Label = styled.label`
  width: 100%;
  font-style: normal;
  font-family: var(--MainFontFamliy);
  font-size: var(--SmallFontSize);
  font-weight: var(--SmallFontWeight);
  line-height: var(--MediumLineHeight);
  transition: color 0.1s;
  display: flex;
  justify-content: space-between;
  align-items: center;
  p {
    color: transparent;
  }
  svg {
    width: 15px;
    height: 15px;
    color: inherit;
  }
  h4 {
    color: inherit;
  }
`;

const Error = styled.div`
  display: none;
  &.active {
    display: block;
  }
  font-style: normal;
  font-family: var(--MainFontFamliy);
  font-size: var(--SmallFontSize);
  font-weight: var(--LargeFontWeight);
  line-height: var(--MediumLineHeight);
  color: red;
  padding: 4px;
`;
const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 50px;
  position: relative;
  background-color: var(--Theme);
  border-bottom: 1px solid var(--MainBorderColor);
`;

const Step = styled.h2`
  margin: 0px 10px;
  color: var(--ColorElement);
`;
const Message = styled.p`
  display: none;
  &.active {
    display: block;
  }
  font-style: normal;
  font-family: var(--MainFontFamliy);
  font-size: var(--SmallFontSize);
  font-weight: var(--LargeFontWeight);
  line-height: var(--MediumLineHeight);
  color: var(--MainColor);
  padding: 4px;
`;
export {
  Container,
  H1,
  Content,
  Label,
  Error,
  Header,
  CloseWidnow,
  Step,
  Message,
};
