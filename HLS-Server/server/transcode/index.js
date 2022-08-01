const ffmpeg = require('fluent-ffmpeg')

const uploadQue = new Set();

module.exports.TranscodeVideo = ({
    fileDir,
    username,
}) => {
    // ffmpeg(fileDir, { timeout: 432000 }).addOptions([
    //     '-profile:v baseline', // baseline profile (level 3.0) for H264 video codec
    //     '-level 3.0',
    //     '-s 640x360',          // 640px width, 360px height output video dimensions
    //     '-start_number 0',     // start the first .ts segment at index 0
    //     '-hls_time 10',        // 10 second segment duration
    //     '-hls_list_size 0',    // Maxmimum number of playlist entries (0 means all entries/infinite)
    //     '-f hls'               // HLS format
    // ]).output(`content/${username}/${Date.now()}.m3u8`).on('end', (cb) => {
    //     console.log('[successfully transcoded]')
    // }).run()
    ffmpeg(fileDir, { timeout: 432000 }).addOptions([
        '-profile:v baseline', // baseline profile (level 3.0) for H264 video codec
        '-level 3.0',
        '-s 640x360',          // 640px width, 360px height output video dimensions
        '-start_number 0',     // start the first .ts segment at index 0
        '-hls_time 10',        // 10 second segment duration
        '-hls_list_size 0',    // Maxmimum number of playlist entries (0 means all entries/infinite)
        '-f hls'               // HLS format
    ]).output('content/output.m3u8').on('end', () => {
        console.log("done")
    }).run()
}