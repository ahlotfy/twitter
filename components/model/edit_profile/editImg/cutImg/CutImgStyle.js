import styled from "@emotion/styled";
const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--Theme);
  padding: 10px;
  & h4 {
    color: var(--ColorElement);
    text-align: center;
    font-style: normal;
    font-family: var(--SecondFontFamliy);
    font-weight: var(--SmallFontWeight);
    line-height: var(--VerySmallLineHeight);
  }
`;
const Content = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
`;
const Preview = styled.div`
  width: 100%;
  min-height: 200px;
  display: none;
  align-items: center;
  justify-content: center;
  &.active {
    display: flex;
  }
  & .ant-image {
    width: 100%;
    height: 100%;
    min-height: 250px;
  }
  &.avatar {
    width: 200px;
    height: 200px;
    overflow: hidden;
    border-radius: 50%;
  }
`;
const Box = styled.div`
  position: relative;
  &.hidden {
    display: none;
  }
  &.background_img {
    max-height: 400px;
    border-radius: 5px;
    & .ReactCrop {
      max-height: 400px;
      outline: 4px solid var(--MainColor);
      border-radius: 1px;
      & .ReactCrop__child-wrapper {
        width: 100%;
        height: 100%;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  &.avatar {
    max-height: 400px;
    border-radius: 5px;
    & .ReactCrop {
      max-height: 400px;
      outline: 4px solid var(--MainColor);
      border-radius: 1px;
      & .ReactCrop__child-wrapper {
        width: 100%;
        height: 100%;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  & .ant-image img {
    transition: all 0.2s;
    object-fit: cover;
  }
`;
const Wrap = styled.div`
  width: calc(100% - 20px);
  height: 100%;
  border: 1px solid var(--MainColor);
  border-radius: 10px;
  margin: 10px;
  & :where(.css-dev-only-do-not-override-12jzuas).ant-slider .ant-slider-rail {
    background-color: var(--HoverTheme);
  }
  /* slider-vertical */
  & :where(.css-dev-only-do-not-override-12jzuas).ant-slider-vertical {
    height: calc(100% - 40px);
  }
  & :where(.css-dev-only-do-not-override-12jzuas).ant-slider-vertical {
    margin: 20px 11px;
  }
  /* slider-horizontal */
  & :where(.css-dev-only-do-not-override-12jzuas).ant-slider-horizontal {
    margin: 11px 20px;
  }
`;
const FailLoading = styled.div`
  width: 100%;
  min-height: 200px;
  background-color: var(--HoverTheme);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Icon = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  justify-content: flex-end;
  width: 100%;
  & button {
    height: 40px;
    min-width: 100%;
    background-color: var(--ColorTingeElement);
    :disabled {
      background-color: var(--HoverMainColor) !important;
      svg {
        fill: #fff;
      }
    }
    :hover {
      background-color: var(--MainColor);
      svg {
        fill: #fff;
      }
    }
    svg {
      width: 22px;
      height: 22px;
      fill: #000;
    }
  }
`;
const Scale = styled.div`
  width: 70%;
  margin: 20px auto 0px;
  display: flex;
  flex-direction: column;
`;
export { Container, Box, FailLoading, Content, Scale, Wrap, Preview, Icon };
