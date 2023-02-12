const express = require('express');
const router = express.Router();
const puppeteer = require('puppeteer');
const validUrl = require('valid-url');

/* GET api. */
router.post('/api', async function (_req, res) {

	const body = _req.body;

	if( ! body.site || ! validUrl.isUri(body.site) ) {
		res.send( { message:`${body.site} is not a valid url.` } );
		return;
	}

	const browser = await puppeteer.launch({
		headless: true,
		args: ['--no-sandbox']
	});
	const page = await browser.newPage();
	// I'm a real browser.
	await page.setExtraHTTPHeaders({
		'user-agent':
			'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.60 Safari/537.36',
		'sec-ch-ua-platform': 'Windows',
		'viewport-width': '1366',
		'accept-language': 'en,ar-DZ;q=0.9,ar;q=0.8',
	});
	await page.goto(body.site, { waitUntil: 'networkidle2' });
	await autoScroll(page);

	const client = await page.target().createCDPSession();
	const cookies = await client.send('Network.getAllCookies');

	res.send( cookies );

	console.log('done');

	await browser.close();
});

// Thank you Cory. https://stackoverflow.com/questions/51529332/puppeteer-scroll-down-until-you-cant-anymore
async function autoScroll(page) {
	await page.evaluate(async () => {
		await new Promise((resolve) => {
			var totalHeight = 0;
			var distance = 100;
			var timer = setInterval(() => {
				var scrollHeight = document.body.scrollHeight;
				window.scrollBy(0, distance);
				totalHeight += distance;

				if (totalHeight >= scrollHeight - window.innerHeight) {
					clearInterval(timer);
					resolve();
				}
			}, 100);
		});
	});
}

module.exports = router;
