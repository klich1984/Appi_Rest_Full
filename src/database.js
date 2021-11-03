mysql = require('mysql'),
{ database } = require('./keys')

const conection = mysql.createConnection(database)

conection.connect((error) => {
  if (error) {
    throw error
  } else {
    console.log('Successful connection to DB')
  }
})
module.exports = conection
