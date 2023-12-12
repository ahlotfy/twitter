import styled from "@emotion/styled";
const Container = styled.div`
  position: relative;
  bottom: 0px;
  left: 0px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 8px 0px;
  background-color: var(--Theme);
  button {
    border: 1px solid transparent;
    border-radius: 25px;
    span {
      color: var(--ColorElement);
      font-style: normal;
      font-family: var(--SecondFontFamliy);
      font-size: var(--MediumFontSize);
      font-weight: var(--LargeFontWeight);
    }
    &.post {
      padding: 0px 20px;
    }
    :hover {
      background-color: var(--HoverMainColor);
    }
  }
`;
const Additions = styled.div`
  display: flex;
  & button {
    background-color: transparent;
    svg {
      width: 20px;
      fill: var(--MainColor);
    }
    :hover {
      background-color: var(--MainColor);
      svg {
        fill: #fff;
      }
    }
  }
`;
const PostBtn = styled.div`
  button {
    background-color: var(--MainColor);
    :disabled {
      border: 1px solid var(--MainBorderColor);
      background-color: transparent;
      span {
        color: var(--ColorIntenseElement);
      }
      :hover {
        background-color: transparent;
      }
    }
  }
`;
export { Container, Additions, PostBtn };
