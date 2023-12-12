import styled from "@emotion/styled";
import { keyframes } from "@emotion/css";
const loading = keyframes`
0%{width: 0%},
25%{width: 25%},
50%{width: 50%},
75%{width: 75%},
100%{width: 100%},
`;
const Container = styled.div`
  width: 100%;
`;
const TweetContent = styled.div`
  width: 100%;
  cursor: pointer;
`;
const UserContent = styled.div`
  display: flex;
  align-items: flex-start;
  transition: background-color var(--MainTransition);

  :hover {
    background-color: var(--HoverTheme);
  }
`;
const Head = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
`;
const UserImg = styled.div`
  width: 35px;
  height: 35px;
  min-width: 35px;
  min-height: 35px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
    transform: scale(1.1);
  }
`;
const Clear = styled.div`
  display: block;
  min-width: 45px;
  min-height: 25px;
  &.quote {
    min-width: 30px;
  }
`;
const UserName = styled.h2`
  a {
    display: block;
    cursor: pointer;
    font-style: normal;
    font-family: var(--SecondFontFamliy);
    font-size: var(--MediumFontSize);
    font-weight: var(--LargeFontWeight);
    line-height: var(--SmallLineHeight);
    color: var(--ColorElement);
    text-decoration: none;
  }
  :hover {
    text-decoration: underline;
  }
