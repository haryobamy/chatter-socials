import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { createFeeds, getAllFeeds } from "./feedApi";

type IFeedState = {
  [x: string]: string | boolean | any;
  loading: boolean;
  feeds: any;
};

const initialState: IFeedState = {
  loading: false,
  feeds: [],
};

const feedsSlice = createSlice({
  name: "feeds",
  initialState,
  reducers: {
    editAuthState(
      state: IFeedState,
      { payload }: PayloadAction<{ name: string; value: string }>
    ) {
      state[payload.name] = payload.value;
    },
  },
  extraReducers: (builder) => {
    // feeds function
    builder.addCase(getAllFeeds.pending, (state: IFeedState) => {
      state.loading = true;
    });
    builder.addCase(
      getAllFeeds.fulfilled,
      (state: IFeedState, { payload }: any) => {
        state.loading = false;
        state.feeds = payload;
      }
    );
    builder.addCase(
      getAllFeeds.rejected,
      (state: IFeedState, { payload }: any) => {
        state.loading = false;
      }
    );

    // create feeds

    builder.addCase(createFeeds.pending, (state: IFeedState) => {
      state.loading = true;
    });
    builder.addCase(
      createFeeds.fulfilled,
      (state: IFeedState, { payload }: any) => {
        state.loading = false;
      }
    );
    builder.addCase(
      createFeeds.rejected,
      (state: IFeedState, { payload }: any) => {
        state.loading = false;
      }
    );
  },
});

// export const {} = feedsSlice.actions;
export default feedsSlice.reducer;
