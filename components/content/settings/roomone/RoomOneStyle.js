import styled from "@emotion/styled";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1.2;
  position: relative;
  color: #fff;
  border-color: var(--MainBorderColor);
  @media (max-width: 576px) {
    max-width: 100%;
  }
  .overlay {
    height: 48px;
  }
  @media (max-width: 992px) {
    display: none;
    &.visible {
      display: flex;
    }
  }
`;
const Option = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  cursor: pointer;
  background-color: transparent;
  transition: background-color var(--MainTransition);
  color: var(--ColorTingeElement);
  :hover {
    background-color: var(--HoverTheme);
  }
  &.danger {
    color: red;
  }
  svg {
    fill: var(--ColorElement);
    width: 18px;
    height: 18px;
  }
  h4 {
    font-style: normal;
    font-family: var(--MainFontFamliy);
    font-size: var(--MediumFontSize);
    font-weight: var(--SmallFontWeight);
    line-height: var(--LargeLineHeight);
  }
`;
export { Container, Option };
