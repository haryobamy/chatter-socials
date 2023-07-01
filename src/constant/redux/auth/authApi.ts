import { createAsyncThunk } from "@reduxjs/toolkit";
import { ILogin, ISignUp } from "../../validation/types";
import { httpRequest } from "../../https/httpsRequest";
import { BASE_URL } from "../../https/config";

export const login = createAsyncThunk(
  "users/login",
  async (loginData: ILogin, { fulfillWithValue, rejectWithValue }) => {
    try {
      const result = await httpRequest({
        BASE_URL: BASE_URL,
        url: "auth/login",
        method: "POST",
        body: loginData,
        needToken: false,
      });
      console.log(result, "result");
      if (result.status === "error") {
        return rejectWithValue(result.message);
      }
      return fulfillWithValue(result);
    } catch (e) {
      console.log(e);
    }
  }
);
export const register = createAsyncThunk(
  "users/register",
  async (registerData: ISignUp, { fulfillWithValue, rejectWithValue }) => {
    try {
      const result = await httpRequest({
        BASE_URL: BASE_URL,
        url: "auth/register",
        method: "POST",
        body: registerData,
        needToken: false,
      });
      console.log(result, "result");
      if (result.status === "error") {
        return rejectWithValue(result.message);
      }
      return fulfillWithValue(result);
    } catch (e) {
      console.log(e);
    }
  }
);

type Iverify = {
  userId: string;
  token: string;
};

export const VerifyingUser = createAsyncThunk(
  "users/verify-user",
  async (data: Iverify, { fulfillWithValue, rejectWithValue }) => {
    try {
      const result = await httpRequest({
        BASE_URL: BASE_URL,
        url: `auth/verify/${data?.userId}/${data?.token}`,
        method: "GET",
        needToken: false,
      });
      console.log(result, "result");
      if (result.status === "error") {
        return rejectWithValue(result.message);
      }
      return fulfillWithValue(result);
    } catch (e) {
      console.log(e);
    }
  }
);

export const fetchUser = createAsyncThunk(
  "users/get-user-details",
  async (id, { fulfillWithValue, rejectWithValue }) => {
    try {
      const result = await httpRequest({
        BASE_URL: BASE_URL,
        url: "auth/whoami",
        method: "GET",
      });

      if (result.status === "error") {
        return rejectWithValue(result.message);
      }
      return fulfillWithValue(result);
    } catch (e) {
      console.log(e);
    }
  }
);
