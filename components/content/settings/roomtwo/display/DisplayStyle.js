import styled from "@emotion/styled";
const Container = styled.div`
  h3 {
    font-style: normal;
    font-family: var(--MainFontFamliy);
    font-size: var(--XLargeFontSize);
    font-weight: var(--XLargeFontWeight);
    line-height: var(--LargeLineHeight);
  }
`;
const FontSize = styled.div`
  padding: 15px 11px;
  border-top: 1px solid;
  border-color: var(--MainBorderColor);
  h3 {
    color: var(--ColorElement);
    margin-bottom: 20px;
  }
`;
const SelectFont = styled.div`
  padding-left: 20px;
  padding-right: 20px;
`;
const Color = FontSize;
const SelectColor = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: #fff;
`;
const ColorOpt = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  &.sky {
    background-color: #1d9bf0;
  }
  &.yellow {
    background-color: #ffd400;
  }
  &.pink {
    background-color: #f91880;
  }
  &.purple {
    background-color: #7856ff;
  }
  &.green {
    background-color: #00ba7c;
  }
  svg {
    width: 20px;
    height: 20px;
  }
`;
const Background = FontSize;
const SelectBgd = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
const BgdOpt = styled.label`
  padding: 0 10px;
  cursor: pointer;
  height: 62px;
  margin: 5px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  width: 180px;
  @media (max-width: 768px) {
    width: 100%;
  }
  &.active {
    border: 2px solid var(--MainColor);
  }
  &.light {
    color: #000;
    background-color: #fff;
  }
  &.Dim {
    color: #fff;
    background-color: #15202b;
  }
  &.dark {
    color: #fff;
    background-color: #000;
  }
  div {
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-color: transparent;
    cursor: pointer;
    input {
      display: block;
      width: 15px;
      height: 15px;
      cursor: pointer;
      box-sizing: content-box;
    }
  }
  span {
    display: block;
    width: 70%;
    text-align: center;
    font-family: var(--MainFontFamliy);
    font-size: var(--MediumFontSize);
    font-weight: var(--LargeFontWeight);
    line-height: var(--LargeLineHeight);
    @media (max-width: 768px) {
      width: 100%;
    }
  }
`;
export {
  Container,
  FontSize,
  SelectFont,
  Color,
  Background,
  SelectColor,
  ColorOpt,
  SelectBgd,
  BgdOpt,
};
