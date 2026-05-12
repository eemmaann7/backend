const router = require('express').Router()
const Event = require('../models/Event')
const Attendence = require('../models/Attendence')
const verifyToken = require('../middleware/verify-token')

// POST
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
        res.status(500).json({ err: err.message })
    }
})

module.exports = router