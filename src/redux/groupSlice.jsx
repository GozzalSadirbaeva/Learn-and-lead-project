import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchGroups = createAsyncThunk("groups/fetchGroups", async () => {
  try {
    const response = await axios.get(
      "https://nt-shopping-list.onrender.com/api/groups",
      {
        headers: {
          "x-auth-token": `${localStorage.getItem("AccesToken")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching groups:", error);
    throw error;
  }
});

const groupSlice = createSlice({
  name: "groups",
  initialState: {
    groups: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    setGroups: (state, action) => {
      state.groups = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGroups.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchGroups.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.groups = action.payload;
      })
      .addCase(fetchGroups.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setGroups } = groupSlice.actions;
export default groupSlice.reducer;
