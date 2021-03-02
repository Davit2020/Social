var express = require('express');
const { home, chatView } = require('../controllers/IndexController');
const { verifyToken } = require('../middlewares/auth');
var router = express.Router();

/* GET home page. */
router.get('/', home);

router.get("/chat",verifyToken, chatView)

module.exports = router;
