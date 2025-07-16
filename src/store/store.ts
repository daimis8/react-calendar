import { configureStore } from "@reduxjs/toolkit";
import dateReducer from './slices/dateSlice';
import eventsReducer from './slices/eventsSlice'
import modalReducer from './slices/modalSlice'


export const store = configureStore({
    reducer: {
        date: dateReducer,
        events: eventsReducer,
        modal: modalReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;