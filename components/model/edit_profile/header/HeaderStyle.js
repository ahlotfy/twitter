import styled from "@emotion/styled";
const Container = styled.div`
  width: 100%;
  height: 50px;
  position: relative;
  background-color: var(--Theme);
  display: flex;
  justify-content: space-between;
`;
const CloseWidnow = styled.div`
  cursor: pointer;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  margin: 0px 10px;
  :hover {
    background-color: var(--HoverTheme);
  }
  span svg {
    fill: var(--ColorElement);
  }
`;
const SameLine = styled.div`
  width: 100%;
  margin: 0px 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  h3 {
    color: #fff;
    font-style: normal;
    font-family: var(--MainFontFamliy);
    font-size: var(--XLargeFontSize);
    font-weight: var(--LargeFontWeight);
    line-height: var(--LargeLineHeight);
  }
`;
const Button = styled.button`
  width: 80px;
  height: 30px;
  border-radius: 20px;
  cursor: pointer;
  margin: 0px 20px;
  font-style: normal;
  font-family: var(--MainFontFamliy);
  font-size: var(--SmallFontSize);
  font-weight: var(--LargeFontWeight);
  line-height: var(--MediumLineHeight);
  letter-spacing: 0.5px;
  box-shadow: var(--BoxShadow);
  border: 1px solid;
  border-color: var(--MainColor);
  :hover {
    background-color: var(--HoverTheme);
  }
`;
export { Container, CloseWidnow, SameLine, Button };
