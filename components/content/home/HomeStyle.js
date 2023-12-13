import styled from "@emotion/styled";
const Container = styled.div`
  width: 100%;
  position: relative;
  overflow: hidden;
  color: var(--ColorTingeElement);
`;
const PostBtn = styled.div`
  display: none;
  position: fixed;
  bottom: 12%;
  left: 80%;
  z-index: 50;
  @media (max-width: 576px) {
    display: block;
  }
  & button {
    border: none;
    background-color: var(--MainColor);
    min-width: 50px;
    height: 50px;
    border-radius: 50%;
    :hover {
      background-color: var(--HoverMainColor);
    }
    svg {
      width: 24px;
      height: 24px;
      color: #fff;
    }
  }
  &.forget {
    button {
      display: none;
    }
  }
`;
const Head = styled.div`
  width: 100%;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  &.home {
    @media (max-width: 576px) {
      height: 100px;
    }
  }
`;
const SmallScreenHeader = styled.div`
  width: 100%;
  display: none;
  align-items: center;
  justify-content: space-between;
  padding-left: 14px;
  padding-right: 14px;
  border-bottom: 1px solid var(--MainBorderColor);
  @media (max-width: 576px) {
    display: flex;
  }
`;
const Title = styled.div`
  width: 100%;
  display: flex;
  height: 100%;
  align-items: center;
  @media (max-width: 576px) {
    display: none;
  }
  Button {
    background-color: transparent;
    border: none;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: calc(100% - 2px);
    border-radius: 0px;
    position: relative;
    &.active {
      ::before {
        content: "";
        position: absolute;
        bottom: 0px;
        left: 50%;
        transform: translateX(-50%);
        border-bottom: 4px solid var(--MainColor);
        width: 20%;
        border-radius: 25px;
      }
    }
    :hover {
      background-color: var(--HoverTheme);
    }
    span {
      color: var(--ColorElement);
      font-style: normal;
      font-family: var(--MainFontFamliy);
      line-height: var(--LargeLineHeight);
    }
  }
  &.user_home_page {
    height: 100%;
    width: 100%;
    justify-content: space-around;
    h3 {
      width: 100%;
      font-size: var(--LargeFontSize);
      font-weight: var(--SmallFontWeight);
      height: 100%;
    }
  }
  h2 {
    font-style: normal;
    font-weight: var(--LargeFontWeight);
    font-size: var(--XLargeFontSize);
    font-family: var(--MainFontFamliy);
    line-height: var(--LargeLineHeight);
  }
`;
const Nav = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 576px) {
    &.active {
      height: 100px;
      flex-direction: column-reverse;
    }
  }
`;
const Buttons = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  & button {
    padding: 2px 10px;
    border-radius: 25px;
    border: 1px solid;
    border-color: transparent;
    font-style: normal;
    font-size: var(--SmallFontSize);
    font-weight: var(--LargeFontWeight);
    line-height: var(--LargeLineHeight);
    font-family: var(--MainFontFamliy);
    cursor: pointer;
    transition: background-color var(--MainTransition);
    span {
      color: #fff;
    }
    background-color: var(--MainColor);
    &:nth-of-type(1) {
      margin: 0px 10px;
      :hover {
        border: 1px solid;
        border-color: var(--MainBorderColor);
        background-color: var(--HoverMainColor);
      }
    }
    &.create_account {
      background-color: #fff;
      span {
        color: #000;
      }
      :hover {
        border-color: var(--MainBorderColor);
        background-color: #ddd;
      }
    }
  }
`;
const ImgUser = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  cursor: default;
  :hover {
    filter: brightness(80%);
  }
  &.home {
    width: 33px;
    height: 33px;
    display: none;
    @media (max-width: 576px) {
      display: block;
    }
  }
  @media (max-width: 1400px) {
    cursor: pointer;
  }
  img {
    width: 100%;
    height: 100%;
    transform: scale(1.1);
  }
`;
const Logo = styled.div`
  width: 45.4px;
  height: 45.4px;
  display: none;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  margin-top: 3px;
  cursor: pointer;
  transition: background-color var(--MainTransition);
  fill: var(--LogoColor);
  @media (max-width: 576px) {
    display: flex;
  }
  :hover {
    background-color: var(--HoverTheme);
  }
  svg {
    width: 32.49px;
    height: 27.53px;
  }
`;

export {
  Container,
  Head,
  SmallScreenHeader,
  Title,
  Nav,
  Logo,
  Buttons,
  ImgUser,
  PostBtn,
};
