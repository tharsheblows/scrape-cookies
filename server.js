const express = require('express');

//Loads the handlebars module
const hb = require('express-handlebars');
const app = express();

const PORT = process.env.PORT || 7654;
const environment = process.env.NODE_ENV || 'production';

console.log( 'ENVIRONMENT | ' + environment );

const api = require('./routes/api');
const home = require('./routes/home');

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

app.use(express.json());

if ( environment === 'development' ) {

	// Live reload when anything changes.
	const livereload = require('livereload');
	const connectLiveReload = require('connect-livereload');

	const liveReloadServer = livereload.createServer();
	liveReloadServer.server.once('connection', () => {
		setTimeout(() => {
			liveReloadServer.refresh('/');
		}, 10);
	});
	app.use(connectLiveReload());

	// Compile the react on the fly during development.
	const config = require('./client/webpack.dev.js');
	const webpack = require('webpack');
	const compiler = webpack(config);

	app.use( require("webpack-dev-middleware")(compiler,  {
			publicPath: config.output.publicPath,
		})
	);

} else {
	// In production, use the built React app.
	app.use(express.static('public/dist'));
}

app.use(express.static('public/js'));
app.use(express.static('public/css'));
app.use(express.static('public/fonts'));

app.get('/test', (req, res) => {
	res.send('Would you like some toast.');
});

app.get('/', home);

app.post('/api', api );

app.get('/happy', function (_req, res) {
	res.send('happy');
});

const listener = app.listen( PORT, function () {
	listener.keepAliveTimeout = 0;
	console.log('PORT | ' + listener.address().port);
});
