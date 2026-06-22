import { createSlice } from '@reduxjs/toolkit';

// Load initial state from local storage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('gymTrackerState');
    if (serializedState === null) {
      return {};
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error('Could not load state', err);
    return {};
  }
};

const initialState = {
  records: loadState(), // format: { exerciseId: { minWeight: '10', setsDone: '3' } }
};

export const trackingSlice = createSlice({
  name: 'tracking',
  initialState,
  reducers: {
    saveRecord: (state, action) => {
      const { exerciseId, minWeight, setsDone } = action.payload;
      state.records[exerciseId] = { minWeight, setsDone };
    },
  },
});

export const { saveRecord } = trackingSlice.actions;

export default trackingSlice.reducer;
