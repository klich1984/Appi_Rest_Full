const express = require('express'),
  router = express.Router()

// import conection mysql
const db_conection = require('../database')

// Routes
// Configure routes
router.get('/', (request, response) => {
  response.send('Ruta Home /')
})

// Show all articles
router.get('/api/articulos', (request, response) => {
  db_conection.query('SELECT * FROM articles', (error, rows) => {
    if (error) {
      throw error
    } else {
      response.send(rows)
    }
  })
})

// Show a article
router.get('/api/articulos/:id', (request, response) => {
  const { id } = request.params
  db_conection.query('SELECT * FROM articles WHERE id = ?', [id], (error, row) => {
    if (error) {
      throw error
    } else {
      response.send(row)
      // response.send(row[0].description)
    }
  })
})

// Create an article
router.post('/api/articulos', (request,response) => {
  const { description, price, stock } = request.body
  let data = {
    description,
    price,
    stock
  },
    sql = 'INSERT INTO articles SET ?'
  db_conection.query(sql, data, (error, results) => {
    if (error) {
      throw error
    } else {
      response.send(results)
    }
  })
})

// Update a article
router.put('/api/articulos/:id', (request, response) => {
  let { id } = request.params,
    { description, price, stock } = request.body
    sql = 'UPDATE articles SET description = ?, price = ?, stock = ? WHERE id = ?'

    // console.log(id, description, price, stock, request);
  db_conection.query(sql, [description, price, stock, id], (error, results) => {
    if (error) {
      throw error
    } else {
      response.send(results)
    }
  })
})

// Delete article
router.delete('/api/articulos/:id', (request, response) => {
  let { id } = request.params

  db_conection.query('DELETE FROM articles WHERE id = ?', [id], (error, request) => {
    if (error) {
      throw error
    } else {
      response.send(request)
    }
  })
})

module.exports = router
