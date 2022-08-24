const { request, gql, GraphQLClient } = require('graphql-request');
const endpoint = 'https://staging.vreel.page/graphql'
const slides = [{
    slideId: "cbkmrta23akupqebj38g",
    "slide_location": 1,
    "title": {
        "header": "Zoom Drain Superior Truck Servicen",
        "description": "Drain & Sewer Experts"
    },
    "cta1": {
        "link_url": "https://docs.google.com/forms/d/e/1FAIpQLSf6WSBnsNuKc-gEUQZMoC5z3Qx3oMYI5bH8Wo_Glw2jgnKU8Q/viewform?usp=sf_link",
        "link_type": "url",
        "link_header": "REFERRAL PROGRAM"
    },
    // "cta2": {
    //     "link_url": "https://www.haskinsfamilyfoundation.com/support-us",
    //     "link_type": "url",
    //     "link_header": "Zoom Truck Facts"
    // },
    "mobile": {
        "content_type": "video/mp4",
        "uri": "https://staging.vreel.page/files/37181d2e8ffb404718b36f1f248d67c3",
        "background_audio_uri": ""
    },
    "desktop": {
        "content_type": "video/mp4",
        "uri": "https://staging.vreel.page/files/37181d2e8ffb404718b36f1f248d67c3",
        "background_audio_uri": ""

    }
},
{
    slideId: "cblie5a23akloo3fp3r0",
    "slide_location": 2,
    "title": {
        "header": "Zoom Truck Facts",
        "description": "  "
    },
    "cta1": {
        "link_url": "https://www.zoomdrain.com/north-jersey/schedule-service/",
        "link_type": "url",
        "link_header": "SCHEDULE SERVICE"
    },
    // "cta2": {
    //     "link_url": "https://www.haskinsfamilyfoundation.com/support-us",
    //     "link_type": "url",
    //     "link_header": "SUPPORT US"
    // },
    "mobile": {
        "content_type": "video/mp4",
        "uri": "https://staging.vreel.page/files/3427beda4e0fd38ed2534c6f8fa82a65",
        "background_audio_uri": ""
    },
    "desktop": {
        "content_type": "video/mp4",
        "uri": "https://staging.vreel.page/files/3427beda4e0fd38ed2534c6f8fa82a65",
        "background_audio_uri": ""

    }
},
{
    slideId: "cblie5a23akloo3fp3rg",
    "slide_location": 3,
    "title": {
        "header": "How Many Feet We Clean A Day",
        "description": "  "
    },
    "cta1": {
        "link_url": "https://www.zoomdrain.com/north-jersey/schedule-service/",
        "link_type": "url",
        "link_header": "SCHEDULE SERVICE"
    },
    // "cta2": {
    //     "link_url": "https://www.haskinsfamilyfoundation.com/support-us",
    //     "link_type": "url",
    //     "link_header": "SUPPORT US"
    // },
    "mobile": {
        "content_type": "video/mp4",
        "uri": "https://staging.vreel.page/files/58fd054ff1174d0f91cacdcd867a3201",
        "background_audio_uri": ""
    },
    "desktop": {
        "content_type": "video/mp4",
        "uri": "https://staging.vreel.page/files/58fd054ff1174d0f91cacdcd867a3201",
        "background_audio_uri": ""

    }
},
{
    slideId: "cblie5i23akloo3fp3s0",
    "slide_location": 4,
    "title": {
        "header": "Trenchless Pipe Replacement",
        "description": "Pipe Bursting"
    },
    "cta1": {
        "link_url": "https://vreel.page/zoomdrainguide/sUppQkr",
        "link_type": "url",
        "link_header": "HOW IT WORKS"
    },
    // "cta2": {
    //     "link_url": "https://www.haskinsfamilyfoundation.com/support-us",
    //     "link_type": "url",
    //     "link_header": "SUPPORT US"
    // },
    "mobile": {
        "content_type": "video/mp4",
        "uri": "https://staging.vreel.page/files/fc9345a14b98bfac6218d5040a64d505",
        "background_audio_uri": ""
    },
    "desktop": {
        "content_type": "video/mp4",
        "uri": "https://staging.vreel.page/files/fc9345a14b98bfac6218d5040a64d505",
        "background_audio_uri": ""

    }
},
{
    slideId: "cblie5i23akloo3fp3sg",
    "slide_location": 5,
    "title": {
        "header": "NuFlo Pipelining",
        "description": "  "
    },
    "cta1": {
        "link_url": "https://www.zoomdrain.com/north-jersey/schedule-service/",
        "link_type": "url",
        "link_header": "SCHEDULE SERVICE"
    },
    // "cta2": {
    //     "link_url": "https://www.haskinsfamilyfoundation.com/support-us",
    //     "link_type": "url",
    //     "link_header": "SUPPORT US"
    // },
    "mobile": {
        "content_type": "video/mp4",
        "uri": "https://staging.vreel.page/files/8e91d5f1fc14049afb9104a88c58c271",
        "background_audio_uri": ""
    },
    "desktop": {
        "content_type": "video/mp4",
        "uri": "https://staging.vreel.page/files/8e91d5f1fc14049afb9104a88c58c271",
        "background_audio_uri": ""

    }
}

]




const client = new GraphQLClient(endpoint, {
    headers: {
        authorization: 'Bearer MY_TOKEN',
    },
})

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNia21ydGEyM2FrdXBxZWJqMzgwIiwiYWNjb3VudF90eXBlIjoiZW50ZXJwcmlzZSIsImV4cCI6MTY2MDE4NDUzNn0.YWGa2Uitv_4Uwl_t009SOdYueTgbUpDy-0SmdH91KZw"


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



