import styled from "@emotion/styled";
import { keyframes } from "@emotion/css";
const loading = keyframes`
0%{width: 0%},
25%{width: 25%},
50%{width: 50%},
75%{width: 75%},
100%{width: 100%},
`;
const Loading = styled.div`
  width: 100%;
  background-color: var(--MainBorderColor);
  height: 1px;
  position: relative;
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
`;
export { Loading };
