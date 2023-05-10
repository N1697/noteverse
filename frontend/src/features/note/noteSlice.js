import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//Get Notes
export const getNotes = createAsyncThunk(
  "note/getNotes",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.user.token; //reducerNameInStore.stateNameInSlice.token

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get("/api/notes", config);
      //data = 'notes' received from backend

      return data; //This data will then be assigned to 'action.payload'
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

//Create Note
export const createNote = createAsyncThunk(
  "note/create",
  async (noteData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.user.token; //reducerNameInStore.stateNameInSlice.token

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.post("/api/notes", noteData, config);
      //data = 'note' received from backend

      return data;
    } catch (error) {
      const message =
        (error.response && error.response.data & error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Update Note
export const updateNote = createAsyncThunk(
  "note/update",
  async (noteData, thunkAPI) => {
    try {
      const { _id, title, category, content } = noteData;

      const token = thunkAPI.getState().user.user.token; //reducerNameInStore.stateNameInSlice.token

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.put(
        `/api/notes/${_id}`,
        { title, category, content },
        config
      );
      //data = 'updatedNote' received from backend

      return data;
    } catch (error) {
      const message =
        (error.response && error.response.data & error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Delete Note
export const deleteNote = createAsyncThunk(
  "note/delete",
  async (noteID, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.user.token; //reducerNameInStore.stateNameInSlice.token

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.delete(`/api/notes/${noteID}`, config);
      //data = '_id' received from backend

      return data; //This data will then be assigned to 'action.payload'
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
  notes: [],
  loading: false,
  error: false,
  success: false,
  message: "",
};

const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNotes.pending, (state) => {
        state.loading = true;
      })
      .addCase(getNotes.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.notes = action.payload;
      })
      .addCase(getNotes.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      })

      .addCase(createNote.pending, (state) => {
        state.loading = true;
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.notes.push(action.payload);
      })
      .addCase(createNote.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      })

      .addCase(updateNote.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateNote.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        const updatedNote = action.payload;
        const noteIndex = state.notes.findIndex(
          (note) => note._id === updatedNote._id
        );
        if (noteIndex !== -1) {
          state.notes[noteIndex] = updatedNote;
        }
      })

      .addCase(updateNote.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      })

      .addCase(deleteNote.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.notes = state.notes.filter(
          (note) => note._id !== action.payload._id
        );
      })
      .addCase(deleteNote.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = noteSlice.actions;

export default noteSlice.reducer;
