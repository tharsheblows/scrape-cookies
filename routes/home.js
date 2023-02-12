const express = require('express');
const router = express.Router();

/* GET api. */
router.get( '/', function (_req, res) {
	res.render('home', {
		layout: 'index'
	});
});

module.exports = router;
