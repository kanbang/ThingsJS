var things_js = require('things-js');
// var FSHelper = require('./fsHelper.js');
var mongoUrl = 'mongodb://localhost:27017/things-js-fs';
var GFS = require('things-js').addons.gfs(mongoUrl);
var fs = require('fs');
console.log('\x1b[44m%s\x1b[0m', '[FSCOMMUNICATION Service] START TESTING...');
var file_data = {'test':3003};


// var readdata = new Promise(function(resolve){
// 		readSchemaTypes(schemaPath).then(function(data){
// 			schemaTypes = data;
// 			resolve();
// 		});
// 	});
var taxidata = fs.readFileSync('./taxi-metadata-fulldataset.txt')
var annotatedata = fs.readFileSync('taxi-schema_with_annotation.csv')
var readdata;
GFS.writeFile('RIOT/taxi-schema_with_annotation.csv', annotatedata, function(err){
  if (err) throw err;
//   GFS.readFile('RIOT/test_database3.json', function(err2, data){
//    if (err2) throw err2;
//    readdata = data;
//    console.log('\x1b[44m%s\x1b[0m', data.toString());
//  // console.log(data.toString());

})


console.log('\x1b[44m%s\x1b[0m', '[FSCOMMUNICATION Service] TESTINGDATA'+readdata);