import express from 'express'
import { PORT } from './config.js'
import { UserRepository } from './user-repository.js'

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
  res.send('<h1>Hola Abraham nodejs</h1>')
})

app.post('/login', async (req, res) => {
  const { username, password } = req.body

  try {
    const user = await UserRepository.login({ username, password })
    res.send({ user })
  } catch (e) {
    res.status(401).send(e.message)
  }
})

app.post('/register', async (req, res) => {
  const { username, password } = req.body

  try {
    const id = await UserRepository.create({ username, password })
    res.send({ id })
  } catch (e) {
    res.status(400).send(e.message)
  }
})

app.post('/logout', (req, res) => {

})

app.get('/protected', (req, res) => {

})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
