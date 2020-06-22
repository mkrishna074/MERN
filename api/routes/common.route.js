const router = require('express').Router();
var path = require('path');
const {menuItemValidation} = require('../validation');
let menuItem = require('../models/menuItem.model');
const verify = require('../middlewares/verifyToken');


/**
 * @route   GET api/menuItems
 * @desc    Get menu items
 * @access  Public
 */

router.get('/menuItems', verify, async (req, res) => {
    try {
      console.log(req.query);
      const items = await menuItem.find();
      console.log(items);
      if (!items) res.status(400).json({ message: 'No items.' });
  
      res.status(200).json(items);
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: e.message });
    }
});

  /**
 * @route   Post api/addMenuItem
 * @desc    Add menu item
 * @access  Public
 */

router.post('/addMenuItem', async (req, res) => {
    try {
        const validationRes = menuItemValidation(req.body);
        if(validationRes.error) {
          console.log(validationRes.error);
          return res.status(500).json({message:validationRes.error.details[0].message});
        }
        const menuItemExists = await menuItem.findOne({name: req.body.name});
        console.log(menuItemExists);
        if(menuItemExists) return res.status(500).json({message : 'Menu already exists!'});
        const newMenuItem = new menuItem({name: req.body.name, component: req.body.component, isActive: true});
        newMenuItem.save()
        .then(() => res.json('Menu added!'))
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: e.message });
    }
});
module.exports = router;