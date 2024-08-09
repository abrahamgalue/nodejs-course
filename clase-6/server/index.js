import express from 'express'

const port = process.env.PORT ?? 3000

const app = express()

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/client/index.html')
})

app.listen(port, () => {
  console.log(`server listening on port http://localhost:${port}`)
})
