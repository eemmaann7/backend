const router = require('express').Router()
const Event = require('../models/Event')
const Attendence = require('../models/Attendence')
const verifyToken = require('../middleware/verify-token')


module.exports = router