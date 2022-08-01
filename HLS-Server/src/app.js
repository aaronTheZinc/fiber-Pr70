const Uppy = require('@uppy/core')
const Dashboard = require("@uppy/dashboard")
const XHRUpload = require('@uppy/xhr-upload')
const WebCam = require("@uppy/webcam")



const uppy = new Uppy().use(Dashboard, {
    inline: true,
    target: "#drag-drop-area"
}).use(XHRUpload, {
    endpoint: '/upload',
    fieldName: "content",
    formData: true
})

uppy.on('upload', (res) => console.log(res))