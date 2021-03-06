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
  res.json('todayi');
})

router.post('/addEvent', verify,  upload.array('media', 12), (req, res, next) =>{
    const media = req.files.map(f => f.filename);;
    const newEvent = new event({
      title: req.body.title, 
      category: req.body.category,
      media: media, 
      highlights: req.body.highlights,
      tags: req.body.tags
    });
    newEvent.save()
    .then(() => res.json('Event added!'))
    .catch(err => res.status(400).json('Error: ' + err))
})

/**
 * @route   GET api/types
 * @desc    Get All types
 * @access  Public
 */

router.get('/', async (req, res) => {
    try {
      const items = await event.find();
      if (!items) throw Error('No items');
  
      res.status(200).json(items);
    } catch (e) {
      res.status(400).json({ msg: e.message });
    }
  });
  
  /**
   * @route   POST api/addType
   * @desc    Create A type
   * @access  Private
   */
  
  router.post('/addType', verify,  async (req, res) => {

    const name = req.body.name;
    console.log('server' + name);
    const newEventType = new eventType({name: name, isActive: true});
    newEventType.save()
    .then(() => res.json('Event type added!'))
    .catch(err => res.status(400).json('Error: ' + err))
  });
  
  /**
   * @route   DELETE api/type/:id
   * @desc    Delete A type
   * @access  Private
   */
  
  router.delete('/:id', async (req, res) => {
    try {
      const item = await Item.findById(req.params.id);
      if (!item) throw Error('No item found');
  
      const removed = await item.remove();
      if (!removed)
        throw Error('Something went wrong while trying to delete the item');
  
      res.status(200).json({ success: true });
    } catch (e) {
      res.status(400).json({ msg: e.message, success: false });
    }
  });

module.exports = router;