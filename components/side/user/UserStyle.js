import styled from "@emotion/styled";
const Container = styled.div`
  width: 100%;
  border-radius: 10px;
  color: var(--ColorTingeElement);
  border: 1px solid;
  border-color: var(--MainBorderColor);
  background-color: var(--HoverTheme);
`;
const Heading = styled.h2`
  padding: 11px 14px;
  font-style: normal;
  font-family: var(--MainFontFamliy);
  font-size: var(--XLargeFontSize);
  font-weight: var(--XLargeFontWeight);
  line-height: var(--LargeLineHeight);
`;
const Content = styled.div``;
const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 11px 14px;
  &.skeleton {
    padding: 0px;
    :hover {
      background-color: inherit;
    }
  }
  cursor: pointer;
  :hover {
    background-color: var(--HoverTheme);
  }
`;
const UserContent = styled.div`
  display: flex;
  align-items: center;
`;
const FollowBtn = styled.button`
  cursor: pointer;
  border-radius: 25px;
  outline: none;
  border: none;
  font-style: normal;
  font-family: var(--SecondFontFamliy);
  font-size: var(--SmallFontSize);
  font-weight: var(--LargeFontWeight);
  line-height: var(--SmallLineHeight);
  padding: 5px 14px;
  transition: background-color var(--MainTransition);
  color: var(--ColorElement);
  background-color: var(--HoverTheme);
  border: 1px solid transparent;
  :hover {
    border: 1px solid var(--MainColor);
  }
`;
const ImgUser = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
    transform: scale(1.1);
  }
`;
const UserName = styled.div`
  padding-left: 10px;
  padding-right: 10px;
  font-style: normal;
  font-family: var(--SecondFontFamliy);
  font-size: var(--MediumFontSize);
  font-weight: var(--LargeFontWeight);
  line-height: var(--XLargeFontSize);
`;
const ShowMore = styled.div`
  color: var(--MainColor);
  padding: 11px 14px;
  font-style: normal;
  font-family: var(--SecondFontFamliy);
  font-size: var(--MediumFontSize);
  font-weight: var(--SmallFontWeight);
  line-height: var(--SmallLineHeight);
  span {
    cursor: pointer;
  }
`;
const SkeletonContent = styled.div`
  width: 100%;
  padding: 7px 8px 0px;
  display: flex;
  flex-direction: column;
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
`;

export {
  Container,
  Heading,
  Box,
  UserContent,
  FollowBtn,
  ImgUser,
  UserName,
  ShowMore,
  Content,
  SkeletonContent,
};
