import styled from "@emotion/styled";
const Container = styled.div`
  position: relative;
  width: 100%;
  color: var(--ColorElement);
`;
const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 11px 14px;
  cursor: pointer;
  :hover {
    background-color: var(--HoverTheme);
  }
  & button {
    border-radius: 25px;
    outline: none;
    border: none;
    font-style: normal;
    font-family: var(--SecondFontFamliy);
    font-size: var(--SmallFontSize);
    font-weight: var(--LargeFontWeight);
    line-height: var(--SmallLineHeight);
    padding: 5px 14px;
    transition: background-color var(--MainTransition);
    color: var(--ColorElement) !important;
    background-color: var(--HoverTheme);
    border: 1px solid transparent;
    :hover {
      border: 1px solid var(--MainColor);
    }
  }
`;
const Verified = styled.div`
  position: relative;
  width: 16px;
  height: 16px;
  background-color: var(--MainColor);
  border-radius: 50%;
  margin: 0px 7px;
  svg {
    width: 10px;
    height: 10px;
    fill: #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
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
  :hover {
    background-color: var(--HoverTheme);
  }
  svg {
    width: 18px;
    height: 18px;
    fill: #fff;
  }
`;
const UserNameTitle = styled.div`
  margin: 0px 15px;
  display: flex;
  align-items: center;
  h2 {
    font-style: normal;
    font-family: var(--MainFontFamliy);
    font-size: var(--XLargeFontSize);
    font-weight: var(--LargeFontWeight);
    line-height: var(--LargeLineHeight);
  }
`;
const UserName = styled.div`
  display: flex;
  align-items: center;
  h2 {
    font-style: normal;
    font-family: var(--MainFontFamliy);
    font-size: var(--XLargeFontSize);
    font-weight: var(--LargeFontWeight);
    line-height: var(--LargeLineHeight);
  }
`;
const Clear = styled.div`
  height: 48px;
`;
const BackgroundImg = styled.div`
  height: 250px;
  width: 100%;
  background-color: var(--HoverTheme);
  overflow: hidden;
  & .ant-image {
    height: 100%;
    width: 100%;
    img {
      object-fit: cover;
      height: 100%;
      width: 100%;
    }
  }
`;
const Box = styled.div`
  padding: 0 9px;
`;
const BoxImg = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 55px;
`;
const ImgContent = styled.div`
  position: absolute;
  width: 140px;
  height: 140px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid;
  bottom: -20%;
  transition: filter 0.1s;
  cursor: pointer;
  border-color: var(--Theme);
  background-color: var(--HoverTheme);
  /* Spin */
  & :where(.css-dev-only-do-not-override-12jzuas).ant-spin-spinning {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  &.ltr {
    left: 12px;
  }
  &.rtl {
    right: 12px;
  }
  :hover {
    filter: brightness(0.9);
  }
  & .ant-image {
    width: 140px;
    height: 140px;
    position: relative;
    z-index: 100;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transform: scale(1.1);
    }
  }
`;
const FailLoading = styled.div`
  width: 100%;
  height: 100%;
  background-color: var(--HoverTheme);
  display: flex;
  justify-content: center;
  align-items: center;
  & :where(.css-dev-only-do-not-override-12jzuas).ant-spin-spinning {
    position: absolute;
  }
  &.background_img {
    height: 300px;
    display: flex;
    align-items: center;
  }
`;
const SetUpButton = styled.button`
  background-color: transparent;
  border: 1px solid;
  border-color: var(--MainBorderColor);
  border-radius: 20px;
  cursor: pointer;
  color: var(--ColorElement);
  padding: 8px 18px;
  font-family: var(--MainFontFamliy);
  font-size: var(--MediumFontSize);
  font-weight: var(--LargeFontWeight);
  line-height: var(--SmallLineHeight);
  @media (max-width: 576px) {
    padding: 8px 6px;
    font-size: var(--SmallFontSize);
  }
  :hover {
    background-color: var(--HoverTheme);
  }
`;
const Info = styled.div`
  margin-top: 28px;
  font-family: var(--MainFontFamliy);
  line-height: var(--SmallLineHeight);
  display: flex;
  justify-content: space-between;
  & div:last-of-type {
    display: flex;
  }
  & Button {
    background-color: var(--MainColor);
    border-color: var(--MainColor);
    border-radius: 25px;
    margin: 0px 5px;
    :hover {
      border-color: var(--HoverMainColor);
      background-color: var(--HoverMainColor);
    }

    &.un-follow,
    &.unblock {
      background-color: #eee;
      border-color: var(--HoverTheme);
      span {
        color: #000;
      }
    }
    span {
      font-family: var(--MainFontFamliy);
      font-size: var(--SmallFontSize);
      font-weight: var(--LargeFontWeight);
      line-height: var(--SmallLineHeight);
      color: #fff;
    }
  }
  h3 {
    margin: 0px 4px 5px;
    font-size: var(--XXLargeFontSize);
    font-weight: var(--LargeFontWeight);
  }
  span {
    color: var(--ColorIntenseElement);
    font-size: var(--SmallFontSize);
  }
  p {
    margin-top: 10px;
    font-size: var(--MediumFontSize);
    font-weight: var(--SmallFontWeight);
  }
`;
const Icon = styled.div`
  position: relative;
  width: 33.4px;
  height: 33.4px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color var(--MainTransition);
  color: var(--ColorIntenseElement);
  &.ltr {
    right: 0px;
  }
  &.rtl {
    left: 0px;
  }
  &:hover {
    color: var(--MainColor);
    background-color: var(--HoverTheme);
  }
  svg {
    width: 18px;
    height: 18px;
  }
`;
const Time = styled.div`
  margin-top: 12px;
  color: #fff;
  fill: #fff;
  display: flex;
  align-items: center;
  font-family: var(--SecondFontFamliy);
  font-size: var(--MediumFontSize);
  font-weight: var(--SmallFontWeight);
  line-height: var(--VerySmallLineHeight);
  color: var(--ColorIntenseElement);
  fill: var(--ColorIntenseElement);
  span {
    margin: 0px 10px;
  }
`;
const FollowUpSection = styled.div`
  display: flex;
  align-items: center;
  font-family: var(--SecondFontFamliy);
  font-size: var(--SmallFontSize);
  font-weight: var(--SmallFontWeight);
  line-height: var(--VerySmallLineHeight);
  padding-top: 15px;
  a {
    color: var(--ColorIntenseElement);
    :hover {
      color: var(--ColorElement);
    }
  }
`;
const Following = styled.div`
  display: flex;
  align-items: center;
  &.ltr {
    margin-right: 8px;
  }
  &.rtl {
    margin-left: 8px;
  }
`;
const Followers = Following;
const Count = styled.div`
  color: var(--ColorElement);
  &.ltr {
    margin-right: 4px;
  }
  &.rtl {
    margin-left: 4px;
  }
`;
const Select = styled.div`
  margin-top: 12px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  width: 100%;
  border-bottom: 1px solid;
  font-family: var(--MainFontFamliy);
  font-size: var(--MediumFontSize);
  font-weight: var(--SmallFontWeight);
  line-height: var(--SmallLineHeight);
  border-color: var(--MainBorderColor);
`;
const Option = styled.div`
  width: 100%;
  height: 48px;
  cursor: pointer;
  display: flex;
  background-color: transparent;
  color: var(--ColorIntenseElement);
  &.active {
    color: #fff;
  }
  :hover {
    background-color: var(--HoverTheme);
  }
  div {
    display: flex;
    height: 100%;
    width: 100%;
    align-items: center;
    justify-content: center;
    position: relative;
    span {
      content: "";
      display: block;
      position: absolute;
      background-color: transparent;
      transition: 0.2s;
      bottom: 1px;
      width: 50px;
      height: 4px;
      border-radius: 2px;
    }
    .active& {
      span {
        background-color: var(--MainColor);
      }
    }
  }
`;
const ImgUser = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
  }
