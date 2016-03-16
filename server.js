// Get the packages we need
var express = require('express');
var bodyParser = require('body-parser');
var Sequelize = require('sequelize');

// connect to the database
var sequelize = new Sequelize('theatre', '', '', {
	host: 'localhost',
	dialect: 'sqlite',
	pool: {
		max: 5,
		min: 0,
		idle: 10000
	},
	storage: 'tc.db'
});

// load the database models
var markerModel = require('./models/marker.js')(sequelize, Sequelize);

// load the controllers
var markerController = require('./controllers/marker.js')(markerModel);

// initialize the server
var app = express();
var port = process.env.PORT || 5000;
app.use(express.static('cdn'));
app.use(bodyParser.urlencoded({
	extended: true
}));

// set up the REST API
var router = express.Router();
router.use(function(err, req, res, next) {
	res.status(400);
	res.json(err);
});

// user's notes
router.route('/markers')
	.post(markerController.post)
	.get(markerController.get);
router.route('/markers/:offset')
	.get(markerController.get);

// register all the routes to the API
app.use('/api/v0.1.0', router);

// initialize the databases and start the server
sequelize.sync().then(function() {
	app.listen(port);
	console.log('listening on *:' + port);
})