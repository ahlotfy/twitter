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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  background-color: var(--Theme);
  min-height: 100px;
  padding-left: 8px;
  padding-right: 8px;
`;
const Content = styled.div`
  display: flex;
  width: 100%;
`;
const Tweet = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
const Box = styled.label`
  display: flex;
  align-items: flex-start;
  textarea {
    width: 100%;
    min-height: 50px;
    background-color: transparent;
    color: var(--ColorElement);
    outline: none;
    border: none;
    font-style: normal;
    font-family: var(--SecondFontFamliy);
    font-size: var(--XXLargeFontSize);
    font-weight: var(--SmallFontWeight);
    line-height: var(--LargeLineHeight);
    box-shadow: none !important ;
    ::placeholder {
      font-size: var(--XXLargeFontSize);
      color: var(--ColorIntenseElement);
    }
  }
`;
const UserImg = styled.div`
  width: 45px;
  height: 45px;
  & .ant-image {
    width: 45px;
    height: 45px;
    img {
      width: 40px;
      height: 40px;
      object-fit: contain;
      border-radius: 50%;
    }
  }
`;
const BoxTweet = styled.div`
  width: 100%;
  margin-top: 10px;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
`;
const UploadBox = styled.div`
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 10px;
  &.multiple {
    grid-template-columns: repeat(2, 1fr);
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
  right: 0%;
  margin: 0px 4px;
  z-index: 2000;
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
const UploadContent = styled.div`
  margin: auto;
  position: relative;
  background-color: var(--HoverTheme);
  border-radius: 10px;
  img,
  video {
    min-width: 200px;
    min-height: 200px;
    max-width: 200px;
    max-height: 200px;
    object-fit: contain;
    &.multiple {
      min-width: 200px;
      min-height: 200px;
      max-width: 200px;
      max-height: 200px;
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
const Loading = styled.div`
  width: 100%;
  height: 1px;
  background-color: var(--MainBorderColor);
  position: relative;
  &.loading,
  &.error {
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
  }
`;
export {
  Container,
  Content,
  Tweet,
  Box,
  UserImg,
  BoxTweet,
  DeleteUpload,
  UploadContent,
  UploadBox,
  FailLoading,
  Loading,
};
