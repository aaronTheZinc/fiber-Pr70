import { createReducer } from '@reduxjs/toolkit';
import { AccMenuAction, mobileShowPreview, NavMenuAction, showPreview } from '../actions/actions';
import { accInitialState, initialState, mobileShowPreviewInitialState, showPreviewInitialState } from '../initialState/intialState';

export const expandNavReducers = createReducer(initialState, (builder) => {
  builder.addCase(NavMenuAction, (state) => {
    state.navMenu = !state.navMenu;
  });
});


export const expandAccReducers = createReducer(accInitialState, (builder) => {
  builder.addCase(AccMenuAction, (state) => {
    state.accMenu = !state.accMenu;
  });
});

export const mobileShowPrevReducers = createReducer(mobileShowPreviewInitialState, (builder) => {
  builder.addCase(mobileShowPreview, (state) => {
    state.mobilePreview = !state.mobilePreview;
  });
});

export const showPreviewReducers = createReducer(showPreviewInitialState, (builder) => {
  builder.addCase(showPreview, (state,actions) => {
    
    state.previewItems = actions.payload;

  });
});
