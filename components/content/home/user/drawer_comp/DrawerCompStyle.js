import styled from "@emotion/styled";
const DrawerContent = styled.div`
  color: var(--ColorElement);
  font-style: normal;
  font-family: var(--MainFontFamliy);
`;
const Header = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  & button {
    min-width: 35px;
    min-height: 35px;
    border-radius: 50%;
    background-color: transparent;
    border: none;
    :hover {
      background-color: var(--HoverTheme);
    }
    svg {
      fill: var(--ColorElement);
    }
  }
`;
const UserName = styled.h3`
  margin-top: 10px;
  font-weight: var(--LargeFontWeight);
  line-height: var(--LargeLineHeight);
`;
const Mention = styled.p`
  margin-top: 4px;
  color: var(--ColorIntenseElement);
  font-weight: var(--SmallFontWeight);
`;
const FollowSection = styled.div`
  margin-top: 15px;
  display: flex;
  align-content: center;
  p,
  span {
    font-size: var(--SmallFontSize);
  }
  & div.barrier {
    width: 10px;
  }
  p {
    margin: 0px 5px;
    color: var(--ColorIntenseElement);
    font-weight: var(--SmallFontWeight);
  }
`;
const Following = styled.div`
  display: flex;
`;
const Followers = styled.div`
  display: flex;
`;
const DrawerBody = styled.div`
  margin-top: 40px;
`;
const Option = styled.div`
  width: auto;
  cursor: pointer;
`;
const Box = styled.div`
  margin-top: 30px;
  width: max-content;
  font-weight: var(--SmallFontWeight);
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
  }
`;
const ImgBox = styled.div`
  display: flex;
  align-items: center;
  svg {
    width: 20.53px;
    height: 20.53px;
  }
`;

const Title = styled.div`
  h3 {
    letter-spacing: 1px;
    margin: 0px 30px;
    font-style: normal;
    font-family: var(--SecondFontFamliy);
    font-size: var(--XXLargeFontSize);
    font-weight: var(--SmallFontWeight);
    line-height: var(--LargeLineHeight);
  }
`;
const SignOutSection = styled.div`
  margin-top: 70px;
  &
    :where(.css-dev-only-do-not-override-12jzuas).ant-btn-default:not(
      :disabled
    ) {
    height: 40px;
    width: 100%;
    background-color: var(--HoverTheme);
    border: 1px solid var(--MainBorderColor);
    &:hover {
      border: 1px solid var(--MainColor);
    }
    span {
      color: var(--ColorElement);
      font-size: var(--MediumFontSize);
      font-weight: var(--LargeFontWeight);
      line-height: var(--LargeLineHeight);
    }
  }
`;
export {
  DrawerContent,
  Header,
  UserName,
  Mention,
  FollowSection,
  Following,
  Followers,
  DrawerBody,
  ImgBox,
  Title,
  Box,
  Option,
  SignOutSection,
};
