import styled from "@emotion/styled";
import { keyframes } from "@emotion/css";
const selected = keyframes`
0%{background-color: var(--Theme)},
25%{background-color: var(--HoverTheme)},
50%{background-color: var(--Theme)},
75%{background-color: var(--HoverTheme)},
100%{background-color: var(--Theme)},
`;
const UserContent = styled.div`
  display: flex;
  align-items: flex-start;
  align-items: center;
  overflow: hidden;
  color: var(--ColorTingeElement);
  background-color: var(--Theme);
  border-bottom: 1px solid;
  border-color: var(--MainBorderColor);
  &.active {
    animation: ${selected} 3s 1;
  }
  &.reply_content {
    border-radius: 10px;
    margin: 10px 10px 2px;
    border: 1px solid;
    border-color: var(--MainBorderColor);
    cursor: pointer;
    :hover {
      background-color: var(--SupportTheme);
    }
  }
`;
const ImgBox = styled.div`
  max-height: 400px;
  .ant-image {
    text-align: center;
    max-height: 400px;
  }
  img {
    filter: brightness(0.9);
    object-fit: cover;
  }
  &.retweet {
    img {
      max-width: 300px;
      max-height: 300px;
      border-radius: 7px;
      background-color: transparent;
    }
  }
`;
const QuoteConent = styled.div`
  display: flex;
`;
export { UserContent, ImgBox, QuoteConent };
