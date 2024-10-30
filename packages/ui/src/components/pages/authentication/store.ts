// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer, { AuthState } from './authSlice'; // Import AuthState here

// Configure the Redux store
export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // You can enable this if you are sure about your state being serializable
    }),
});

// Type definitions for the store's state and dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Explicitly define the store's type
export type StoreType = {
  auth: AuthState; // Ensure the type is recognized
};

