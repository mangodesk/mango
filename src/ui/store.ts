import { configureStore, createAction, createAsyncThunk, createReducer } from '@reduxjs/toolkit'
import isEmpty from 'lodash/isEmpty';
import { useDispatch, useSelector } from 'react-redux';

type Messager = {
  handle: (name: string, handlerFn: (message: any) => Promise<any>) => void,
  invoke: (name: string, payload?: any) => Promise<any>,
};

type AppState = {
  isInitializing: boolean;
  bridgeAPI?: {
    messager: Messager;
  },
};

const appState: AppState = {
  isInitializing: false,
  bridgeAPI: undefined,
};

export const setIsInitializing = createAction<boolean, 'SET_IS_INITIALIZING'>('SET_IS_INITIALIZING');
const registerBridgeAPI = createAction<{ messager: Messager }, 'REGISTER_BRIDGE_API'>('REGISTER_BRIDGE_API');

const appReducer = createReducer(appState, (builder) =>
  builder
    .addCase(registerBridgeAPI, (state, { payload }) => {
      state.bridgeAPI = payload;
    })
    .addCase(setIsInitializing, (state, { payload }) => {
      state.isInitializing = payload;
    })
  )

const store = configureStore({
  reducer: {
    app: appReducer,
  },
})

export const actions = {
  initializeApp: createAsyncThunk<void, void, { state: AppState }>('app/initialize', async (_arg, { dispatch, getState }) => {
    const state = getState();
  
    if (!isEmpty(state.bridgeAPI)) {
      throw new Error('App already initialized!');
    }

    dispatch(setIsInitializing(true));
  
    const bridgeAPI = await window.bridge.initialize();
  
    dispatch(registerBridgeAPI(bridgeAPI));

    setTimeout(() => {
      dispatch(setIsInitializing(false));
    }, 9000);
  }),
};

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();

export type RootState = ReturnType<typeof store.getState>

export default store