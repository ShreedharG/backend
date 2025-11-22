require('dotenv').config()

const express = require('express')

const app = express()
const port =  process.env.PORT || 4000; 

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/linkedin', (req, res) => {
    res.send('shreedharlinkedin')
})

app.get('/login', (req, res) => {
    res.send('<h1>Please login to our page</h1>')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})