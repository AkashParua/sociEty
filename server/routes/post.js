const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const Post = require('../models/Post')
const Profile = require('../models/Profile')
router.use(bodyParser.json())





module.exports = router