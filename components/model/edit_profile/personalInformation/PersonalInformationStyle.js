import styled from "@emotion/styled";
const Container = styled.div`
  padding-bottom: 20px;
  background-color: var(--Theme);
`;
const Box = styled.div`
  position: relative;
`;
const Background = styled.div`
  min-height: 250px;
  width: 100%;
  overflow: hidden;
  position: relative;
  background-color: var(--HoverTheme);
  & .ant-upload {
    height: 100%;
  }
  & .ant-image {
    width: 100%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
      object-fit: inherit;
    }
  }
`;
const Edit = styled.div`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 4000;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: rgba(15, 20, 25, 0.75);
  transition: background-color 0.2s;
  :hover {
    background-color: rgba(39, 44, 48, 0.75);
  }
  svg {
    width: 20px;
    height: 20px;
    fill: #fff;
  }
`;
const UserImg = styled.div`
  position: absolute;
  bottom: 0%;
  transform: translateY(50%);
  left: 15px;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  border: 2px solid var(--Theme);
  & .ant-image {
    width: 100px;
    height: 100px;
    img {
      filter: brightness(70%);
      width: 100%;
      height: 100%;
      object-fit: cover;
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
const Clear = styled.div`
  height: 55px;
`;
const Content = styled.div`
  width: calc(100% - 28px);
  margin: 20px 14px 0px;
  padding: 6px 10px 4px;
  border-radius: 5px;
  border: 2px solid transparent;
  transition: border 0.1s;
  border-color: var(--MainBorderColor);
  :focus-within {
    border: 2px solid var(--MainColor);
  }
  :focus-within label h4 {
    color: var(--MainColor);
  }
  :focus-within label span {
    color: var(--MainColor);
  }
  & :where(.css-dev-only-do-not-override-12jzuas).ant-input {
    padding: 0px;
    margin: 0px;
    border: none;
    outline: none;
    padding-bottom: 5px;
    width: 100%;
    background-color: transparent;
    color: #fff;
    font-style: normal;
    font-family: var(--MainFontFamliy);
    font-size: var(--LargeFontSize);
    font-weight: var(--SmallFontWeight);
    line-height: var(--MediumLineHeight);
    resize: none;
    box-shadow: none;
    ::placeholder {
      color: var(--ColorIntenseElement);
    }
  }
`;
const Label = styled.label`
  width: 100%;
  color: rgb(239, 243, 244);
  font-style: normal;
  font-family: var(--MainFontFamliy);
  font-size: var(--SmallFontSize);
  font-weight: var(--SmallFontWeight);
  line-height: var(--MediumLineHeight);
  transition: color 0.1s;
  display: flex;
  justify-content: space-between;
  h4 {
    color: var(--ColorIntenseElement);
  }
  span {
    color: transparent;
  }
`;
const Bottom = styled.div`
  width: calc(100% - 28px);
  margin: 10px 14px 0px;
  display: flex;
  justify-content: flex-end;
  & button {
    background-color: transparent;
    border-color: var(--MainBorderColor);
    :hover {
      background-color: var(--MainColor);
      border-color: transparent !important;
    }
    span {
      color: var(--ColorElement);
    }
  }
`;
export {
  Container,
  Box,
  Background,
  Edit,
  UserImg,
  Clear,
  Content,
  Label,
  FailLoading,
  Bottom,
};
