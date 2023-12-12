import styled from "@emotion/styled";
const Container = styled.div`
  max-height: 100vh;
  height: 100vh;
  overflow: hidden;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Logo = styled.div`
  width: 60.4px;
  height: 60.4px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  margin-top: 3px;
  cursor: pointer;
  :hover {
    background-color: var(--HoverColor_LightTheme);
  }
  svg {
    width: 100%;
    height: 100%;
  }
`;
export { Container, Logo };
