
const { request, gql, GraphQLClient } = require('graphql-request');
const endpoint = 'https://staging.vreel.page/graphql'

const slides = [{
    slideId: "cbfg8f223akupqebj2eg",
    "slide_location": 1,
    "title": {
        "header": "Haskins Family Foundation",
        "description": "The Big Giveaway"
    },
    "cta1": {
        "link_url": "https://visiticww.com/thebiggiveaway",
        "link_type": "url",
        "link_header": "REGISTER NOW"
    },
    "cta2": {
        "link_url": "https://www.haskinsfamilyfoundation.com/support-us",
        "link_type": "url",
        "link_header": "SUPPORT US"
    },
    "mobile": {
        "content_type": "video/mp4",
        "uri": "https://staging.vreel.page/files/94c1230aa2ae9670ab4f4683198dfb4e",
        "background_audio_uri": ""
    },
    "desktop": {
        "content_type": "video/mp4",
        "uri": "https://staging.vreel.page/files/94c1230aa2ae9670ab4f4683198dfb4e",
        "background_audio_uri": ""

    }
},
{
    slideId: "cbhmini23akupqebj2ug",
    "slide_location": 2,
    "title": {
        "header": "Jenkins Brothers",
        "description": "Haskins Family Tribute"
    },
    "cta1": {
        "link_url": "https://www.haskinsfamilyfoundation.com/about",
        "link_type": "url",
        "link_header": "LEARN MORE"
    },
    "cta2": {
        "link_url": "https://www.haskinsfamilyfoundation.com/support-us",
        "link_type": "url",
        "link_header": "SUPPORT US"
    },
    "mobile": {
        "content_type": "video/quicktime",
        "uri": "https://staging.vreel.page/files/a83f8cfba6ef5612e4813511c0499c37",
        "background_audio_uri": ""
    },
    "desktop": {
        "content_type": "video/quicktime",
        "uri": "https://staging.vreel.page/files/a83f8cfba6ef5612e4813511c0499c37",
        "background_audio_uri": ""

    }
},
{
    slideId: "cbi2a0a23akupqebj2v0",
    "slide_location": 3,
    "title": {
        "header": "Haskins Violin Tribute",
        "description": "  "
    },
    "cta1": {
        "link_url": "https://www.haskinsfamilyfoundation.com/about",
        "link_type": "url",
        "link_header": "LEARN MORE"
    },
    "cta2": {
        "link_url": "https://www.haskinsfamilyfoundation.com/support-us",
        "link_type": "url",
        "link_header": "SUPPORT US"
    },
    "mobile": {
        "content_type": "video/quicktime",
        "uri": "https://staging.vreel.page/files/05c9d56fc49a632fd2c091e63f73f948",
        "background_audio_uri": ""
    },
    "desktop": {
        "content_type": "video/quicktime",
        "uri": "https://staging.vreel.page/files/05c9d56fc49a632fd2c091e63f73f948",
        "background_audio_uri": ""

    }
}

]




const client = new GraphQLClient(endpoint, {
    headers: {
        authorization: 'Bearer MY_TOKEN',
    },
})

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNiZmc4ZjIyM2FrdXBxZWJqMmUwIiwiYWNjb3VudF90eXBlIjoiZW50ZXJwcmlzZSIsImV4cCI6MTY1OTcyMzc0Mn0.tC5XKd-IXEdlbKkB2SAeX_d34JOWGmvDk6OBrK4KTJk"


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

    slides.forEach(async (slide) => {
        const data = JSON.stringify(slide)
        const _data = await client.request(MUTATATION, { token, slideId: slide.slideId, data });
        console.log(slide.slideId, _data)
    })


}

T()



