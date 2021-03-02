var express = require('express');
const { home } = require('../controllers/IndexController');
var router = express.Router();

/* GET home page. */
router.get('/', home);

module.exports = router;
