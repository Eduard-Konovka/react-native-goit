import { createSlice } from '@reduxjs/toolkit';

const state = {
  userId: null,
  nickName: null,
  stateChange: false,
};

const actions = {
  updateUserProfile: (state, { payload }) => ({
    ...state,
    userId: payload.userId,
    name: payload.name,
  }),

  authStateChange: (state, { payload }) => ({
    ...state,
    stateChange: payload.stateChange,
  }),

  authSignOut: () => state,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: state,
  reducers: actions,
});
