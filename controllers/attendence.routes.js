const router = require('express').Router()
const Event = require('../models/Event')
const Attendence = require('../models/Attendence')
const verifyToken = require('../middleware/verify-token')




// POST 
router.post('/:eventId', verifyToken, async (req, res) => {
  try {

    const attendence = await Attendence.create({
      userId: req.user._id,
      eventId: req.params.eventId,
      status: req.body.status
    })

    await Event.findByIdAndUpdate(req.params.eventId, {
      $push: { attendees: attendence._id }
    })

    res.status(201).json(attendence)

  } 
  catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})


// GET all attendance for one event
router.get('/:eventId', async (req, res) => {
  try {

    const attendees = await Attendence.find({
      eventId: req.params.eventId
    }).populate('userId', 'username')

    res.status(200).json(attendees)

  } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})


// DELETE 
router.delete('/:attendenceId', verifyToken, async (req, res) => {
  try {

    const attendence = await Attendence.findByIdAndDelete(
      req.params.attendenceId
    )

    await Event.findByIdAndUpdate(attendence.eventId, {
      $pull: { attendees: attendence._id }
    })

    res.status(200).json({ message: 'Attendance removed' })

  } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})


module.exports = router