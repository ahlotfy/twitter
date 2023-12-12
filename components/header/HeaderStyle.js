import styled from "@emotion/styled";
const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  flex: 0.8;
  padding-left: 7px;
  padding-right: 7px;
  @media (max-width: 1400px) {
    flex: 0.3;
  }
  @media (max-width: 576px) {
    display: none;
  }
`;
const Nav = styled.div`
  overflow-y: auto;
  height: 100%;
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  @media (min-width: 1400px) {
    width: 100%;
    max-width: 290px;
  }
  @media (max-width: 1400px) {
    align-items: center;
  }
`;
const Logo = styled.div`
  width: 45.4px;
  height: 45.4px;
  border-radius: 50%;
  margin-top: 6px;
  margin-left: 5px;
  margin-right: 5px;
  cursor: pointer;
  transition: background-color var(--MainTransition);
  :hover {
    background-color: var(--HoverTheme);
  }
  a {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
      width: 30.49px;
      height: 30.49px;
      fill: var(--LogoColor);
    }
  }
`;
const Sections = styled.div`
  width: 100%;
  margin-top: 2px;
  margin-bottom: 4px;
  color: var(--ColorElement);
  fill: var(--ColorElement);
  @media (max-width: 576px) {
    margin-top: 0px;
    margin-bottom: 0px;
  }
`;
const Box = styled.div`
  width: max-content;
  margin: 5px;
  font-weight: var(--SmallFontWeight);
  @media (max-width: 1400px) {
    margin: 5px auto;
  }
  @media (max-width: 576px) {
    margin: 0px;
  }
  a {
    display: flex;
    border-radius: 25px;
    align-items: center;
    background-color: inherit;
    color: inherit;
    fill: inherit;
    background-color: transparent;
    transition: background-color 0.2s;
    text-decoration: none;
    :hover {
      background-color: var(--HoverTheme);
    }
  }
`;
const ImgBox = styled.div`
  width: 45.4px;
  height: 45.4px;
  display: flex;
  padding: 10px;
  justify-content: center;
  @media (max-width: 576px) {
    width: 42.4px;
    height: 42.4px;
  }
  svg {
    width: 24.53px;
    height: 24.53px;
    @media (max-width: 576px) {
      width: 22.49px;
      height: 22.49px;
    }
  }
`;
const TitleBox = styled.div`
  &.ltr {
    padding-right: 10px;
    margin-left: 4px;
  }
  &.rtl {
    padding-left: 10px;
    margin-right: 4px;
  }
  @media (max-width: 1400px) {
    display: none;
    &.drawer {
      display: block;
    }
  }
  h3 {
    font-style: normal;
    font-family: var(--SecondFontFamliy);
    font-size: var(--XLargeFontSize);
    font-weight: var(--SmallFontWeight);
    line-height: var(--LargeLineHeight);
    &.active {
      font-weight: var(--LargeFontWeight);
    }
  }
`;
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
export {
  Container,
  Nav,
  Logo,
  Box,
  ImgBox,
  TitleBox,
  Sections,
  Footer,
  Option,
};
