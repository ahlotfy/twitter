import styled from "@emotion/styled";
const Container = styled.div`
  width: 100%;
  height: 50px;
  position: relative;
  top: 0px;
  left: 0px;
  z-index: 2300;
  backdrop-filter: blur(12px);
  display: flex;
  align-items: center;
  background-color: var(--Theme);
`;
const CloseWidnow = styled.div`
  & button {
    border: none;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    margin: 0px 10px;
    :hover {
      background-color: var(--HoverTheme);
    }
    span svg {
      fill: var(--ColorElement);
    }
  }
`;
const SameLine = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  width: 100%;
  margin: 0px 5px;
  h3 {
    color: #fff;
    font-style: normal;
    font-family: var(--MainFontFamliy);
    font-size: var(--XLargeFontSize);
    font-weight: var(--LargeFontWeight);
    line-height: var(--LargeLineHeight);
  }
`;
const Buttons = styled.div`
  & button {
    width: 80px;
    height: 30px;
    border-radius: 20px;
    cursor: pointer;
    margin: 0px 5px;
    font-style: normal;
    font-family: var(--MainFontFamliy);
    font-size: var(--SmallFontSize);
    font-weight: var(--LargeFontWeight);
    line-height: var(--MediumLineHeight);
    letter-spacing: 0.5px;
    box-shadow: var(--BoxShadow);
    border: 1px solid;
    border-color: var(--MainColor);
    background-color: var(--Theme);
    color: #fff !important;
    :disabled {
      color: #000;
      background-color: #949494;
      cursor: default;
      :hover {
        background-color: #949494;
      }
    }
    :hover {
      background-color: var(--HoverTheme);
    }
    &.cancel {
      background-color: red;
      :hover {
        background-color: #af0707;
      }
    }
  }
`;
export { Container, CloseWidnow, SameLine, Buttons };
