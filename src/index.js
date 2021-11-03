const express = require('express'),
  mysql = require('mysql')

// Instance express
const app = express()

// Settings
app.set('port', process.env.PORT || 3000)

// Configure routes (request, response)
app.get('/', (request, response) => {
  response.send('Ruta Home /')
})

// Starting the server
app.listen(app.get('port'), () => {
  console.log('Server Running in port:', app.get('port'))
})