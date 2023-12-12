import styled from "@emotion/styled";
const Container = styled.div`
  height: 70px;
  .overlay {
    height: 70px;
  }
`;
const SearchContent = styled.div`
  width: 100%;
  height: 35px;
  display: flex;
  align-items: center;
  border-radius: 25px;
  position: relative;
  border: 1px solid transparent;
  z-index: 100;
  overflow: hidden;
  color: var(--ColorTingeElement);
  background-color: var(--HoverTheme);
  border: 1px solid transparent;
  :focus-within {
    transition: border-color var(--MainTransition);
    background-color: transparent;
    border: 1px solid var(--MainColor);
    color: var(--MainColor);
  }
  & input.input_search {
    resize: none;
    border: none;
    outline: none;
    box-shadow: none;
    background-color: transparent;
    width: calc(90% - 2px);
    padding: 4px 8px;
    height: 28px !important;
    color: var(--ColorTingeElement);
  }
`;
const IconSearch = styled.div`
  cursor: pointer;
  &.ltr {
    transform: rotateY(180deg);
    padding: 10px 20px 10px 8px;
  }
  &.rtl {
    transform: rotateY(0deg);
    padding: 10px 20px 10px 8px;
  }
  .icon {
    position: relative;
    z-index: -1;
    svg {
      width: 20px;
      height: 20px;
    }
  }
`;
const Clear = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: var(--MainColor);
  border-radius: 50%;
  width: 21px;
  height: 21px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  :hover {
    background-color: var(--HoverMainColor);
  }
  &.ltr {
    right: 20px;
  }
  &.rtl {
    left: 20px;
  }
  .icon_clear {
    color: var(--Theme);
    svg {
      width: 11px;
      height: 11px;
      color: var(--ColorElement);
    }
  }
`;
const Drop = styled.div`
  padding-top: 3px;
  padding-bottom: 3px;
  position: absolute;
  overflow: hidden;
  top: 50px;
  width: calc(100% - 28px);
  z-index: 99;
  border-radius: 10px;
  background-color: var(--Theme);
  color: var(--ColorIntenseElement);
  box-shadow: var(--BoxShadow);
  .empty_values {
    padding: 15px 10px;
    text-align: center;
    padding-top: 15px;
    font-family: var(--MainFontFamliy);
    font-size: var(--MediumFontSize);
  }
  h3 {
    padding: 15px 10px;
    font-family: var(--MainFontFamliy);
    font-size: var(--MediumFontSize);
    cursor: pointer;
    color: var(--ColorTingeElement);
    background-color: var(--HoverTheme);
  }
`;
const UserContent = styled.div`
  display: flex;
  align-items: center;
  overflow: hidden;
  padding: 12px 10px;
  cursor: pointer;
  color: var(--ColorTingeElement);
  :hover,
  &.active {
    background-color: var(--HoverTheme);
  }
  :focus-visible {
    outline-color: var(--MainColor);
  }
`;
const UserImg = styled.div`
  width: 35px;
  height: 35px;
  min-width: 35px;
  min-height: 35px;
  border-radius: 50%;
  overflow: hidden;
  &.ltr {
    margin-right: 11px;
  }
  &.rtl {
    margin-left: 11px;
  }
  img {
    width: 100%;
    height: 100%;
    transform: scale(1.1);
  }
`;
const UserName = styled.h2`
  font-style: normal;
  font-family: var(--SecondFontFamliy);
  font-size: var(--MediumFontSize);
  font-weight: var(--LargeFontWeight);
  line-height: var(--SmallLineHeight);
`;
const Verified = styled.div`
  position: relative;
  width: 15px;
  height: 15px;
  background-color: var(--MainColor);
  border-radius: 50%;
  margin-top: 4px;
  &.ltr {
    margin-left: 5px;
  }
  &.rtl {
    margin-right: 5px;
  }
  svg {
    position: absolute;
    width: 10px;
    height: 10px;
    fill: #fff;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`;
const UserDetails = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  div:first-of-type {
    display: flex;
    align-items: center;
  }
`;
export {
  Container,
  IconSearch,
  SearchContent,
  Clear,
  Drop,
  UserContent,
  UserImg,
  UserName,
  Verified,
  UserDetails,
};
