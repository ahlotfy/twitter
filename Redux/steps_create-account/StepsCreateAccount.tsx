import { createSlice } from "@reduxjs/toolkit";
interface state {
  step: number;
  stepOneIsValid: boolean;
  stepTwoIsValid: boolean;
  stepThreeIsValid: boolean;
  stepFourIsValid: boolean;
  focusElement: string;
  inputValues: any;
}
let initialState: state = {
  step: 1,
  stepOneIsValid: false,
  stepTwoIsValid: false,
  stepThreeIsValid: true,
  stepFourIsValid: false,
  focusElement: "",
  inputValues: {
    name: "",
    birthDay: "",
    password: "",
  },
};
const StepsCreateAccountReducer = createSlice({
  name: "step",
  initialState,
  reducers: {
    changeStep: (state, action) => {
      state.step = action.payload;
    },
    validStepOne: (state, action) => {
      if (action.payload) {
        state.stepOneIsValid = true;
      } else {
        state.stepOneIsValid = false;
      }
    },
    validStepTwo: (state, action) => {
      if (action.payload) {
        state.stepTwoIsValid = true;
      } else {
        state.stepTwoIsValid = false;
      }
    },
    validStepThree: (state, action) => {
      if (action.payload) {
        state.stepThreeIsValid = true;
      } else {
        state.stepThreeIsValid = false;
      }
    },
    validStepFour: (state, action) => {
      if (action.payload) {
        state.stepFourIsValid = true;
      } else {
        state.stepFourIsValid = false;
      }
    },
    stepBack: (state, action) => {
      state.step = state.step - action.payload;
    },
    focusElement: (state, action) => {
      state.step = action.payload[0];
      state.focusElement = action.payload[1];
    },
    getValue: (state, action) => {
      state.inputValues = action.payload;
      const regexPatternName =
        /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;
      const regexPatternEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      if (
        state.inputValues?.name !== "" &&
        state.inputValues?.email !== "" &&
        state.inputValues?.birthDay !== "" &&
        regexPatternName.test(state.inputValues?.name) &&
        regexPatternEmail.test(state.inputValues?.email)
      ) {
        state.stepOneIsValid = true;
      } else {
        state.stepOneIsValid = false;
      }
    },
  },
});
export default StepsCreateAccountReducer.reducer;
export const {
  changeStep,
  validStepOne,
  validStepTwo,
  validStepThree,
  validStepFour,
  stepBack,
  focusElement,
  getValue,
} = StepsCreateAccountReducer.actions;
