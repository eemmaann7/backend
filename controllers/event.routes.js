const router = require('express').Router()
const Event = require('../models/Event')
const verifyToken = require('../middleware/verify-token')

//POST
