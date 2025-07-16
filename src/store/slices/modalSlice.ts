import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface TimeSlot {
    timeIndex: number;
    dayIndex: number;
    selectedDate?: string;
    startTime?: string;
    endTime?: string;
  }

interface ModalState {
  isOpen: boolean;
  selectedTimeSlot: TimeSlot | null;
}

const initialState: ModalState = {
  isOpen: false,
  selectedTimeSlot: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<TimeSlot | undefined>) => {
      state.isOpen = true;
      if (action.payload) {
        state.selectedTimeSlot = action.payload;
      } else {
        state.selectedTimeSlot = null;
      }
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.selectedTimeSlot = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;