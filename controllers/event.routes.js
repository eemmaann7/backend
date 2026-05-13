const router = require('express').Router()
const Event = require('../models/Event')
const Attendence = require('../models/Attendence')
const verifyToken = require('../middleware/verify-token')

// POST create event
router.post('/', verifyToken, async (req, res) => {
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
      .populate('createdBy', 'name email')
      .populate({
        path: 'attendees',
        populate: {
          path: 'userId',
          select: 'name email'
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

module.exports = router