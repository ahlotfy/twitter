import styled from "@emotion/styled";
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
const Clear = styled.div`
  height: 48px;
`;
const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const ImgBox = styled.div`
  width: 100%;
  height: 300px;
  margin-top: 10px;
  margin-bottom: 10px;
  & :where(.css-dev-only-do-not-override-12jzuas).ant-image {
    width: 100%;
    height: 100%;
    .ant-image-img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
`;
const TitleBox = styled.h2`
  margin-top: 20px;
  color: var(--ColorElement);
  font-style: normal;
  font-family: var(--MainFontFamliy);
  font-weight: var(--LargeFontWeight);
  line-height: var(--LargeLineHeight);
`;
const LinksBox = styled.div`
  margin-top: 40px;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  & button {
    background-color: transparent;
    border: 1px solid var(--MainBorderColor);
    width: 100px;
    height: 40px;
    &:hover {
      border: 1px solid var(--MainColor);
    }
    span {
      color: var(--ColorElement);
    }
  }
`;
export { Arrow, Clear, Content, ImgBox, TitleBox, LinksBox };
