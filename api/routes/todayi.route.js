const router = require('express').Router();
const verify = require('./verifyToken');
const {itemValidation} = require('../validation');
let item = require('../models/item.model')
const multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        var filename = file.originalname;
        var fileExtension = filename.split(".")[1];
        cb(null, Date.now() + "." + fileExtension);
    }
})
const upload = multer({storage: storage});

router.get('/learns', (req, res) =>{
    /* item.find()
    .then(items => res.json(items))
    .catch(err => res.status(400).json('Error: ' + err)) */
    res.json('Item added!')

})

router.post('/add', upload.array('files'), (req, res, next) =>{
    const title = req.body.title;
    const category = req.body.category;
    const media = req.files.map(f => f.filename);
    const newItem = new item({title: title, category: category, media: media});
    newItem.save()
    .then(() => res.json('Item added!'))
    .catch(err => res.status(400).json('Error: ' + err))
})

module.exports = router;