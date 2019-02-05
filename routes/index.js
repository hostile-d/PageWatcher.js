var express = require('express');
var router = express.Router();
const { catchErrors } = require('../handlers/errorHandlers.js');
var indexConreller = require('../controllers/indexConreoller.js');

/* GET home page. */
router.get('/', catchErrors(indexConreller.getWebpage));

module.exports = router;
