const app = require("express")();
const multer = require("multer");
const path = require("path")
const storage = multer.diskStorage({
    destination: `${__dirname}/uploads`,
    filename: (req, file, cb) => {
        const nameSections = file.filename.split()
        const isImage = nameSections[nameSections.length -1].includes('image');

        cb(null, `${Date.now()}${path.extname(file.originalname)}`)
    }
})

const uploadMedia = multer({ storage }).single("media")

app.post('/upload', uploadMedia, (req, res) => {
    if(req.file) return res.json({msg: "uploaded!"});

    res.json({
        err: 'failed upload'
    })
})

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