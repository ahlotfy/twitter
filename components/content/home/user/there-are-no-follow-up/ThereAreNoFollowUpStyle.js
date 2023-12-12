import styled from "@emotion/styled";
const Container = styled.div`
  width: 65%;
  margin-left: auto;
  margin-right: auto;
  color: var(--ColorElement);
  font-style: normal;
  font-family: var(--MainFontFamliy);
  line-height: var(--LargeLineHeight);
  @media (max-width: 576px) {
    width: 100%;
    text-align: center;
  }
  button {
    height: 50px;
    width: 130px;
    border-radius: 25px;
    background-color: var(--MainColor);
    border: none;
    :hover {
      background-color: var(--HoverMainColor);
    }
    span {
      font-size: var(--LargeFontSize);
      font-weight: var(--LargeFontWeight);
      color: #fff;
    }
  }
`;
const Title = styled.h1`
  margin-bottom: 20px;
  font-weight: var(--LargeFontWeight);
  line-height: var(--XLargeLineHeight);
  @media (max-width: 576px) {
    font-size: 28px;
  }
`;
const Paragraph = styled.p`
  margin-bottom: 20px;
  font-weight: var(--SmallFontWeight);
`;
export { Container, Title, Paragraph };
