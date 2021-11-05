import { configureStore, createAction, createReducer } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux';

type AppState = {
  isInitializing: boolean;
};

const appState: AppState = {
  isInitializing: false,
};

export const setIsInitializing = createAction<boolean, 'SET_IS_INITIALIZING'>('SET_IS_INITIALIZING');

const appReducer = createReducer(appState, (builder) =>
  builder
    .addCase(setIsInitializing, (state, { payload }) => {
      state.isInitializing = payload;
    })
  )

const store = configureStore({
  reducer: {
    app: appReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();

export type RootState = ReturnType<typeof store.getState>

export default store