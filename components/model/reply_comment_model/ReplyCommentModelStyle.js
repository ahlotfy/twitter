import { keyframes } from "@emotion/css";
import styled from "@emotion/styled";
const loading = keyframes`
0%{width: 0%},
25%{width: 25%},
50%{width: 50%},
75%{width: 75%},
100%{width: 100%},
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
const Container = styled.div`
  width: 100%;
  margin: auto;
  color: var(--ColorElement);
  background-color: var(--Theme);
`;
const UserContent = styled.div`
  display: flex;
  align-items: flex-start;
  overflow: hidden;
  color: var(--ColorTingeElement);
  border-bottom: 1px solid;
  border-color: var(--MainBorderColor);
  background-color: var(--Theme);
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
const UserName = styled.h2`
  cursor: pointer;
  font-style: normal;
  font-family: var(--SecondFontFamliy);
  font-size: var(--MediumFontSize);
  font-weight: var(--LargeFontWeight);
  line-height: var(--SmallLineHeight);
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
  font-size: var(--SmallFontSize);
  font-weight: var(--SmallFontWeight);
  line-height: var(--SmallLineHeight);
  color: var(--ColorIntenseElement);
  &.wom {
    margin: 0px 10px;
  }
`;
const UserDetails = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
  div:first-of-type {
    display: flex;
    align-items: center;
  }
  .dropdown {
    color: var(--MainColor);
    background-color: var(--HoverTheme);
  }
`;
const Paragraph = styled.p`
  margin: 3px 4px 0px;
  font-style: normal;
  font-family: var(--SecondFontFamliy);
  font-size: var(--MediumFontSize);
  font-weight: var(--SmallFontWeight);
  line-height: var(--LargeLineHeight);
`;
const WriteReply = styled.div`
  width: 100%;
  display: flex;
  background-color: var(--Theme);
  .img-comment {
    margin-top: 4px;
  }
`;
const FormItems = styled.div`
  display: flex;
  flex-direction: column;
`;
const InputItem = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  & .ant-mentions,
  textarea {
    width: 100%;
    border: none;
    background-color: transparent;
    color: var(--ColorElement);
    resize: none;
    min-height: 60px;
    padding: 5px 10px;
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
  padding: 8px;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  button {
    border: none;
    padding: 0px 20px;
    background-color: var(--MainColor);
    border-radius: 25px;
    font-style: normal;
    font-family: var(--SecondFontFamliy);
    font-size: var(--MediumFontSize);
    font-weight: var(--LargeFontWeight);
    line-height: var(--SmallLineHeight);
    color: var(--ColorElement) !important;
    background-color: transparent;
    &.post {
      background-color: var(--MainColor);
    }
    :focus-within {
      outline: 2px solid var(--ColorElement) !important;
    }
    :disabled {
      background-color: var(--MainColor);
    }
    :hover {
      background-color: var(--HoverMainColor);
    }
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
const ImageContent = styled.div`
  margin: auto;
  position: relative;
  background-color: var(--HoverTheme);
  border-radius: 10px;
  img {
    min-width: 200px;
    min-height: 200px;
    max-height: 200px;
    object-fit: contain;
    &.multiple {
      min-width: 200px;
      min-height: 200px;
      max-height: 200px;
    }
  }
`;
const DeleteImg = styled.div`
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
const MentionTo = styled.div`
  border-bottom: 1px solid;
  border-color: var(--MainBorderColor);
  color: var(--ColorElement);
  padding: 10px 11px;
  width: 100%;
  font-style: normal;
  font-weight: var(--LargeFontWeight);
  font-family: var(--SecondFontFamliy);
  font-size: var(--MediumFontSize);
  line-height: var(--VerySmallLineHeight);
  display: flex;
  align-items: center;
  span {
    cursor: pointer;
    margin: 0px 5px;
    display: block;
    background-color: var(--HoverTheme);
    padding: 2px 4px 4px 4px;
    border-radius: 4px;
    transition: background-color 0.1s;
    :hover {
      background-color: #151541;
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
`;
const Additions = styled.div`
  display: flex;
  & button {
    background-color: transparent;
    svg {
      width: 20px;
      fill: var(--MainColor);
    }
    :hover {
      background-color: var(--MainColor);
      svg {
        fill: #fff;
      }
    }
  }
`;
export {
  Container,
  UserContent,
  UserImg,
  UserDetails,
  UserName,
  Verified,
  Time,
  Paragraph,
  WriteReply,
  FormItems,
  InputItem,
  Footer,
  MentionTo,
  Loading,
  FailLoading,
  ImageContent,
  DeleteImg,
  UploadContent,
  Additions,
};
