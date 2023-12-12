import styled from "@emotion/styled";
const Container = styled.div`
  display: flex;
  flex: 3.2;
  position: relative;
  min-height: 100vh;
  border-left: 1px solid var(--MainBorderColor);
  border-right: 1px solid var(--MainBorderColor);
  @media (max-width: 1200px) {
    flex: 3.2;
  }
  @media (max-width: 992px) {
    flex: 2;
  }
  @media (max-width: 576px) {
    border: none;
  }
`;
const Title = styled.div`
  width: 100%;
  padding-left: 10px;
  padding-right: 10px;
  z-index: 199;
  height: 48px;
  display: flex;
  align-items: center;
  position: relative;
  backdrop-filter: blur(12px);
  border-bottom: 1px solid;
  border-color: var(--MainBorderColor);
  color: var(--ColorElement);
  h2 {
    margin: 0px 10px;
    font-style: normal;
    font-family: var(--MainFontFamliy);
    font-size: var(--XLargeFontSize);
    font-weight: var(--LargeFontWeight);
    line-height: var(--LargeLineHeight);
  }
`;
const Clear = styled.div`
  height: 48px;
`;
export { Container, Clear, Title };
