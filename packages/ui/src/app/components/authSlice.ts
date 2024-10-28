// src/redux/authSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Define a type for the authentication state
export interface AuthState {
    user: string | null;
    token: string | null;
    loading: boolean;
    error: string | null | { message: string }; // Add the union type here
  }
  
  // Rest of your code remains unchanged...
  
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
        state.user = 'User'; // This could be set to a real user object if provided by the backend
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Export the logout action for use in components
export const { logout } = authSlice.actions;

// Export the reducer to be included in the store
export default authSlice.reducer;

