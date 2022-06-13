import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mediaMobileSelectorInitState:false,
    mediaDesktopPreview:false,
    mediaSelectorInitState : [{
        id:1,
        type:'images',
        link:'/assets/images/regLogBg.png'
    },{
        id:2,
        type:'images',
        link:'/assets/images/regLogBg.png'
    },{
        id:3,
        type:'images',
        link:'/assets/images/regLogBg.png'
    },{
        id:4,
        type:'images',
        link:'/assets/images/regLogBg.png'
    },{
        id:5,
        type:'images',
        link:'/assets/images/regLogBg.png'
    },{
        id:6,
        type:'images',
        link:'/assets/images/regLogBg.png'
    },{
        id:7,
        type:'images',
        link:'/assets/images/regLogBg.png'
    },{
        id:8,
        type:'images',
        link:'/assets/images/regLogBg.png'
    },{
        id:9,
        type:'images',
        link:'/assets/images/female.png'
    },{
        id:10,
        type:'images',
        link:'/assets/images/regLogBg.png'
    },{
        id:11,
        type:'images',
        link:'/assets/images/regLogBg.png'
    }],

    advancedLogoSelector:[
        {
        id:1,
        type:'icons',
        link:'/assets/images/female.png'
    },{
        id:2,
        type:'icons',
        link:'/assets/images/female.png'
    },{
        id:3,
        type:'icons',
        link:'/assets/images/regLogBg.png'
    },{
        id:4,
        type:'icons',
        link:'/assets/images/female.png'
    },
    ],
    advancedLogoShow:false,
    getMediaMobileLink:{
        id:0,
        type:'',
        link:''
    },
    getMediaDesktopLink:[],
    getMediaIconsLink:{
        id:0,
        type:'',
        link:''
    },

    isDesktopInit:false
}
export const mobileMediaSelector = createSlice({
    name:"mobileMediaSelector",
    initialState,
    reducers:{
        getMediaSelector:(state,actions)=>{
            
            if(actions.payload.type==='icons'){
                const findMedia = state.advancedLogoSelector.find((item)=>item.id === actions.payload.id);
                state.getMediaIconsLink=findMedia;
                
            }else{
                const findMedia = state.mediaSelectorInitState.find((item)=>item.id === actions.payload.id);
                state.getMediaMobileLink=findMedia;
            }
        },
        removeMediaPreview:(state)=>{
            state.getMediaMobileLink={ id:0,type:'',link:''}
        },
         removeDesktopMediaPreview:(state)=>{
            state.getMediaDesktopLink
        },

        getMediaDesktopSelector:(state,actions)=>{
            const findMedia = state.mediaSelectorInitState.find((item)=>item.id === actions.payload.id);
            state.getMediaDesktopLink.push(findMedia);
        },

        isDesktopShow:(state,actions)=>{
            state.isDesktopInit = actions.payload;
        },

        showMediaMobileSelector:(state)=>{
          state.mediaMobileSelectorInitState = !state.mediaMobileSelectorInitState;
        },
        showMediaDesktopPreview:(state)=>{
            state.mediaDesktopPreview = !state.mediaDesktopPreview;
        },

        showAdvancedLogo:(state,actions)=>{
            state.advancedLogoShow = actions.payload;
        }
    }

})


export const {getMediaSelector,showMediaMobileSelector,showMediaDesktopPreview,showAdvancedLogo,
    removeMediaPreview,getMediaDesktopSelector,isDesktopShow,removeDesktopMediaPreview} = mobileMediaSelector.actions;
export default mobileMediaSelector.reducer;