import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface DateState {
    currentDate: string;
}

const initialState: DateState = {
    currentDate: new Date().toISOString(),
}

const dateSlice = createSlice({
    name: 'date',
    initialState,
    reducers: {
      setCurrentDate: (state, action: PayloadAction<string>) => {
        state.currentDate = action.payload;
      },
      goToPreviousMonth: (state) => {
        const newDate = new Date(state.currentDate);
        newDate.setMonth(newDate.getMonth() - 1);
        state.currentDate = newDate.toISOString();
      },
      goToNextMonth: (state) => {
        const newDate = new Date(state.currentDate);
        newDate.setMonth(newDate.getMonth() + 1);
        state.currentDate = newDate.toISOString();
      },
      goToPreviousWeek: (state) => {
        const newDate = new Date(state.currentDate);
        newDate.setDate(newDate.getDate() - 7);
        state.currentDate = newDate.toISOString();
      },
      goToNextWeek: (state) => {
        const newDate = new Date(state.currentDate);
        newDate.setDate(newDate.getDate() + 7);
        state.currentDate = newDate.toISOString();
      },
      goToToday: (state) => {
        state.currentDate = new Date().toISOString();
      },
    },
  });

  export const {
    setCurrentDate,
    goToPreviousMonth,
    goToNextMonth,
    goToPreviousWeek,
    goToNextWeek,
    goToToday,
  } = dateSlice.actions;

  export default dateSlice.reducer;