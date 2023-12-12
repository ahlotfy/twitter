import styled from "@emotion/styled";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(98% - 46.4px);
  width: 100%;
  @media (max-width: 1400px) {
    align-items: center;
  }
`;
const Option = styled.div`
  width: auto;
  cursor: pointer;
`;
const TweetBtn = styled.div`
  margin: 10px 5px;
  & button {
    width: 250px;
    height: 45px;
    background-color: var(--MainColor);
    transition: background-color var(--MainTransition);
    border-radius: 20px;
    border: 1px solid transparent;
    :hover {
      background-color: var(--HoverMainColor);
      border-color: var(--MainBorderColor);
    }
    @media (max-width: 1400px) {
      margin: 10px auto 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 47px;
      height: 47px;
      border-radius: 50%;
    }
    & span {
      display: none;
      @media (max-width: 1400px) {
        display: block;
      }
      &.rtl {
        transform: rotateY(180deg);
      }
      svg {
        color: var(--ColorElement);
        width: 24px;
        height: 24px;
      }
    }
    h2 {
      display: block;
      @media (max-width: 1400px) {
        display: none;
      }
      font-style: normal;
      font-family: var(--SecondFontFamliy);
      font-size: var(--MediumFontSize);
      font-weight: var(--LargeFontWeight);
      line-height: var(--SmallLineHeight);
      color: var(--ColorElement);
      letter-spacing: 1px;
      text-align: center;
    }
  }
`;

const Content = styled.div`
  width: calc(90% - 10px);
  margin-left: 5px;
  margin-right: 5px;
  margin-bottom: 10px;
  padding: 8px 5px;
  border-radius: 50px;
  background-color: transparent;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: var(--SupportTheme);
  transition: background-color var(--MainTransition);
  color: var(--ColorElement);
  cursor: pointer;
  @media (max-width: 1400px) {
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
  }
  &:hover {
    background-color: var(--HoverTheme);
  }
`;
const UserDetails = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding-left: 2px;
  padding-right: 2px;
  & div:first-of-type {
    display: flex;
    width: 100%;
    align-items: center;
  }
  & div.info {
    padding: 0px 15px;
    @media (max-width: 1400px) {
      display: none;
    }
  }
  & button {
    margin: 0px 5px;
    background-color: transparent;
    border: none;
    box-shadow: none;
    outline: none;
    @media (max-width: 1400px) {
      display: none;
    }
    svg {
      color: var(--ColorElement);
    }
  }
`;
const ImgUser = styled.div`
  max-width: 36px;
  max-height: 36px;
  min-width: 36px;
  min-height: 36px;
  border-radius: 50%;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    transform: scale(1.1);
  }
`;
const UserName = styled.div`
  font-style: normal;
  font-family: var(--MainFontFamliy);
  font-size: var(--SmallFontSize);
  font-weight: var(--LargeFontWeight);
  cursor: pointer;
  color: var(--ColorElement);
  @media (max-width: 1400px) {
    display: none;
  }
`;
const Mention = styled.p`
  margin-top: 4px;
  color: var(--ColorIntenseElement);
  font-weight: var(--SmallFontWeight);
  font-family: var(--MainFontFamliy);
  font-size: var(--SmallFontSize);
`;
export {
  Container,
  Option,
  TweetBtn,
  Content,
  UserDetails,
  ImgUser,
  UserName,
  Mention,
};
