import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";

interface Event {
  id: number;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  description: string;
}

interface EventsState {
  items: Event[];
  loading: boolean;
  error: string | null;
}

const initialState: EventsState = {
    items: [],
    loading: false,
    error: null,
};

export const fetchEvents = createAsyncThunk(
    'events/fetchEvents',
    async () => {
        const response = await fetch('http://localhost:3001/events');
        return response.json();
    }
);

export const addEvent = createAsyncThunk(
    'events/addEvent',
    async (eventData: Omit<Event, 'id'>) => {
        const response = await fetch('http://localhost:3001/events', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({...eventData, id: Date.now()}),
        });
        return response.json();
    }
)

const eventsSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchEvents.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchEvents.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchEvents.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Error fetching events data"
            })
            .addCase(addEvent.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
    },
});

export default eventsSlice.reducer;