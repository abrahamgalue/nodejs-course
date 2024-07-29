const express = require('express')
const crypto = require('node:crypto')
const movies = require('./movies.json')

const app = express()
app.use(express.json())
app.disable('x-powered-by')

app.get('/', (req, res) => {
  res.json({ message: 'hola mundo' })
})

app.get('/movies', (req, res) => {
  const { genre } = req.query
  if (genre) {
    const filteredMovies = movies.filter(movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase()))

    return res.json(filteredMovies)
  }
  res.json(movies)
})

app.get('/movies/:id', (req, res) => {
  const { id } = req.params

  const movie = movies.find(movie => movie.id === id)

  if (movie) return res.json(movie)

  res.status(404).json({ message: 'Movie not found' })
})

app.post('/movies', (req, res) => {
  const {
    title,
    genre,
    year,
    director,
    duration,
    rate,
    poster
  } = req.body

  const newMovie = {
    id: crypto.randomUUID(), // uuid v4
    title,
    genre,
    year,
    director,
    duration,
    rate: rate ?? 0,
    poster
  }

  // Esto no seria REST, porque estamos guardando
  // el estado de la aplicacion en memoria
  movies.push(newMovie)

  res.status(201).json(newMovie) // actualizar la cache del cliente
})

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})
