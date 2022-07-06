
const { request, gql, GraphQLClient } = require('graphql-request');
const endpoint = 'https://staging.vreel.page/graphql'
const slide = {
    slide_location: 0,
    title: {
        header: "Avangard Innovative",
        description: "Think Circular",
    },
    cta1: {
        link_header: "WATCH FULL VIDEO",
        link_type: "url",
        link_url: "https://www.avaicg.com/",
    },
    // cta2: {
    //     link_header: "",
    //     link_type: "",
    //     link_url: "",
    // },
    advanced: {
        info: {
            title: "",
            descripton: "",
            collaborators: [],
            credits: []
        },
        link_type: "",
        link_url: "",
    },
    mobile: {
        background_audio_uri: "",
        content_type: "video/mp4",
        uri: "https://staging.vreel.page/files/c7a8583752d2c27c0376ccbad08dc886",
    },
    desktop: {
        background_audio_uri: "",
        content_type: "video/mp4",
        uri: "https://staging.vreel.page/files/c7a8583752d2c27c0376ccbad08dc886",
    },
}
const client = new GraphQLClient(endpoint, {
    headers: {
        authorization: 'Bearer MY_TOKEN',
    },
})

const slideId = "cajag5223aktcaat7b20"
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNhZmIwb3EyM2FrajlnNHFrMTlnIiwiYWNjb3VudF90eXBlIjoiZW50ZXJwcmlzZSIsImV4cCI6MTY1NjY5NjA5OH0.StK2yvXIAl5WPV6gD5G0g8KmAM7YSS7hhinB6d-CKmg"
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



