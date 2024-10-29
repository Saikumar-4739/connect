import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Define a type for the authentication state
export interface AuthState {
  user: string | null;
  token: string | null;
  loading: boolean;
  error: string | null | { message: string };
}

// Define initial state using that type
const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

// Define a payload type for login response
interface LoginResponse {
  access_token: string;
}

// Define a payload type for login credentials
interface LoginCredentials {
  email: string;
  password: string;
}

// Async thunk action for login
export const loginUser = createAsyncThunk<LoginResponse, LoginCredentials>(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post<LoginResponse>('http://localhost:3000/api/auth/login', credentials);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Login failed');
    }
  }
);

// Async thunk action for logout
export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:3000/api/auth/logout', { token });
      localStorage.removeItem('token');
      return { success: true };
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Logout failed');
    }
  }
);

// Create the slice with a reducer and actions
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
        state.loading = false;
        state.token = action.payload.access_token;
        state.user = 'User';
        localStorage.setItem('token', action.payload.access_token); // Store the token
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.token = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Export actions and reducer
export const { logout } = authSlice.actions;
export default authSlice.reducer;
