import styled from "@emotion/styled";
const ResultContainer = styled.div`
  padding: 0px 15px;
  width: 100%;
  margin: auto;
  color: var(--ColorElement);
  background-color: var(--Theme);
  &
    :where(.css-dev-only-do-not-override-12jzuas).ant-result
    .ant-result-icon
    > .anticon {
    font-size: 70px;
  }
  & :where(.css-dev-only-do-not-override-12jzuas).ant-result {
    & .ant-result-title,
    & .ant-result-subtitle {
      color: var(--ColorElement);
    }
  }
`;
export { ResultContainer };
