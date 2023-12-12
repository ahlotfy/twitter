import styled from "@emotion/styled";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  overflow-y: auto;
  padding: 0px 10px 10px;
  background-color: var(--Theme);
`;
const PlaceReply = styled.div`
  display: flex;
`;
const Box = styled.label`
  width: calc(100% - 10px);
  display: flex;
  align-items: flex-start;
  margin: 0px 10px;
  &.quote {
    flex-direction: column;
    align-items: center;
  }
  textarea {
    padding: 10px 0px;
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
  width: 40px;
  height: 100%;
  img {
    width: 40px;
    height: 40px;
    object-fit: contain;
    border-radius: 50%;
  }
  &.quote {
    width: 30px;
    img {
      width: 20px;
      height: 20px;
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

const BoxImg = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 10px;
  &.multiple {
    grid-template-columns: repeat(2, 1fr);
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
const ImageContent = styled.div`
  margin: auto;
  position: relative;
  background-color: var(--HoverTheme);
  border-radius: 10px;
  img {
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
const UserContent = styled.div`
  display: flex;
  align-items: flex-start;
  align-items: center;
  overflow: hidden;
  color: var(--ColorTingeElement);
  background-color: var(--Theme);
  border-radius: 10px;
  border: 1px solid;
  border-color: var(--MainBorderColor);
`;
const ImgBox = styled.div`
  background-color: var(--HoverTheme);
  max-height: 400px;
  .ant-image {
    text-align: center;
    max-height: 400px;
  }
  img {
    background-color: var(--HoverTheme);
    filter: brightness(0.9);
    object-fit: cover;
  }
`;
export {
  Container,
  PlaceReply,
  Box,
  DeleteImg,
  UserImg,
  BoxTweet,
  BoxImg,
  ImageContent,
  FailLoading,
  UserContent,
  ImgBox,
};
