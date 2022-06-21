const { gql, GraphQLClient } = require('graphql-request');
const { simpleLinks } = require('./links');

const endpoint = 'https://staging.vreel.page/graphql'
const ENTERPRISE_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNhZmIwb3EyM2FrajlnNHFrMTlnIiwiYWNjb3VudF90eXBlIjoiZW50ZXJwcmlzZSIsImV4cCI6MTY1NjAwMjM0NH0.So48UkBibIZznV4WjbPuhuViyUsaVvIV55TGY7yGZvA";

const client = new GraphQLClient(endpoint, {
    headers: {
        authorization: 'Bearer MY_TOKEN',
    },
})

const MUTATION = gql`
mutation AddSimpleLink($token: String!, $link_header: String!, $url: String!, $thumbnail: String!, $link_type: String!, $tag: String!) {
    addSimpleVreelLink(token: $token , link: {
      url: $url
      link_header: $link_header,
      thumbnail: $thumbnail,
      link_type: $link_type,
      tag: $tag,
   }){
      message
      succeeded
      
    }
  }

  `

async function AddLinks() {
    simpleLinks.forEach(async (link) => {
        const r = await client.request(MUTATION, { token: ENTERPRISE_TOKEN, ...link });
        console.log(r)
    })
}

AddLinks();