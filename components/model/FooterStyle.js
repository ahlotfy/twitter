import styled from "@emotion/styled";
import { keyframes } from "@emotion/css";
const loading = keyframes`
0%{width: 0%},
25%{width: 25%},
50%{width: 50%},
75%{width: 75%},
100%{width: 100%},
`;
const Container = styled.div`
  position: relative;
  bottom: 0px;
  left: 0px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 8px 15px;
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
const Loading = styled.div`
  width: 100%;
  height: 1px;
  background-color: var(--MainBorderColor);
  position: relative;
  &.loading,
  &.error {
    :after {
      content: "";
      position: absolute;
      height: 100%;
      display: block;
      left: 0px;
      top: 0px;
    }
    &.loading {
      :after {
        animation: ${loading} 1s infinite;
        background-color: var(--MainColor);
      }
    }
    &.error {
      :after {
        animation: ${loading} 2s 1;
        background-color: red;
      }
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
export { Container, Additions, Loading, PostBtn };
