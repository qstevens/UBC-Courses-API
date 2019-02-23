const mongoose = require('mongoose');

const uri = 
   'mongodb+srv://read-user:' + 
    process.env.MONGO_ATLAS_PW +
    '@ubc-web-api-zvc60.mongodb.net/2018W?retryWrites=true';
const sessionList = ['2018W', '2019S'];
const connectionMap = {};

for (let session of sessionList) {
	let connection = mongoose.createConnection(
		'mongodb+srv://read-user:' +
		process.env.MONGO_ATLAS_PW +
		'@ubc-web-api-zvc60.mongodb.net/' +
		session +
		'?retryWrites=true',
		{ useNewUrlParser: true }
	);
	connectionMap[session] = connection;
}

module.exports = connectionMap;