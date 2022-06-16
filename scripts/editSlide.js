
const { request, gql, GraphQLClient } = require('graphql-request');
const endpoint = 'https://staging.vreel.page/graphql'
const slide = {
    slide_location: 0,
    title: {
        header: "Dow",
        description: "Julie Zaniewski, Sustainability Director, Interviewed by GreenBiz",
    },
    cta1: {
        link_header: "THE AGREEMENT",
        link_type: "url",
        link_url: "www.yahoo.com/now/dow-dow-inks-pcr-supply-142302154.html?guccounter=1&guce_referrer=aHR0cHM6Ly93d3cuZ29vZ2xlLmNvbS8&guce_referrer_sig=AQAAAIb32w65np9VTxVMs6lF2gvqmmSpETMaqo4lSbQNptkDxIqRxldcUfkiYeECLLCNXCjibVJGyZRmOY1UGUqOBFaPs12kEcKpFRr_e8R53wBsLSbqIKIHpTQyvHzErDa43sXlWD-ih9TQiFN5o6U0M5xFHWX6I6bv6nM38KbCcNld",
    },
    // cta2: {
    //     link_header: "",
    //     link_type: "",
    //     link_url: "",
    // },
    advanced: {
        info: "",
        link_type: "",
        link_url: "",
    },
    mobile: {
        background_audio_uri: "",
        content_type: "video/mp4",
        uri: "https://firebasestorage.googleapis.com/v0/b/clips-e8ad8.appspot.com/o/BBC_HICONE_FULL.mp4?alt=media&token=57595162-a52f-4939-b0cb-aedb32165054",
    },
    desktop: {
        background_audio_uri: "",
        content_type: "video/mp4",
        uri: "https://firebasestorage.googleapis.com/v0/b/clips-e8ad8.appspot.com/o/BBC_HICONE_FULL.mp4?alt=media&token=57595162-a52f-4939-b0cb-aedb32165054",
    }
}
const client = new GraphQLClient(endpoint, {
    headers: {
        authorization: 'Bearer MY_TOKEN',
    },
})

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNhZmIwb3EyM2FrajlnNHFrMTlnIiwiYWNjb3VudF90eXBlIjoiZW50ZXJwcmlzZSIsImV4cCI6MTY1NTY5MzkzMX0.lpY_VPOkl3Y4BjLzLVEZuEqOVb8pguZm6DykkTHDKRQ"
const slideId = "cajagfa23aktcaat7b30"
const data = JSON.stringify(slide)

const MUTATATION = gql`
mutation EditSlide($token: String!, $slideId: String!, $data:String!) {
    updateSlide(slideId: $slideId, token: $token, data: $data,  ) {
      id
      title {
        header
      }
    }
  }
  `

async function T() {
    const _data = await client.request(MUTATATION, { token, slideId, data });
    console.log(_data)

}

T()



