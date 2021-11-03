const express = require('express'),
  mysql = require('mysql'),
  { database } = require('./keys')

// Instance express
const app = express()

// Settings
app.set('port', process.env.PORT || 3000)
app.use(express.json())

// Conection mysql
const conection = mysql.createConnection(database)

conection.connect((error) => {
  if (error) {
    throw error
  } else {
    console.log('Successful connection to DB')
  }
})

// Routes
// Configure routes (request, response)
app.get('/', (request, response) => {
  response.send('Ruta Home /')
})

// Show all articles
app.get('/api/articulos', (request, response) => {
  conection.query('SELECT * FROM articles', (error, rows) => {
    if (error) {
      throw error
    } else {
      response.send(rows)
    }
  })
})

// Show a article
app.get('/api/articulos/:id', (request, response) => {
  const { id } = request.params
  conection.query('SELECT * FROM articles WHERE id = ?', [id], (error, row) => {
    if (error) {
      throw error
    } else {
      response.send(row)
      // response.send(row[0].description)
    }
  })
})

// Create an article
app.post('/api/articulos', (request,response) => {
  const { description, price, stock } = request.body
  let data = {
    description,
    price,
    stock
  },
    sql = 'INSERT INTO articles SET ?'
  conection.query(sql, data, (error, results) => {
    if (error) {
      throw error
    } else {
      response.send(results)
    }
  })
})

// Update a article
app.put('/api/articulos/:id', (request, response) => {
  let { id } = request.params,
    { description, price, stock } = request.body
    sql = 'UPDATE articles SET description = ?, price = ?, stock = ? WHERE id = ?'

    // console.log(id, description, price, stock, request);
  conection.query(sql, [description, price, stock, id], (error, results) => {
    if (error) {
      throw error
    } else {
      response.send(results)
    }
  })
})

// Delete article
app.delete('/api/articulos/:id', (request, response) => {
  let { id } = request.params

  conection.query('DELETE FROM articles WHERE id = ?', [id], (error, request) => {
    if (error) {
      throw error
    } else {
      response.send(request)
    }
  })
})

// Starting the server
app.listen(app.get('port'), () => {
  console.log('Server Running in port:', app.get('port'))
})