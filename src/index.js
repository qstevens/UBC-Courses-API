let express = require('express')

let app = express()

let personRoute = require('./routes/person')

app.use(personRoute)
app.use(express.static('public'))

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.info(`Server has started on ${PORT}`))