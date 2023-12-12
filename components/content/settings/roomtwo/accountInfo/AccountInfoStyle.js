const { default: styled } = require("@emotion/styled");

const Option = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  background-color: transparent;
  transition: background-color var(--MainTransition);
  color: var(--ColorTingeElement);
  h4 {
    color: var(--ColorElement);
    font-style: normal;
    font-family: var(--MainFontFamliy);
    font-size: var(--MediumFontSize);
    font-weight: var(--SmallFontWeight);
    line-height: var(--LargeLineHeight);
  }
`;
const Title = styled.p`
  cursor: default;
  color: var(--ColorIntenseElement);
  margin-bottom: 10px;
  font-style: normal;
  font-family: var(--MainFontFamliy);
  font-size: var(--MediumFontSize);
  font-weight: var(--SmallFontWeight);
  line-height: var(--LargeLineHeight);
`;
const OptionContent = styled.div`
  padding: 10px 10px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  :hover {
    background-color: var(--HoverTheme);
  }
  button {
    background-color: transparent;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
      fill: var(--ColorElement);
      width: 18px;
      height: 18px;
    }
  }
`;
const Content = styled.div`
  padding: 10px;
  border-top: 1px solid;
  border-bottom: 1px solid;
  border-color: var(--MainBorderColor);
`;

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  & button {
    margin-top: 10px;
    background-color: var(--MainColor);
    border-color: var(--MainBorderColor);
    :disabled {
      border-color: var(--MainBorderColor);
      color: var(--ColorElement);
      background-color: var(--HoverTheme);
    }
    span {
      color: var(--ColorElement);
    }
  }
  &:nth-of-type(2) {
    margin: 15px 0px;
  }
  &.special {
    margin: 0px;
    button {
      background-color: red;
      :hover {
        background-color: #c70707;
      }
      :disabled {
        color: #fff;
        background-color: #eb4141;
      }
    }
  }
  input {
    border-color: var(--MainBorderColor);
    background-color: transparent;
    color: var(--ColorElement);
    padding-top: 10px;
    padding-bottom: 10px;
    :hover,
    :focus {
      border-color: var(--MainColor);
    }
  }
  .ant-select-show-search:where(
      .css-dev-only-do-not-override-12jzuas
    ).ant-select:not(.ant-select-customize-input)
    .ant-select-selector {
    background-color: transparent;
    color: var(--ColorElement);
  }
  & :where(.css-dev-only-do-not-override-12jzuas).ant-picker {
    width: 100%;
    background-color: transparent;
    .ant-picker-input > input {
      color: var(--ColorElement);
    }
  }
  & :where(.css-dev-only-do-not-override-12jzuas).ant-input-affix-wrapper {
    background-color: transparent;
    color: var(--ColorElement);
    input {
      ::placeholder {
        color: var(--ColorIntenseElement);
        font-style: normal;
        font-family: var(--MainFontFamliy);
        font-size: var(--MediumFontSize);
        font-weight: var(--SmallFontWeight);
        line-height: var(--LargeLineHeight);
      }
    }
    svg {
      color: var(--MainColor);
      width: 18px;
      height: 18px;
    }
  }
`;
const OptionValue = styled.div`
  font-family: var(--SecondFontFamliy);
  font-size: var(--SmallFontSize);
  font-weight: var(--SmallFontWeight);
  line-height: var(--LargeLineHeight);
  color: var(--ColorIntenseElement);
`;
const Label = styled.label`
  width: 100%;
  font-style: normal;
  font-family: var(--MainFontFamliy);
  font-size: var(--SmallFontSize);
  font-weight: var(--SmallFontWeight);
  line-height: var(--MediumLineHeight);
  transition: color 0.1s;
  display: flex;
  justify-content: space-between;
  align-items: center;
  p {
    color: transparent;
  }
  svg {
    width: 15px;
    height: 15px;
    color: inherit;
  }
  h4 {
    color: inherit;
  }
`;
const ContentItem = styled.div`
  /* width: calc(100% - 28px);*/
  width: 100%;
  padding: 6px 10px 4px;
  margin-top: 20px;
  border-radius: 5px;
  border: 2px solid transparent;
  transition: border 0.1s;
  color: var(--ColorElement);
  border-color: var(--MainBorderColor);
  &.select-style {
    margin: 20px 5px;
    padding: 4px 10px 0px;
  }
  :focus-within {
    border: 2px solid var(--MainColor);
  }
  :focus-within label h4 {
    color: var(--MainColor);
  }
  &.invalid:focus-within label h4 {
    color: red !important;
  }
  :focus-within label p {
    color: var(--MainColor);
  }
  &.invalid:focus-within label p {
    color: red !important;
  }
  .input-style {
    padding: 2px 0px 4px 0px;
    margin: 0px;
    border: none;
    outline: none;
    box-shadow: none;
    width: 100%;
    background-color: transparent;
    font-style: normal;
    font-family: var(--MainFontFamliy);
    font-size: var(--LargeFontSize);
    font-weight: var(--SmallFontWeight);
    line-height: var(--MediumLineHeight);
    color: var(--ColorElement);
  }
  &.invalid {
    border-color: red !important;
    color: red !important;
  }
`;
export {
  OptionContent,
  Title,
  Content,
  Option,
  OptionValue,
  Label,
  ContentItem,
  FormSection,
};
