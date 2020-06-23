const router = require('express').Router();
var path = require('path');
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

router.post('/addEvent', verify,  upload.array('media', 12), (req, res, next) =>{
    const validationRes = eventValidation(req.body);
    if(validationRes.error) {
      console.log(validationRes.error);
      return res.status(500).json({message:validationRes.error.details[0].message});
    }
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
    .catch(err => res.status(400).json({message:err.message}))
})

/**
 * @route   GET api/searchEvents
 * @desc    Get events
 * @access  Public
 */

router.get('/searchEvents', async (req, res) => {
    try {
      console.log(req.query);
      const items = await event.find().or([{title: {$regex: req.query.q, $options: 'i'}},
                                      {highlights: {$regex: req.query.q, $options: 'i'}},
                                      {tags: {$regex: req.query.q, $options: 'i'}},
                                      {category: {$regex: req.query.q, $options: 'i'}}])         
      .skip(req.query.page - 1)
      .limit(5);
      console.log(items);
      if (!items) throw Error('No items');
  
      res.status(200).json(items);
    } catch (e) {
      console.log(e);
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
    const typeExists = await eventType.findOne({name: req.body.name});
    console.log(typeExists);
    if(typeExists) return res.status(500).json({message : 'Type already exists!'});
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

  /**
   * @route   Get api/getFile/:fileName
   * @desc    gets a file
   * @access  Private
   */

   router.get('/getFile', async (req, res) => {
      res.sendFile(path.resolve(path.resolve(`uploads/${req.query.filename}`)));
   });

  /**
   * @route   Get api/todayi/getEventTypes
   * @desc    gets the types
   * @access  Private
   */

  router.get('/getEventTypes', verify, async (req, res) => {
    try {
      console.log(req);
      const items = await eventType.find();
      console.log(items);
      if (!items) res.status(400).json({ message: 'No items.' });
  
      res.status(200).json(items);
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: e.message });
    }
  });

module.exports = router;