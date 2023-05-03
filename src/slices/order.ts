import {createSlice} from '@reduxjs/toolkit';


const initialState = {
  order: [], // 서버로부터 받은 주문 목록
  deliveries: [], // 수락한 주문 목록
};

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        addOrder(state, action) {
            state.order.push(action.payload)
        },
        acceptOrder(state, action) {
            
        },
        rejectOrder(state, action) {}
    } 
});

export default orderSlice;