import { configureStore } from '@reduxjs/toolkit';
import trackingReducer from './trackingSlice';

export const store = configureStore({
  reducer: {
    tracking: trackingReducer,
  },
});

// Subscribe to store changes to persist state
store.subscribe(() => {
  try {
    const serializedState = JSON.stringify(store.getState().tracking.records);
    localStorage.setItem('gymTrackerState', serializedState);
  } catch (err) {
    console.error('Could not save state', err);
  }
});
