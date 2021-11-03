const express = require('express')

// Instance express
const app = express()

// Settings
app.set('port', process.env.PORT || 3000)
app.use(express.json())

// Routes
app.use(require('./routes/articles'))

// Starting the server
app.listen(app.get('port'), () => {
  console.log('Server Running in port:', app.get('port'))
})