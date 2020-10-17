// SET STORAGE
const multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log('in des');
        cb(null, 'uploads')

    },
    filename: function (req, file, cb) {
        console.log('in file', file);
        var filetype = '';

        if (file.mimetype === 'image/png') {
            filetype = 'png';
        }
        if (file.mimetype === 'image/jpeg') {
            filetype = 'jpg';
        }
        cb(null, 'image' + '-' + Date.now() + '.' + filetype)

    }
})

module.exports.upload = multer({ storage: storage })