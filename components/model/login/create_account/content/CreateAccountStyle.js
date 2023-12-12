import styled from "@emotion/styled";
const H3 = styled.h3`
  margin: 15px 0px 2px;
`;
const Tips = styled.p`
  color: rgb(239, 243, 244);
  font-style: normal;
  font-family: var(--MainFontFamliy);
  font-size: var(--SmallFontSize);
  font-weight: var(--SmallFontWeight);
  line-height: var(--MediumLineHeight);
  margin: 10px 0px;
  color: var(--ColorIntenseElement);
`;
const Conditions = styled.div`
  font-style: normal;
  font-family: var(--MainFontFamliy);
  font-size: var(--SmallFontSize);
  font-weight: var(--SmallFontWeight);
  line-height: var(--MediumLineHeight);
  margin-top: 50px;
  color: var(--ColorIntenseElement);
`;
const P = styled.p`
  color: inherit !important;
  padding: 10px 5px;
  width: 90%;
`;
const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    width: 18px;
    height: 18px;
  }
`;
const Verification = styled.input`
  width: 50%;
  height: 50px;
  background-color: transparent;
  margin-top: 15px;
  margin-bottom: 10px;
  outline: none;
  color: var(--ColorElement);
  font-family: var(--MainFontFamliy);
  font-size: var(--LargeFontSize);
  font-weight: var(--LargeFontWeight);
  text-align: center;
  border: 1px solid var(--ColorElement);
  border-radius: 5px;
  transition: border var(--MainTransition);
  :focus {
    border: 1px solid var(--MainColor);
  }
`;
const BoxImg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    max-width: 200px;
  }
`;
export { H3, Tips, Conditions, P, Box, Verification, BoxImg };
