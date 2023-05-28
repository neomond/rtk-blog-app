import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

export const getAllItemsBlog = createAsyncThunk(
  'blogs/getAll',
  async (_, {rejectWithValue}) => {
    try {
      const response = await axios.get(
        'https://64731455d784bccb4a3c3e14.mockapi.io/blogs/',
      );
      return response.data;
    } catch (error) {
      return rejectWithValue('Error');
    }
  },
);

export const deleteItemBlog = createAsyncThunk(
  'blogs/delete',
  async (id: number, {rejectWithValue}) => {
    try {
      await axios.delete(
        `https://64731455d784bccb4a3c3e14.mockapi.io/blogs/${id}`,
      );
      return id;
    } catch (error) {
      return rejectWithValue('Error');
    }
  },
);

interface BlogState {
  data: any[];
  total: number;
  loading: boolean;
  error: null;
}

const initialState: BlogState = {
  data: [],
  total: 0,
  loading: true,
  error: null,
};

export const blogSlice = createSlice({
  name: 'blogSlice',
  initialState: initialState,
  reducers: {
    setTotalCustomers: (state, action) => {
      state.total = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(getAllItemsBlog.pending, (state, _) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(getAllItemsBlog.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });

    builder.addCase(getAllItemsBlog.rejected, (state, action: any) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(deleteItemBlog.pending, (state, _) => {
      state.loading = true;
    });

    builder.addCase(deleteItemBlog.fulfilled, (state, action) => {
      state.data = state.data.filter(
        customer => customer.id !== action.payload,
      );
      state.total -= 1;
      state.loading = false;
    });

    builder.addCase(deleteItemBlog.rejected, (state, action: any) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const {setTotalCustomers} = blogSlice.actions;

export default blogSlice.reducer;