`;
const Verified = styled.div`
  position: relative;
  width: 15px;
  height: 15px;
  background-color: var(--MainColor);
  border-radius: 50%;
  margin: 0px 7px;
  svg {
    width: 8px;
    height: 8px;
    fill: #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`;
const Time = styled.div`
  font-style: normal;
  font-family: var(--SecondFontFamliy);
  font-size: var(--VerySmallFontSize);
  font-weight: var(--SmallFontWeight);
  line-height: var(--SmallLineHeight);
  color: var(--ColorIntenseElement);
  text-align: center;
  &.wom {
    margin: 0px 6px;
  }
`;
const Option = styled.div`
  width: 110px;
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
const UserDetails = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  div:first-of-type {
    display: flex;
    align-items: center;
  }
`;
const Icon = styled.div`
  position: relative;
  top: 0px;
  width: 28.4px;
  height: 28.4px;
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
const Paragraph = styled.p`
  color: var(--ColorElement);
  font-style: normal;
  font-family: var(--SecondFontFamliy);
  font-size: var(--MediumFontSize);
  font-weight: var(--SmallFontWeight);
  line-height: var(--LargeLineHeight);
`;
const Info = styled.div`
  display: flex;
  margin: 0px 10px;
  &.quote {
    margin: 0px;
  }
`;
const UploadContent = styled.div`
  position: relative;
  margin: 10px auto 10px;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 7px;
  &.multiple {
    grid-template-columns: repeat(2, 1fr);
  }
`;
const Edited = styled.div`
  margin-top: 3px;
  width: 100%;
  & button {
    background-color: var(--MainColor);
    color: #fff !important;
    font-style: normal;
    font-family: var(--SecondFontFamliy);
    font-size: var(--MediumFontSize);
    font-weight: var(--SmallFontWeight);
    line-height: var(--VerySmallLineHeight);
    border-radius: 20px;
    border: none !important;
    :focus-visible {
      outline: 1px solid var(--ColorIntenseElement) !important;
    }
    :hover {
      background-color: var(--HoverMainColor);
    }
  }
`;
const UploadBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 150px;
  min-height: 150px;
  /* background-color: var(--HoverTheme); */
  border-radius: 5px;
  overflow: hidden;
  @media (max-width: 768px) {
    min-width: 100px;
    min-height: 100px;
  }
  @media (max-width: 576px) {
    min-width: 50px;
    min-height: 50px;
  }
  .ant-image {
    width: 100%;
    height: 100%;
    text-align: center;
    display: flex;
    align-items: center;
  }
  img,
  video {
    width: 100%;
    max-height: 500px;
    background-color: var(--HoverTheme);
    filter: brightness(0.8);
    object-fit: cover;
  }
`;
const FailLoading = styled.div`
  width: 100%;
  height: 100%;
  background-color: var(--HoverTheme);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Buttons = styled.div`
  display: flex;
  button.emoji-btn,
  button.upload-btn {
    background-color: transparent;
    svg {
      width: 19px;
      height: 19px;
      fill: var(--MainColor);
    }
    :hover {
      background-color: var(--MainColor);
      svg {
        fill: #fff;
      }
    }
  }
  button.emoji-btn {
    margin: 0px 10px;
  }
  button.edit {
    background-color: var(--MainColor);
  }
  button.cancel {
    margin: 0px 10px;
    background-color: #353434;
    :hover {
      background-color: #161616;
    }
  }
`;
const WriteReply = styled.div`
  width: 100%;
  display: flex;
  padding: 10px;
  background-color: var(--Theme);
  max-height: 62px;
  &.active {
    max-height: 400px;
  }
`;
const Box = styled.div`
  height: 0px;
  transition: all 0.6s ease;
  overflow: hidden;
  position: relative;
  &.reply_content {
    border: none;
  }
  &.active {
    overflow-y: auto;
    height: 600px;
    padding-bottom: 40px;
    background-color: var(--SupportTheme);
  }
  /* Google */
  ::-webkit-scrollbar {
    display: none;
  }

  /* Fire Fox */
  scrollbar-color: var(--MainColor) var(--Theme);
  scrollbar-width: none;
`;
const FormItems = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const InputItem = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin: auto;
  &.active {
    flex-direction: column;
    align-items: flex-end;
  }
`;
const Header = styled.div`
  margin-bottom: 10px;
  width: 100%;
  display: flex;
  align-items: center;
  &.edit {
    border-bottom: 1px solid var(--MainBorderColor);
  }
  textarea {
    border: none;
    background-color: transparent;
    color: var(--ColorElement);
    resize: none;
    min-height: 40px;
    font-style: normal;
    font-family: var(--SecondFontFamliy);
    font-size: var(--LargeFontSize);
    font-weight: var(--SmallFontWeight);
    line-height: 1.6;
    box-shadow: none !important;
    ::placeholder {
      font-size: var(--XLargeFontSize);
      color: var(--ColorIntenseElement);
    }
  }
`;
const Footer = styled.div`
  padding-bottom: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  &.active {
    width: 100%;
  }
  & button {
    color: #fff !important;
    font-style: normal;
    font-family: var(--SecondFontFamliy);
    font-size: var(--MediumFontSize);
    font-weight: var(--SmallFontWeight);
    line-height: var(--VerySmallLineHeight);
    border-radius: 20px;
    border: none !important;
    background-color: transparent;
    :focus-visible {
      outline: 1px solid var(--ColorIntenseElement) !important;
    }
    :hover {
      background-color: var(--HoverMainColor);
    }
    &.reply {
      background-color: var(--MainColor);
    }
  }
`;
const DeleteUpload = styled.div`
  cursor: pointer;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  position: absolute;
  top: 2%;
  right: 2%;
  z-index: 1000;
  backdrop-filter: blur(4px);
  background-color: rgba(15, 20, 25, 0.75);
  transition: background-color 0.2s;
  :hover {
    background-color: rgba(39, 44, 48, 0.75);
  }
  svg {
    fill: #fff;
  }
`;
const UploadAnt = styled.div`
  display: none;
  &.active {
    display: block;
  }
`;
const Loading = styled.div`
  width: 100%;
  background-color: var(--MainBorderColor);
  position: relative;
  height: 1px;
  :after {
    content: "";
    position: absolute;
    height: 100%;
    display: block;
    left: 0px;
    top: 0px;
  }
  &.loading {
    :after {
      animation: ${loading} 1s infinite;
      background-color: var(--MainColor);
    }
  }
  &.error {
    :after {
      animation: ${loading} 2s 1;
      background-color: red;
    }
  }
`;
const Content = styled.div`
  width: 100%;
  margin: 7px 8px 0px;
`;
const EmojiContent = styled.div`
  position: relative;
  z-index: 100;
  margin: 0px 10px;
`;
const EmojiList = styled.div`
  position: absolute;
  z-index: 3000;
  display: none;
  &.active {
    display: block;
  }
  em-emoji-picker {
    position: absolute;
    z-index: 100;
    height: 200px;
  }
`;
const Additions = styled.div`
  width: 100%;
  display: flex;
  top: 10px;
  & button {
    background-color: transparent;
    :hover {
      svg {
        fill: #fff;
      }
    }
    svg {
      fill: var(--MainColor);
    }
  }
`;
const ReplyOnParagraph = styled.p`
  margin-bottom: 10px;
  width: 100%;
  background-color: var(--HoverTheme);
  border: 1px solid transparent;
  :hover {
    border: 1px solid var(--MainBorderColor);
  }
  border-radius: 5px;
  padding: 3px;
  a {
    display: block;
    color: var(--ColorIntenseElement);
    width: 100%;
    font-style: normal;
    font-family: var(--SecondFontFamliy);
    font-size: var(--MediumFontSize);
    font-weight: var(--SmallFontWeight);
    line-height: var(--LargeLineHeight);
    cursor: pointer;
  }
`;
export {
  Container,
  UserContent,
  UserImg,
  UserDetails,
  Icon,
  UserName,
  Verified,
  Time,
  Paragraph,
  Option,
  UploadContent,
  UploadBox,
  Box,
  WriteReply,
  FormItems,
  DeleteUpload,
  InputItem,
  Header,
  Footer,
  UploadAnt,
  FailLoading,
  Edited,
  Buttons,
  Loading,
  Content,
  Info,
  Clear,
  Head,
  TweetContent,
  EmojiContent,
  EmojiList,
  Additions,
  ReplyOnParagraph,
};
