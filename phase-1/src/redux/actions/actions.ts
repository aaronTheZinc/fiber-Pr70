import { createAction } from '@reduxjs/toolkit';

export const NavMenuAction = createAction<boolean>('expandMenu');
export const AccMenuAction = createAction<boolean>('expandAccMenu');
export const showPreview = createAction<any>('showPreview');
export const mobileShowPreview = createAction<boolean>('mobilePreviewShow');
