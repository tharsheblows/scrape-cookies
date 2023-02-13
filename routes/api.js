const express = require('express');
const { resolve } = require('path');
const router = express.Router();
const puppeteer = require('puppeteer');
const validUrl = require('valid-url');

/* GET api. */
router.post('/api', async function (_req, res ) {
	_req.setTimeout(120000);
	res.setTimeout(120000);

	const body = _req.body;

	if (!body.site || !validUrl.isUri(body.site.trim())) {
		res.send({ message: `${body.site} is not a valid url.` });
		return;
	}

	const browser = await puppeteer.launch({
		headless: true,
		// Could have dynamic options here for incognito.
		args: ['--no-sandbox'],
		// Allow me to see the console.logs in evaluate please.
	});

	// Let's put this in incognito mode, shall we? For now.
	const context = await browser.createIncognitoBrowserContext();
	const page = await context.newPage();
	// I'm a real browser.
	await page.setUserAgent(
		'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4182.0 Safari/537.36'
	);
	await page.setExtraHTTPHeaders({
		'sec-ch-ua-platform': 'Windows',
		'viewport-width': '1366',
		'accept-language': 'en,ar-DZ;q=0.9,ar;q=0.8',
	});

	try {
		await page.goto(body.site.trim(), { waitUntil: 'networkidle2' });
		console.log('first try');
	} catch (error) {
		try {
			console.log('second try');
			await page.goto(body.site.trim(), {
				waitUntil: 'domcontentloaded',
			});
		} catch (err) {
			console.log('error');
			res.send({
				message: 'This page could not be loaded, please check the url.',
			});
			return;
		}
	}

	console.log('here');

	await autoScroll(page);

	const client = await page.target().createCDPSession();
	const cookies = await client.send('Network.getAllCookies');

	res.send(cookies);

	console.log('done');

	await browser.close();
});

// Thank you Cory. https://stackoverflow.com/questions/51529332/puppeteer-scroll-down-until-you-cant-anymore
async function autoScroll(page) {
	console.log('autoscroll')
	try {
		console.log(page);

		// For debugging -- output console logs to stdout.
		page.on('console', async (e) => {
			const args = await Promise.all(e.args().map((a) => a.jsonValue()));
			console.log(...args);
		});

		await page.evaluate(async () => {
			await new Promise((resolve) => {
				let totalHeight = 0;
				let distance = 100;
				let count = 0;

				const timer = setInterval(() => {
					const scrollHeight = document.body.scrollHeight;
					window.scrollBy(0, distance);
					totalHeight += distance;
					count += 1;

					// Only look at the first 30000 pixels.
					if ( count > 300 || totalHeight >= scrollHeight - window.innerHeight ) {
						clearInterval(timer);
						resolve();
					}
				}, 100);
			});
		});
	} catch (error) {
		console.log(error);
		resolve();
	}

}

module.exports = router;
