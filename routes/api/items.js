const express = require('express');
const router = express.Router();
var mongoose = require('mongoose');
const auth = require('../../middleware/auth');
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
router.post('/', auth, (req, res) => {
  const newItem = new Item({
    name: req.body.name,
    quadrant: req.body.quadrant
  });

  newItem.save().then(item => res.json(item));
})

// @route PUT api/items/:id
// @desc Update an item
// @access Public
router.put('/:id', auth, async  (req, res) => {
  const { name, quadrant, id } = req.body;
  console.log(id);
  try {

    const activity = await Item.findById((req.params.id));

    activity.name = name;
    activity.quadrant = quadrant;
    activity.save();
    res.json(activity);
  }
  catch (err) {

    console.error(err.message);

    res.status(500).send("server error");
  }


})

// @route DELETE api/items/:id
// @desc Delete an item
// @access Public
router.delete('/:id', auth, (req, res) => {

  console.log("for delete " + "req.params.id is " + req.params.id)
  Item.findByIdAndRemove(req.params.id, err => {
    if (err) {
      console.log(err.message);
      res.status(404).json({ success: false })
    }
    else {
      res.json({ success: true })
    }
  })



})
module.exports = router;