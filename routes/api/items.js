const express = require('express');
const router = express.Router();

//Item Model
const Item = require('../../models/Item');


// @route GET api/items
// @desc Get All Items
// @access Public
router.get('/', (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then(items => res.json(items))
})

// @route POST api/items
// @desc Create an item
// @access Public
router.post('/', async (req, res) => {
  try{
    const newItem = new Item({
      name: req.body.name,
      quadrant: req.body.quadrant
    });
  console.log(newItem);
    const item = await newItem.save();
    res.json(item);

  }
  catch(err){
    console.log(err.message);
    res.status(500).send('Server error');
  }
  
})

// @route DELETE api/items/:id
// @desc Delete an item
// @access Public
router.delete('/:id', (req, res) => {
  Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));


})
module.exports = router;