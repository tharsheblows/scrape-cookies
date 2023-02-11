const puppeteer = require('puppeteer');

(async () => {
	const browser = await puppeteer.launch({});
	const page = await browser.newPage();
	await page.goto('https://winknews.com', { waitUntil: 'networkidle2' });

	const client = await page.target().createCDPSession();
	// Here we can get all of the cookies
	console.log(await client.send('Network.getAllCookies'));
})();