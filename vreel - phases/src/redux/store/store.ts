import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import createHeightSlice from '../createSlice/createHeightSlice';
import createMenuSlice from '../createSlice/createMenuSlice';
import createMobileMediaSelector from '../createSlice/createMobileMediaSelector';
import HeroBannerSlice from '../createSlice/HeroBannerSlice';

export const store = configureStore({
    reducer:{
        expandMenu:createMenuSlice,
        mobileMediaSelector:createMobileMediaSelector,
        nestedHeight: createHeightSlice,
        heroBannerSlice:HeroBannerSlice
}})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>() 

