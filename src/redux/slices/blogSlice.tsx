import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

export const getAllItemsBlog = createAsyncThunk(
  'blog/getAll',
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

export const createItemBlog = createAsyncThunk(
  'blog/create',
  async (blogData: any, {rejectWithValue}) => {
    try {
      const response = await axios.post(
        'https://64731455d784bccb4a3c3e14.mockapi.io/blogs/',
        blogData,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue('Error');
    }
  },
);

export const updateItemBlog = createAsyncThunk(
  'blog/update',
  async ({id, blogData}: {id: number; blogData: any}, {rejectWithValue}) => {
    try {
      const response = await axios.put(
        `https://64731455d784bccb4a3c3e14.mockapi.io/blogs/${id}`,
        blogData,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue('Error');
    }
  },
);

export const deleteBlog = createAsyncThunk(
  'blog/delete',
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
export const getById = createAsyncThunk(
  'getById/blogs',
  async (id: number, {rejectWithValue}) => {
    try {
      const response = await axios.get(
        `https://64731455d784bccb4a3c3e14.mockapi.io/blogs/${id}`,
      );
      return response.data;
    } catch (error: any) {
      rejectWithValue(error.message);
    }
  },
);

interface BlogState {
  searchQuery: string;
  data: any[];
  total: number;
  loading: boolean;
  error: null;
  theme: 'dark' | 'light';
}

const initialState: BlogState = {
  data: [],
  total: 0,
  loading: true,
  error: null,
  theme: 'dark',
  searchQuery: '',
};

export const blogSlice = createSlice({
  name: 'blogSlice',
  initialState: initialState,
  reducers: {
    toggleDarkMode: state => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
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

    builder.addCase(updateItemBlog.pending, (state, _) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(updateItemBlog.fulfilled, (state, action) => {
      const index = state.data.findIndex(blog => blog.id === action.payload.id);
      if (index !== -1) {
        state.data[index] = action.payload;
      }
      state.loading = false;
    });

    builder.addCase(updateItemBlog.rejected, (state, action: any) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(deleteBlog.pending, (state, _) => {
      state.loading = true;
    });
    builder.addCase(getById.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getById.fulfilled, (state, action) => {
      state.data = [action.payload];
      state.loading = false;
    });
    builder.addCase(getById.rejected, (state, action: any) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(deleteBlog.fulfilled, (state, action) => {
      state.data = state.data.filter(
        customer => customer.id !== action.payload,
      );
      state.total -= 1;
      state.loading = false;
    });

    builder.addCase(deleteBlog.rejected, (state, action: any) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const {toggleDarkMode, setSearchQuery} = blogSlice.actions;

export default blogSlice.reducer;
