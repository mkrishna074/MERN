const router = require('express').Router();
const verify = require('../middlewares/verifyToken');
const {eventValidation} = require('../validation');
let event = require('../models/event.model')
let eventType = require('../models/eventType.model')
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

})

router.post('/add', upload.array('files'), (req, res, next) =>{
    const title = req.body.title;
    const category = req.body.category;
    const media = req.files.map(f => f.filename);
    const newEvent = new event({title: title, category: category, media: media});
    newEvent.save()
    .then(() => res.json('Event added!'))
    .catch(err => res.status(400).json('Error: ' + err))
})

router.post('/addType', (req, res, next) =>{
    const name = req.body.name;
    const isActive = req.body.isActive;
    const newEventType = new eventType({name: name, isActive: isActive});
    newEventType.save()
    .then(() => res.json('Event type added!'))
    .catch(err => res.status(400).json('Error: ' + err))
})

module.exports = router;