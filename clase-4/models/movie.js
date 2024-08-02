import { readJSON } from '../utils.js'
import { randomUUID } from 'node:crypto'

const movies = readJSON('./movies.json')

export class MovieModel {
  static async getAll ({ genre }) {
    if (genre) {
      const filteredMovies = movies.filter(movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase()))

      return filteredMovies
    }

    return movies
  }

  static async getById ({ id }) {
    const movie = movies.find(movie => movie.id === id)

    return movie
  }

  static async create ({ input }) {
    // en base de datos
    const newMovie = {
      id: randomUUID(), // uuid v4
      ...input // ❌ req.body
    }

    // Esto no seria REST, porque estamos guardando
    // el estado de la aplicacion en memoria
    movies.push(newMovie)

    return newMovie
  }

  static async delete ({ id }) {
    const movieIndex = movies.findIndex(movie => movie.id === id)

    if (movieIndex === -1) return false
    movies.splice(movieIndex, 1)

    return true
  }

  static async update ({ id, input }) {
    const movieIndex = movies.findIndex(movie => movie.id === id)

    if (movieIndex < 0) return false

    movies[movieIndex] = {
      ...movies[movieIndex],
      ...input
    }

    return movies[movieIndex]
  }
}