`;
const UserContent = styled.div`
  margin-left: 10px;
  margin-right: 10px;
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const InfoContent = styled.div`
  width: 100%;
  display: flex;
`;
const Mention = styled.p`
  color: var(--ColorIntenseElement);
  font-weight: var(--SmallFontWeight);
  font-family: var(--MainFontFamliy);
  font-size: var(--VerySmallFontSize);
`;
const Bio = styled.p`
  margin-top: 5px;
`;
const Details = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  & + div {
    width: 100%;
  }
`;
const OptionDropItem = styled.div`
  width: 100px;
  display: flex;
  align-items: center;
  font-style: normal;
  font-family: var(--SecondFontFamliy);
  font-size: var(--SmallFontSize);
  font-weight: var(--LargeFontWeight);
  color: var(--ColorElement);
  fill: var(--ColorElement);
  justify-content: space-between;
  & svg {
    width: 16px;
    height: 16px;
  }
  p {
    padding: 0px 8px;
  }
`;
export {
  Container,
  Arrow,
  UserNameTitle,
  Clear,
  BackgroundImg,
  Box,
  BoxImg,
  ImgContent,
  SetUpButton,
  Info,
  Time,
  FollowUpSection,
  Following,
  Followers,
  Count,
  Select,
  Option,
  Icon,
  Content,
  ImgUser,
  UserContent,
  Verified,
  FailLoading,
  InfoContent,
  Mention,
  Bio,
  Details,
  OptionDropItem,
  UserName,
};
