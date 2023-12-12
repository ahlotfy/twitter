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
const Title = styled.div`
  margin: 0px 15px;
  @media (max-width: 576px) {
    display: none;
  }
  h2 {
    font-style: normal;
    font-family: var(--MainFontFamliy);
    font-size: var(--XLargeFontSize);
    font-weight: var(--LargeFontWeight);
    line-height: var(--LargeLineHeight);
  }
`;
const Verified = styled.div`
  position: relative;
  margin-left: 4px;
  margin-right: 4px;
  width: 16px;
  height: 16px;
  background-color: var(--MainColor);
  border-radius: 50%;
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
const UserName = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  h2 {
    font-style: normal;
    font-family: var(--MainFontFamliy);
    font-size: var(--SmallFontSize);
    font-weight: var(--LargeFontWeight);
    line-height: var(--LargeLineHeight);
  }
`;
const Clear = styled.div`
  height: 48px;
`;
const ImgUser = styled.div`
  max-width: 35px;
  min-width: 35px;
  height: 35px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
  }
`;
const Info = styled.div`
  width: 100%;
  display: flex;
`;
const UserContent = styled.div`
  margin-left: 10px;
  margin-right: 10px;
  display: flex;
  flex-direction: column;
  width: 100%;
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
const Box = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  & + div {
    width: 100%;
  }
`;
export {
  Arrow,
  UserName,
  Clear,
  Container,
  Content,
  ImgUser,
  UserContent,
  Verified,
  Mention,
  Bio,
  Info,
  Box,
  Title,
};
