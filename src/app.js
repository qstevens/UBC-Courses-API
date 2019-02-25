const express = require('express')
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');

const authoritativeRoutes = require('./api/routes/authoritative');
const treeRoutes = require('./api/routes/tree');

const connectionMap = require('./connection');

//console.log(uri);

//mongoose.connect(uri, { useNewUrlParser: true });

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// appends response header
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers', 
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET');
        return res.status(200).json({});
    }
    next();
});


app.use('/tree', treeRoutes);

app.use(authoritativeRoutes);

// send to home page if not routed
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

// 404 error not found
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

// errors handler
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;
