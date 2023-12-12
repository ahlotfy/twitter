import styled from "@emotion/styled";
const InteractionsContent = styled.div`
  display: flex;
  padding: 10px;
  justify-content: space-between;
  align-items: center;
`;
const Reply = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all var(--MainTransition);
  color: var(--ColorIntenseElement);
  fill: var(--ColorIntenseElement);
  svg {
    width: 30px;
    height: 15px;
  }
  :hover,
  &.active {
    color: var(--MainColor);
    fill: var(--MainColor);
  }
`;
const Retweet = styled(Reply)`
  :hover {
    color: #00ba7c;
    fill: #00ba7c;
  }
`;
const Like = styled(Reply)`
  & span.filled {
    display: none;
  }
  &.active {
    & span.filled {
      display: block;
    }
    & span.outlined {
      display: none;
    }
  }
  :hover {
    span.filled svg {
      fill: #e96da6;
    }
  }
  :hover,
  &.active {
    color: #f91880;
    fill: #f91880;
  }
`;
const ReplyCount = styled.div`
  text-align: center;
  width: 10px;
  font-style: normal;
  font-family: var(--SecondFontFamliy);
  font-size: var(--VerySmallFontSize);
  font-weight: var(--SmallFontWeight);
  line-height: var(--VerySmallLineHeight);
`;
const RetweetCount = ReplyCount;
const LikesCount = ReplyCount;
export {
  InteractionsContent,
  Reply,
  Retweet,
  Like,
  ReplyCount,
  RetweetCount,
  LikesCount,
};
