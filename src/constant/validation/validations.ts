import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { IcreateFeeds, ILogin, ISignUp } from "./types";

export const loginDefaultValues: ILogin = {
  email: "",
  password: "",
};

const loginSchema = yup.object({
  email: yup.string().email().required("Email is required"),
  password: yup.string().min(4).max(15).required("Password is required"),
});

export const loginResolver = yupResolver(loginSchema);

export const registerDefaultValues: ISignUp = {
  firstName: "Badmus",
  lastName: "ayobami",
  username: "badbaby",
  email: "haryobamy.badmus@gmail.com",
  password: "olawole27",
  confirmPassword: "",
  role: "writer",
};

const registerSchema = yup.object({
  email: yup.string().email().required("Email is required"),
  password: yup.string().min(4).max(15).required("Password is required"),
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "password must match")
    .required("Please Confirm Your Password"),
});

export const registerResolver = yupResolver(registerSchema);

export const feedDefaultValues: IcreateFeeds = {
  content: "",
  image: "",
  title: "",
};

const feedsSchema = yup.object({
  content: yup.string().required("Content is required"),
  title: yup.string().required("Title is required"),
});

export const feedsResolver = yupResolver(feedsSchema);
