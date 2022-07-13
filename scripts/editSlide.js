
const { request, gql, GraphQLClient } = require('graphql-request');
const endpoint = 'https://staging.vreel.page/graphql'
const slide =  {
    "slide_location": 0,
    "title": {
      "header": "VREEL, Co-Founders",
      "description": "Donta' Bell (CEO), Alisha Bell, JeVon Bell (CMO), Jaden Bell (COO), Jared Bell"
    },
    "cta1": {
      "link_url": "https://vreel.page",
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
      "background_audio_uri": "",
      "uri": "https://staging.vreel.page/files/015413124e778f79960cdeb46854e5d8"
    },
    "desktop": {
      "content_type": "image/jpeg",
      "background_audio_uri": "",
      "uri": "https://staging.vreel.page/files/e66d1b19bfe538f0e7dd19151aa3d142"
    }
  }

const client = new GraphQLClient(endpoint, {
    headers: {
        authorization: 'Bearer MY_TOKEN',
    },
})

const slideId = "cb7jj0223akrshkitkvg"
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNiN2pqMDIyM2FrcnNoa2l0a3YwIiwiYWNjb3VudF90eXBlIjoiZW50ZXJwcmlzZSIsImV4cCI6MTY1ODM1NjgzNX0.kNU6Bb8U_avBdKTzbnmIUyKSoysPaHN8YXbsPwC9jH0"
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



