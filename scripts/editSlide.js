
const { request, gql, GraphQLClient } = require('graphql-request');
const endpoint = 'https://staging.vreel.page/graphql'
const slide = {

    "slide_location": 3,
    "title": {
        "header": "VREEL redefines price tags and more...",
        "description": "  "
    },
    "cta1": {
        "link_url": "https://staging.vreel.page/hennessyvs",
        "link_type": "url",
        "link_header": "Learn More"
    },
    "cta2": {
        "link_url": "",
        "link_type": "",
        "link_header": ""
    },
    "mobile": {
        "content_type": "image/jpeg",
        "uri": "https://staging.vreel.page/files/e169fc0e82a7e3c46a3ab486c213fc2d",
        "background_audio_uri": ""
    },
    "desktop": {
        "content_type": "image/jpeg",
        "uri": "https://staging.vreel.page/files/10cd000a509b33b92c7f212357b531f0",
        "background_audio_uri": ""

    }
}

const client = new GraphQLClient(endpoint, {
    headers: {
        authorization: 'Bearer MY_TOKEN',
    },
})

const slideId = "cb34amq23akl6a0h3lq0"
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNiMnIwcGkyM2FrbDZhMGgzbGtnIiwiYWNjb3VudF90eXBlIjoic3RhbmRlciIsImV4cCI6MTY1NzgyNzIxMH0.tjj29mPQAG8rXzZsapa6stC5loBjc53EuobBRNU-xIw"
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



