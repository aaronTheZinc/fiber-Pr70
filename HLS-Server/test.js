// const Transcoder = require('hls-transcoder').default


// async function transcodeVideo() {
//   const transcoder = new Transcoder(`${__dirname}/1659403110327.mp4`,`${__dirname}/output`)

//   transcoder.on('error', (err) => {
//     console.error(err)
//   })

//   try {
//     const hlsPath = await transcoder.transcode()
//     console.log('Successfully Transcoded Video')
//   } catch (err) {
//     console.log(err.message)
//   }
// }

// transcodeVideo()