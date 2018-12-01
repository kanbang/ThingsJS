/* SimpleLinearRegression adapted from RIoTBench
 */
var things = require('things-js');
var fs = require('fs');

/* configurable variables */
var pubsubUrl = 'mqtt://test.mosquitto.org';
var processingTopic = 'iotbench/processing';
var subscribeTopic = processingTopic + '/kalmanfilter';
var publishTopic = processingTopic + '/slr';
var propertiesPath = './TAXI_properties.json';

/* slr properties */
var coefficients = [-0.08823332241427906,0.0024496898226796376];
var MODEL_PATH, USE_MSG_FIELDLIST;
var b0, b1;

var pubsub = new things.Pubsub(pubsubUrl);

function setup() {
	var properties;
	try {
		properties = JSON.parse(fs.readFileSync(propertiesPath, 'utf-8'));
	} catch(e) {
		console.log('Problem reading with properties file: ' + e);
		process.exit();
	}
	USE_MSG_FIELDLIST = properties['PREDICT.SIMPLE_LINEAR_REGRESSION.USE_MSG_FIELD_LIST'];
	MODEL_PATH = properties['PREDICT.SIMPLE_LINEAR_REGRESSION.MODEL_PATH'];
	try {
		b0 = coefficients[0];
		b1 = coefficients[1];
	} catch(e) {
		console.log('Problem fetching linear regression model from file path: ' + e);
		process.exit();
	}
}

function linearRegression(msg) {
	var start = Date.now(); 

	var data = JSON.parse(msg);
	var id = data.id;
	var content = data.content;

	var xKey = USE_MSG_FIELDLIST[0];
	var yKey = USE_MSG_FIELDLIST[1];

	var prediction = b0 + b1 * content[xKey];
	console.log('Prediction: ' + prediction + '. Actual: ' + content[yKey]);

	var predJSON = {}
	predJSON[yKey + '_prediction'] = prediction;
	predJSON[yKey + '_actual'] = content[yKey];

	var end = Date.now();
	elapsed = end - start;
	pubsub.publish(processingTopic, { id: id, component: 'slr', time: elapsed });

	pubsub.publish(publishTopic, JSON.stringify({ id: id, content: predJSON }));
}

pubsub.on('ready', function() {
	setup();
	console.log('Beginning linear regression');
	pubsub.subscribe(subscribeTopic, linearRegression);
});