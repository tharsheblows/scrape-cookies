const express = require('express');
const puppeteer = require('puppeteer');
//Loads the handlebars module
const hb = require('express-handlebars');
const app = express();

const config = require('./client/webpack.config.js');
console.log(config);

const PORT = process.env.PORT || 7654;
const environment = process.env.NODE_ENV || 'production';

console.log(hb);
console.log(environment);

app.engine(
	'.hbs',
	hb.engine({
		extname: '.hbs',
		layoutsDir: __dirname + '/views/layouts',
		partialsDir: __dirname + '/views/partials/',
	})
);
app.set('view engine', '.hbs');
app.set('views', './views');

if ( environment === 'development' ) {
	const webpack = require('webpack');
	const compiler = webpack(config);
	app.use( require("webpack-dev-middleware")(compiler,  {
			publicPath: config.output.publicPath,
		})
	);
  	app.use(require('webpack-hot-middleware')(compiler));
} else {
	app.use(express.static('public/dist'));
}

app.use(express.static('public/js'));
app.use(express.static('public/css'));

app.get('/test', (req, res) => {
	res.send('Hello World!');
});

app.get('/api', (req, res) => {
	res.json({ message: 'Hello from server!' });
});

app.get('/', async function (_req, res) {
	res.render('main', {layout: 'index', loadingState: "running, check the console"});
	console.log('hey');
	const executablePath = await puppeteer.executablePath();
	console.log(executablePath);
	const browser = await puppeteer.launch({
		headless: true,
		args: ['--no-sandbox']
	});
	console.log(browser);
	const page = await browser.newPage();
	console.log('Loading site...');
	await page.setExtraHTTPHeaders({
		'user-agent':
			'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.60 Safari/537.36',
		'sec-ch-ua-platform': 'Windows',
		'viewport-width': '1366',
		'accept-language': 'en,ar-DZ;q=0.9,ar;q=0.8',
	});
	await page.goto('https://google.com', { waitUntil: 'networkidle2' });

	const client = await page.target().createCDPSession();
	const cookies = await client.send('Network.getAllCookies');
	// Here we can get all of the cookies
	console.log(cookies);
	console.log('done');
});

app.get('/cookies', function (_req, res) {
	res.send('cookies');
});

var listener = app.listen( PORT, function () {
	console.log('PORT | ' + listener.address().port);
});
