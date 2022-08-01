const express = require("express")
const multer = require("multer");
const hls = require("hls-server")
const path = require("path");
const { TranscodeVideo } = require("./server/transcode");
const storage = multer.diskStorage({
    destination: `${__dirname}/uploads`,
    filename: (req, file, cb) => {

        // console.log(req)
        // const nameSections = file.filename.split()
        // const isImage = nameSections[nameSections.length - 1].includes('image');

        cb(null, `${Date.now()}${path.extname(file.originalname)}`)
    }
})

const app = express();

const uploadMedia = multer({ storage }).single("content")

app.use(express.static('dist'))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/dist/index.html'))
})

app.post('/upload', uploadMedia, (req, res) => {
    console.log(req.file.filename)
    if (req.file) {
        const fileType = req.body.type
        const fileName = req.file.filename
        console.log('[fileType]', fileType)
        const isVideo = fileType.includes("video")
        console.log(isVideo === "video/mp4")
        if (isVideo) {
            const dir = `${__dirname}/uploads/${fileName}`
            try {
                TranscodeVideo({ fileDir: dir, username: 'aaron' })
            } catch (e) {
                console.log(e.message)
            }
        }
        return res.json({ msg: "uploaded!" });
    }
    res.json({
        err: 'failed upload'
    })
});

app.listen(9000, () => console.log('[hls server started]'))

new hls(app, {
    provider: {
        exists: (req, cb) => {
            const ext = req.url.split('.').pop();

            if (ext !== 'm3u8' && ext !== 'ts') {
                return cb(null, true);
            }

            fs.access(__dirname + req.url, fs.constants.F_OK, function (err) {
                if (err) {
                    console.log('File not exist');
                    return cb(null, false);
                }
                cb(null, true);
            });
        },
        getManifestStream: (req, cb) => {
            const stream = fs.createReadStream(__dirname + req.url);
            cb(null, stream);
        },
        getSegmentStream: (req, cb) => {
            const stream = fs.createReadStream(__dirname + req.url);
            cb(null, stream);
        }
    }
});