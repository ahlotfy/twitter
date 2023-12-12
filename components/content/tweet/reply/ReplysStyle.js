import styled from "@emotion/styled";
import { keyframes } from "@emotion/css";
const selected = keyframes`
0%{background-color: var(--Theme)},
25%{background-color: var(--HoverTheme)},
50%{background-color: var(--Theme)},
75%{background-color: var(--HoverTheme)},
100%{background-color: var(--Theme)},
`;
const ReplyTweetContent = styled.div`
  background-color: var(--Theme);
  :hover {
    background-color: var(--SupportTheme);
  }
  &.active {
    animation: ${selected} 3s 1;
  }
`;
const UserContent = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 10px;
  color: var(--ColorTingeElement);
`;
const ReplyCommentContent = styled.div`
  transition: height var(--MainTransition) ease;
  /* Google */
  ::-webkit-scrollbar {
    width: 3px;
  }
  ::-webkit-scrollbar-track {
    background-color: var(--Theme);
  }
  ::-webkit-scrollbar-thumb {
    background-color: var(--MainColor);
    border-radius: 25px;
  }
  /* Fire Fox */
  scrollbar-color: var(--MainColor) var(--Theme);
  scrollbar-width: thin;
  &.active {
    overflow-y: scroll;
    max-height: 400px;
  }
`;
const ReplyContent = styled.div`
  display: flex;
  align-items: flex-start;
  transition: background-color var(--MainTransition);
`;
const Mentioned = styled.div`
  color: var(--ColorElement);
  width: 100%;
  display: flex;
  align-items: center;
  margin-top: 4px;
  span {
    padding: 1px 4px 2px 4px;
    font-style: normal;
    font-family: var(--SecondFontFamliy);
    font-size: var(--MediumFontSize);
    line-height: var(--VerySmallLineHeight);
    font-weight: var(--LargeFontWeight);
    cursor: pointer;
    display: block;
    background-color: var(--HoverTheme);
    border-radius: 4px;
    transition: background-color 0.1s;
    :hover {
      background-color: #151541;
    }
  }
  span + p {
    margin: 0px 3px;
  }
`;
const CommentContent = styled.div`
  display: flex;
  align-items: flex-start;
  transition: background-color var(--MainTransition);
  cursor: pointer;
  :hover {
    background-color: var(--HoverTheme);
  }
`;
const Comment = styled.div`
  width: 100%;
`;
export {
  ReplyTweetContent,
  ReplyCommentContent,
  ReplyContent,
  UserContent,
  Mentioned,
  CommentContent,
  Comment,
};
