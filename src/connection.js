const mongoose = require('mongoose');
require('dotenv').config();

const sessionList = ['2018W', '2019S', '2019W', '2020S', '2020W'];

const connectionMap = {};

console.log(process.env.MONGO_ATLAS_PW)
console.log('hmm');

for (const session of sessionList) {
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
