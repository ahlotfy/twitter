import styled from "@emotion/styled";
const Container = styled.div`
  width: 100%;
  padding-left: 14px;
  padding-right: 14px;
  z-index: 199;
  height: 48px;
  display: flex;
  align-items: center;
  position: fixed;
  backdrop-filter: blur(12px);
  border-bottom: 1px solid;
  border-color: var(--MainBorderColor);
  color: var(--ColorElement);
  @media (max-width: 576px) {
    width: 100%;
    &.home {
      height: 100px;
      padding-left: 0px;
      padding-right: 0px;
    }
  }
  @media (min-width: 576px) {
    width: 471px;
  }
  @media (min-width: 768px) {
    width: 638px;
  }
  @media (min-width: 992px) {
    width: 544px;
  }
  @media (min-width: 1200px) {
    width: 642px;
  }
  @media (min-width: 1400px) {
    width: 650px;
  }
  @media (min-width: 1480px) {
    width: 692px;
  }
`;
export { Container };
