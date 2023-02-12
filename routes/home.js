const express = require('express');
const router = express.Router();

/* GET api. */
router.get( '/', function (_req, res) {
	res.render('home', {
		layout: 'index',
		loadingState: 'running, check the console baby',
	});
});

module.exports = router;
