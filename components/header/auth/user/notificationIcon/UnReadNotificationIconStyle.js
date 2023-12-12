import styled from "@emotion/styled";
const NotificationIconContent = styled.div`
  position: relative;
  width: 100%;
`;
const Mark = styled.div`
  position: absolute;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  bottom: 30%;
  left: 60%;
  transform: translate(0%, 50%);
  background-color: var(--MainColor);
`;
export { NotificationIconContent, Mark };
