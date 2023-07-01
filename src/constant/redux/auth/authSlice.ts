import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchUser, login, register } from "./authApi";

type IauthState = {
  [x: string]: string | boolean | any;
  loading: boolean;
  isLoggedIn: boolean;
  user: any;
  token: string;
  error: string;
};

const initialState: IauthState = {
  loading: false,
  isLoggedIn: false,
  user: {},
  token: "",
  error: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsLogin(state: IauthState, { payload }: PayloadAction<boolean>) {
      state.isLoggedIn = payload;
    },
    editAuthState(
      state: IauthState,
      { payload }: PayloadAction<{ name: string; value: string }>
    ) {
      state[payload.name] = payload.value;
    },
  },
  extraReducers: (builder) => {
    // login function
    builder.addCase(login.pending, (state: IauthState) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state: IauthState, { payload }: any) => {
      state.loading = false;
      state.user = payload.data;
      // state.token = payload.token;
    });
    builder.addCase(login.rejected, (state: IauthState, { payload }: any) => {
      console.log(payload, "from rejected");

      state.loading = false;
      state.error = payload;
    });
    builder.addCase(register.pending, (state: IauthState) => {
      state.loading = true;
    });
    builder.addCase(
      register.fulfilled,
      (state: IauthState, { payload }: any) => {
        state.loading = false;
        // state.user = payload.user;
        // state.token = payload.token;
        console.log(payload);
      }
    );
    builder.addCase(
      register.rejected,
      (state: IauthState, { payload }: any) => {
        console.log(payload, "from rejected");

        state.loading = false;
        state.error = payload;
      }
    );
    builder.addCase(
      fetchUser.fulfilled,
      (state: IauthState, { payload }: any) => {
        state.loading = false;
        state.user = payload;
      }
    );
  },
});

export const { setIsLogin, editAuthState } = authSlice.actions;
export default authSlice.reducer;
