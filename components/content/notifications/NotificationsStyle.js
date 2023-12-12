const { default: styled } = require("@emotion/styled");

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100.1vh;
  .overlay {
    height: 48px;
  }
`;
const Arrow = styled.div`
  width: 30.4px;
  height: 30.4px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  :hover {
    background-color: var(--HoverTheme);
  }
  svg {
    width: 18px;
    height: 18px;
    fill: #fff;
  }
`;
const Title = styled.div`
  margin: 0px 15px;
  h2 {
    font-style: normal;
    font-family: var(--MainFontFamliy);
    font-size: var(--XLargeFontSize);
    font-weight: var(--LargeFontWeight);
    line-height: var(--LargeLineHeight);
  }
`;
const Clear = styled.div`
  height: 48px;
`;
const NotificationContent = styled.div`
  padding: 10px 5px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  border-bottom: 1px solid;
  cursor: pointer;
  border-color: var(--MainBorderColor);
  &.unread {
    background-color: var(--SupportTheme);
  }
  :hover {
    background-color: var(--HoverTheme);
  }
`;
const ImgBox = styled.div`
  width: 35px;
  height: 35px;
  max-width: 35px;
  max-height: 35px;
  box-sizing: content-box;
  img {
    border-radius: 50%;
    width: 100%;
    height: 100%;
    object-fit: contain;
    overflow: hidden;
    transform: scale(1.1);
  }
`;
const Box = styled.div`
  display: flex;
  width: 100%;
`;
const Info = styled.div`
  display: flex;
  align-items: center;
`;
const UserName = styled.h2`
  display: block;
  cursor: pointer;
  font-style: normal;
  font-family: var(--SecondFontFamliy);
  font-size: var(--MediumFontSize);
  font-weight: var(--LargeFontWeight);
  line-height: var(--SmallLineHeight);
  color: var(--ColorElement);
  text-decoration: none;
`;
const Barrier = styled.div`
  margin: 0px 5px;
`;
const Message = styled.p`
  display: inline-flex;
  color: var(--ColorElement);
  font-style: normal;
  font-family: var(--SecondFontFamliy);
  font-size: var(--MediumFontSize);
  font-weight: var(--SmallFontWeight);
  line-height: 1.6;
  a {
    color: var(--MainColor);
    &:hover {
      color: var(--HoverMainColor);
    }
  }
`;
const Delete = styled.div`
  Button {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: transparent;
    border: none;
    :hover {
      background-color: var(--HoverTheme);
    }
    svg {
      fill: red;
    }
  }
`;
const SkeletonContent = styled.div`
  width: 100%;
  cursor: default;
  &
    :where(
      .css-dev-only-do-not-override-12jzuas
    ).ant-skeleton.ant-skeleton-active
    .ant-skeleton-title,
  &
    :where(
      .css-dev-only-do-not-override-12jzuas
    ).ant-skeleton.ant-skeleton-active
    .ant-skeleton-paragraph
    > li,
  &
    :where(
      .css-dev-only-do-not-override-12jzuas
    ).ant-skeleton.ant-skeleton-active
    .ant-skeleton-avatar,
  &:where(
      .css-dev-only-do-not-override-12jzuas
    ).ant-skeleton.ant-skeleton-active
    .ant-skeleton-button,
  &:where(
      .css-dev-only-do-not-override-12jzuas
    ).ant-skeleton.ant-skeleton-active
    .ant-skeleton-input,
  &:where(
      .css-dev-only-do-not-override-12jzuas
    ).ant-skeleton.ant-skeleton-active
    .ant-skeleton-image {
    background-color: var(--HoverTheme) !important;
  }
  &
    :where(.css-dev-only-do-not-override-12jzuas).ant-skeleton
    .ant-skeleton-content
    .ant-skeleton-paragraph {
    display: none;
  }
`;
export {
  Container,
  Title,
  Arrow,
  UserName,
  Clear,
  NotificationContent,
  ImgBox,
  Info,
  Message,
  Barrier,
  Delete,
  Box,
  SkeletonContent,
};
