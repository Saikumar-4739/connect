import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { CreateUser, GlobalResponseObject, ValidateUserReq } from '@shared-models/index';
import { AuthenticationService, AuthUserService } from '@shared-services/index';



// Initialize the authentication services
const authService = new AuthenticationService();
const authUserService = new AuthUserService();

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

// Define a payload type for registration response
interface RegisterResponse {
  message: string; // Adjust based on your API response
}

// Async thunk action for login
export const loginUser = createAsyncThunk<LoginResponse, ValidateUserReq>(
  '/api/auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response: GlobalResponseObject = await authService.login(credentials); 
      return { access_token: (response as any).access_token }; // Type assertion
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Login failed');
    }
  }
);

// Async thunk action for registration
export const registerUser = createAsyncThunk<RegisterResponse, CreateUser>(
  'auth/registerUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response: GlobalResponseObject = await authUserService.createUser(credentials);
      return { message: (response as any).message }; // Type assertion
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Registration failed');
    }
  }
);

// Async thunk action for logout
export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');
      await authService.logout(token); 
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
        state.user = 'User'; // You may want to store user info here
        localStorage.setItem('token', action.payload.access_token); // Store the token
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<RegisterResponse>) => {
        state.loading = false;
        state.error = null; // Handle a success message here if needed
      })
      .addCase(registerUser.rejected, (state, action) => {
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
