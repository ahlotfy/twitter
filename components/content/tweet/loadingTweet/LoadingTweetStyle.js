import styled from "@emotion/styled";
const SkeletonContent = styled.div`
  width: 100%;
  padding: 7px 8px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid var(--MainBorderColor);
  &.last {
    margin-bottom: 100px;
  }
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
const Box = styled.div`
  width: 100%;
`;
export { SkeletonContent, Box };
