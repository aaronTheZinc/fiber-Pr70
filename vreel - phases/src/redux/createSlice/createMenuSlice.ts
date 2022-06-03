import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  initMenuState: false,
  initQRState: false,
  initialAccountMenuState: false,
  mobilePreviewInitialState: false,
  showPreviewInitialState: {
    type: '',
    payload: '',
  },
  collupse: { level1: [], level2: [], level3: [] },
};

export const menuSlice = createSlice({
  name: 'expandMenu',
  initialState,

  reducers: {
    expandMenu: (state) => {
      state.initMenuState = !state.initMenuState;
    },
    expandQR: (state) => {
      state.initQRState = !state.initQRState;
      console.log(state.initQRState);
    },
    expandAccountMenu: (state) => {
      state.initialAccountMenuState = !state.initialAccountMenuState;
    },
    showMobilePreview: (state, actions) => {
      state.mobilePreviewInitialState = actions.payload;
    },
    showPreviewActions: (state, actions) => {
      state.showPreviewInitialState = actions.payload;
    },

    addCollupse: (state, actions) => {
      const { level, height } = actions.payload;
      if (level == 2) {
        state.collupse.level1.push(actions.payload);
        console.log(state.collupse.level1);
      }
      if (level == 3) {
        state.collupse.level2.push(actions.payload);
        console.log(state.collupse.level2);
      }
    },
    removeCollupse: (state, actions) => {
      const { level, height, title } = actions.payload;
      if (level == 2) {
        state.collupse.level1.map((e) => e.title).indexOf(title);
        state.collupse.level1.splice(0, 1);
        console.log(state.collupse.level1);
      }
      if (level == 3) {
        state.collupse.level2.map((e) => e.title).indexOf(title);
        state.collupse.level2.splice(0, 1);
        console.log(state.collupse.level2);
      }
    },
  },
});

// ewjrwehyjrhewjxcv cfvc
export const {
  expandMenu,
  expandQR,
  expandAccountMenu,
  showMobilePreview,
  showPreviewActions,
  addCollupse,
  removeCollupse,
} = menuSlice.actions;
export default menuSlice.reducer;
