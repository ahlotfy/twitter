import styled from "@emotion/styled";
const Container = styled.div`
  width: 100%;
  height: 50px;
  position: relative;
  background-color: var(--Theme);
  border-bottom: 1px solid var(--MainBorderColor);
`;
const CloseWidnow = styled.div`
  button {
    border: none;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    margin: 0px 10px;
    :hover {
      background-color: var(--HoverTheme);
    }
    span svg {
      fill: var(--ColorElement);
    }
  }
`;

export { Container, CloseWidnow };
