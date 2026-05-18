const router = require('express').Router()
const Event = require('../models/Event')
const Attendence = require('../models/Attendence')
const verifyToken = require('../middleware/verify-token')

// POST create event
router.post('/create', verifyToken, async (req, res) => {
    try {
        const event = await Event.create({
            title: req.body.title,
            description: req.body.description,
            date: req.body.date,
            location: req.body.location,
            category: req.body.category,
            createdBy: req.user._id
        })

        res.status(201).json(event)
    }

    catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})


//GET all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find()
      .populate('createdBy', 'name email')
      .populate({
        path: 'attendees',
        populate: {
          path: 'userId',
          select: 'name email'
        }
      })

    res.status(200).json(events)

  }
    catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

// GET one event
router.get('/:eventId', async (req, res) => {
  try {

    const event = await Event.findById(req.params.eventId)
      .populate('createdBy', 'username') 
      .populate({
        path: 'attendees',
        populate: {
          path: 'userId',
          select: 'username'
        }
      })

    if (!event) {
      return res.status(404).json({
        message: 'Event not found' })
    }

    res.status(200).json(event)

  } 
    catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})


// PUT  update event
router.put('/:eventId', verifyToken, async (req, res) => {
  try {

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.eventId,
      req.body,
      { new: true }
    )
    res.status(200).json(updatedEvent)
  } 
    catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

// DELETE 
router.delete('/:eventId', verifyToken, async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.eventId)

    res.status(200).json({ message: 'Event deleted' })

  } 
   catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})


module.exports = router