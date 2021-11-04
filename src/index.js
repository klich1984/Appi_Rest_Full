const express = require('express'),
	cors = require('cors')

// Instance express
const app = express()

// Settings
app.set('port', process.env.PORT || 3000)
app.use(express.json())
app.use(cors())

// Routes
app.use(require('./routes/articles'))

// Starting the server
app.listen(app.get('port'), () => {
	console.log('Server Running in port:', app.get('port'))
})
