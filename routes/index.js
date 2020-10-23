const express = require('express');
const router  = express.Router();
const baseControllers = require('../controllers/baseControllers')

router.get('/', baseControllers.index);

module.exports = router;
