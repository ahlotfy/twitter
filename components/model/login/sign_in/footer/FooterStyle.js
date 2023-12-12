import styled from "@emotion/styled";

const Container = styled.div`
  height: 80px;
  position: relative;
  bottom: 0px;
  left: 0px;
  z-index: 2300;
  backdrop-filter: blur(12px);
  border-top: 1px solid;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: inherit;
  border-color: inherit;
  margin-top: 10px;
  border-color: var(--MainBorderColor);
`;
const NextBtn = styled.div`
  width: 100%;
  & button {
    width: 100%;
    border-radius: 25px;
    text-align: center;
    height: 50px;
    font-style: normal;
    font-family: var(--MainFontFamliy);
    font-size: var(--LargeFontSize);
    font-weight: var(--LargeFontWeight);
    line-height: var(--LargeLineHeight);
    background-color: #fff;
    :disabled {
      color: #000;
      background-color: #949494;
      cursor: default;
      :hover {
        background-color: #949494;
      }
    }
    :hover {
      background-color: rgb(230, 230, 230);
    }
    :focus-within {
      border: 3px solid var(--MainColor);
    }
  }
`;
export { Container, NextBtn };
