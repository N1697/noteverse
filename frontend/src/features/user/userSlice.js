import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//Get user from localStorage
const user = JSON.parse(localStorage.getItem("user"));

//Register
export const registerUser = createAsyncThunk(
  "user/register",
  async (userData, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await axios.post("/api/users", userData, config);

      if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Login
export const loginUser = createAsyncThunk(
  "user/login",
  async (userData, thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await axios.post("/api/users/login", userData, config);

      if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Logout
export const logoutUser = createAsyncThunk("user/logout", async () => {
  localStorage.removeItem("user");
});

//Set Profile
export const setProfile = createAsyncThunk(
  "user/setProfile",
  async (userData, thunkAPI) => {
    try {
      //userData = name, email, password, avatar

      const token = thunkAPI.getState().user.user.token;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.post("/api/users/profile", userData, config);
      //data = 'updatedUser'
      if (data) {
        localStorage.setItem("user", JSON.stringify(data));
      }

      return data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

const initialState = {
  user: user ? user : null,
  loading: false,
  error: false,
  success: false,
  message: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false;
      state.error = false;
      state.success = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.success = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.user = null;
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      })

      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.success = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.user = null;
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      })

      .addCase(logoutUser.fulfilled, (state, action) => {
        state.user = null;
      })

      .addCase(setProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(setProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.success = true;
      })
      .addCase(setProfile.rejected, (state, action) => {
        state.user = null;
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = userSlice.actions;

export default userSlice.reducer;
