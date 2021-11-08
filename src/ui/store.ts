import { configureStore, createAction, createReducer } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux';

type AppState = {
  isInitializing: boolean;
};

const appState: AppState = {
  isInitializing: false,
};


type Database = {
  name: string;
};

type Collection = {
  name: string;
  database: string;
};

type DbState = {
  databases: Database[];
  collections: Collection[];
};

const dbState: DbState = {
  databases: [],
  collections: [],
};

export const setIsInitializing = createAction<boolean, 'SET_IS_INITIALIZING'>('SET_IS_INITIALIZING');

const appReducer = createReducer(appState, (builder) =>
  builder
    .addCase(setIsInitializing, (state, { payload }) => {
      state.isInitializing = payload;
    })
  )

export const setDatabases = createAction<Database[], 'SET_DATABASES'>('SET_DATABASES');
export const setCollections = createAction<Collection[], 'SET_COLLECTIONS'>('SET_COLLECTIONS');

const dbReducer = createReducer(dbState, (builder) =>
  builder
    .addCase(setDatabases, (state, { payload }) => {
      state.databases = payload;
    })
    .addCase(setCollections, (state, { payload }) => {
      state.collections = payload;
    })
  )

const store = configureStore({
  reducer: {
    app: appReducer,
    db: dbReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();

export type RootState = ReturnType<typeof store.getState>

export default store