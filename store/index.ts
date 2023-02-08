import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import notesReducer from "./notes-reducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import logger from "redux-logger";
import { persistStore, persistReducer } from "redux-persist";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  debug: true,
};

const middlewares = [logger];
const enhancers = [...middlewares];

const persistedReducer = persistReducer(persistConfig, notesReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: enhancers,
});
export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
