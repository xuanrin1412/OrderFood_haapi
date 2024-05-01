import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormState {
  focusedInput: string;
  showPassword: boolean;
}

const initialState: FormState = {
  focusedInput: "",
  showPassword: false,
};

const formAuthSlice = createSlice({
  name: 'forms',
  initialState,
  reducers: {
    setFocus: (state, action: PayloadAction<string>) => {
      state.focusedInput = action.payload
    },
    setBlur: (state) => {
      state.focusedInput = ""
    },
    togglePassword: (state)=>{
        const elementPassword = document.getElementsByClassName("password");
        if ((elementPassword.length > 0 && (elementPassword[0] as HTMLInputElement).type === "password")) {
            (elementPassword[0] as HTMLInputElement).type = "text"
            state.showPassword = true
        } else {
            (elementPassword[0] as HTMLInputElement).type = "password"
            state.showPassword = false
        }
    }
  },
});

export const { setFocus , setBlur ,togglePassword} = formAuthSlice.actions;
export default formAuthSlice.reducer;
