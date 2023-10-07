import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { appStateSlice } from './app-state.slice';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';

const reducers = combineReducers({
  appState: appStateSlice.reducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['appState'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
