import {combineReducers} from '@reduxjs/toolkit';
import orderSlice from '../slices/order';
import userSlice from '../slices/user';

const rootReducer = combineReducers({
  user: userSlice.reducer,
  orders: orderSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
