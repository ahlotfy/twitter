import styled from "@emotion/styled";
const Container = styled.div`
  height: calc(100% - 70px);
  width: 100%;
`;
const Box = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const BoxImg = styled.div`
  padding-top: 30px;
  padding-bottom: 30px;
  img {
    width: 300px;
    height: 151px;
    object-fit: contain;
  }
`;
const Words = styled.div`
  font-family: var(--SecondFontFamliy);
  font-size: var(--LargeFontSize);
  h2 {
    color: var(--ColorElement);
  }
  p {
    padding-top: 10px;
    font-size: var(--MediumFontSize);
    font-weight: var(--LargeFontWeight);
    line-height: var(--SmallLineHeight);
    color: var(--ColorIntenseElement);
  }
`;
export { Container, Box, BoxImg, Words };
