const express = require('express')
const app = express()
const { PORT = 8080 } = process.env

console.log('PORT' , PORT)

app.get('/', (req, res) => res.send('Hello world!'))

app.listen(PORT, () =>
      console.log('Example app listing at http:// :${PORT}')
)