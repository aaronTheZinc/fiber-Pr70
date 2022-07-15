
const { request, gql, GraphQLClient } = require('graphql-request');
const endpoint = 'https://staging.vreel.page/graphql'

const slides = [{
    slideId: "cb64dq223akrshkitkr0",
    "slide_location": 0,
    "title": {
        "header": "Gucci US",
        "description": "A lineup of ready-to-wear and accessories from the latest collection."
    },
    "cta1": {
        "link_url": "https://www.gucci.com/us/en/",
        "link_type": "url",
        "link_header": "SHOP NOW"
    },
    "cta2": {
        "link_url": "https://www.gucci.com/us/en/st/capsule/gifts-services",
        "link_type": "url",
        "link_header": "CLIENT SERVICES"
    },
    "mobile": {
        "content_type": "video/mp4",
        "uri": "https://staging.vreel.page/files/057cd262bdd012ff2ced91be7156cfb3",
        "background_audio_uri": ""
    },
    "desktop": {
        "content_type": "video/mp4",
        "uri": "https://staging.vreel.page/files/057cd262bdd012ff2ced91be7156cfb3",
        "background_audio_uri": ""

    }
},
{
    slideId: "cb8qvkq23akoj0csfeu0",
    "slide_location": 1,
    "title": {
        "header": "Gucci X Adidas",
        "description": "The collection expands on the sartorial streetwear creations with a spectrum of sport-inspired pieces in which the heritage of both brands is encoded in a trio of lines."
    },
    "cta1": {
        "link_url": "https://www.gucci.com/us/en/st/capsule/adidas-gucci",
        "link_type": "url",
        "link_header": "SHOP NOW"
    },
    "cta2": {
        "link_url": "https://www.gucci.com/us/en/",
        "link_type": "url",
        "link_header": "EXPLORE GUCCI"
    },
    "mobile": {
        "content_type": "video/mp4",
        "uri": "https://staging.vreel.page/files/151b6a95e3fbdbf24289b4885d25c384",
        "background_audio_uri": ""
    },
    "desktop": {
        "content_type": "video/mp4",
        "uri": "https://staging.vreel.page/files/151b6a95e3fbdbf24289b4885d25c384",
        "background_audio_uri": ""

    }
},
{
    slideId: "cb8r4c223akoj0csfeug",
    "slide_location": 2,
    "title": {
        "header": "Gucci Lovelight Collection",
        "description": "The selection of women’s and men’s ready-to-wear, shoes, accessories, jewelry, eyewear, and lifestyle items echo the romantic narrative of the House."
    },
    "cta1": {
        "link_url": "https://www.gucci.com/us/en/st/capsule/gucci-lovelight",
        "link_type": "url",
        "link_header": "SHOP NOW"
    },
    "cta2": {
        "link_url": "https://www.gucci.com/us/en/",
        "link_type": "url",
        "link_header": "EXPLORE GUCCI"
    },
    "mobile": {
        "content_type": "video/mp4",
        "uri": "https://staging.vreel.page/files/5ed73f44c90c465c62d06b3c1cb9c13f",
        "background_audio_uri": ""
    },
    "desktop": {
        "content_type": "video/mp4",
        "uri": "https://staging.vreel.page/files/5ed73f44c90c465c62d06b3c1cb9c13f",
        "background_audio_uri": ""

    }
},
{
    slideId: "cb8r7cq23akoj0csfev0",
    "slide_location": 3,
    "title": {
        "header": "Gucci Resort Collection",
        "description": "The Gucci Resort Collection features a selection of items dedicated to renewed travel destinations, personalized with colors, trims and a leather tag unique to the location it represents."
    },
    "cta1": {
        "link_url": "https://www.gucci.com/us/en/st/capsule/gucci-resort-collection",
        "link_type": "url",
        "link_header": "SHOP NOW"
    },
    "cta2": {
        "link_url": "https://www.gucci.com/us/en/",
        "link_type": "url",
        "link_header": "EXPLORE GUCCI"
    },
    "mobile": {
        "content_type": "video/mp4",
        "uri": "https://staging.vreel.page/files/ad87716376a9dfafa36bd7c9ede02921",
        "background_audio_uri": ""
    },
    "desktop": {
        "content_type": "video/mp4",
        "uri": "https://staging.vreel.page/files/ad87716376a9dfafa36bd7c9ede02921",
        "background_audio_uri": ""

    }
},
{
    slideId: "cb8ra1a23akoj0csfevg",
    "slide_location": 4,
    "title": {
        "header": "Gucci Pet Collection",
        "description": "Continuing the narrative of surprise and delight that defines the Gucci Lifestyle selection, the Gucci Pet Collection infuses the everyday with a magical aura."
    },
    "cta1": {
        "link_url": "https://www.gucci.com/us/en/st/capsule/gucci-pet-collection",
        "link_type": "url",
        "link_header": "SHOP NOW"
    },
    "cta2": {
        "link_url": "https://www.gucci.com/us/en/",
        "link_type": "url",
        "link_header": "EXPLORE GUCCI"
    },
    "mobile": {
        "content_type": "video/mp4",
        "uri": "https://staging.vreel.page/files/b8f8f8d91ad550904b6250e44d350df5",
        "background_audio_uri": ""
    },
    "desktop": {
        "content_type": "video/mp4",
        "uri": "https://staging.vreel.page/files/b8f8f8d91ad550904b6250e44d350df5",
        "background_audio_uri": ""

    }
}

]




const client = new GraphQLClient(endpoint, {
    headers: {
        authorization: 'Bearer MY_TOKEN',
    },
})

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNiNjRkcTIyM2FrcnNoa2l0a3FnIiwiYWNjb3VudF90eXBlIjoiZW50ZXJwcmlzZSIsImV4cCI6MTY1ODUxMzk1N30.QAurQ_7lfHDzUZOTXbCBmbmCHITQPw8cjkxvB4lZM_Q"


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



