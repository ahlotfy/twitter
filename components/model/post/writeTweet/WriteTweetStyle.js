import styled from "@emotion/styled";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  overflow-y: auto;
  padding: 0px 10px 10px;
  background-color: var(--Theme);
  min-height: 100px;
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
const DeleteUploaded = styled.div`
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
  width: 100%;
  border-radius: 5px;
  overflow: hidden;
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
    min-width: 200px;
    min-height: 200px;
    max-height: 500px;
    background-color: var(--HoverTheme);
    filter: brightness(0.8);
    object-fit: cover;
    &.multiple {
      min-width: 200px;
      min-height: 200px;
      max-width: 200px;
      max-height: 300px;
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
export {
  Container,
  Tweet,
  Box,
  UserImg,
  BoxTweet,
  DeleteUploaded,
  UploadContent,
  UploadBox,
  FailLoading,
};
