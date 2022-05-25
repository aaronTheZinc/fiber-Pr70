import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { expandAccReducers, expandNavReducers, mobileShowPrevReducers, showPreviewReducers, } from '../reducers/reducer';

export const store = configureStore({
    reducer:{
        expandNav: expandNavReducers,
        expandAccMenu:expandAccReducers,
        showPreview:showPreviewReducers,
        mobilePreviewShow:mobileShowPrevReducers,
}})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>() 
