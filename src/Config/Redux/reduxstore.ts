import { configureStore } from '@reduxjs/toolkit'
import modalReducer from "./Modal/ModalSlice"
export const store = configureStore({
  reducer: {
    modal: modalReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch