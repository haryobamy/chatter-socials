import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../https/config";
import { httpRequest } from "../../https/httpsRequest";
import { IcreateFeeds } from "../../validation/types";

export const getAllFeeds = createAsyncThunk(
  "feeds/get-feeds",
  async (id, { fulfillWithValue, rejectWithValue }) => {
    try {
      const result = await httpRequest({
        BASE_URL: BASE_URL,
        url: "post",
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

export const createFeeds = createAsyncThunk(
  "feeds/create-feed",
  async (data: IcreateFeeds, { fulfillWithValue, rejectWithValue }) => {
    try {
      const result = await httpRequest({
        BASE_URL: BASE_URL,
        url: "post",
        method: "POST",
        body: data,
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

export const likeFeed = createAsyncThunk(
  "feeds/like-feed",
  async (id: string, { fulfillWithValue, rejectWithValue }) => {
    try {
      const result = await httpRequest({
        BASE_URL: BASE_URL,
        url: `post/like/like/${id}`,
        method: "POST",
        // body: data,
      });

      if (result.status === "error") {
        return rejectWithValue(result.message);
      }
      getAllFeeds();
      return fulfillWithValue(result);
    } catch (e) {
      console.log(e);
    }
  }
);

export const unlikeFeed = createAsyncThunk(
  "feeds/unlike-feed",
  async (id: string, { fulfillWithValue, rejectWithValue }) => {
    try {
      const result = await httpRequest({
        BASE_URL: BASE_URL,
        url: `post/like/unlike/${id}`,
        method: "POST",
        // body: data,
      });

      if (result.status === "error") {
        return rejectWithValue(result.message);
      }
      getAllFeeds();
      return fulfillWithValue(result);
    } catch (e) {
      console.log(e);
    }
  }
);

//comment/:postId
export const PostComment = createAsyncThunk(
  "feeds/comment-feed",
  async (data: any, { fulfillWithValue, rejectWithValue }) => {
    console.log(data);
    const comment = { ...data };
    delete comment?.id;
    try {
      const result = await httpRequest({
        BASE_URL: BASE_URL,
        url: `post/comment/${data?.id}`,
        method: "POST",
        body: comment,
      });

      if (result.status === "error") {
        return rejectWithValue(result.message);
      }
      getAllFeeds();
      return fulfillWithValue(result);
    } catch (e) {
      console.log(e);
    }
  }
);
