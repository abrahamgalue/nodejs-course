import mysql from 'mysql2/promise'

const config = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '1234',
  database: 'moviesdb'
}

const connection = await mysql.createConnection(config)

export class MovieModel {
  static async getAll ({ genre }) {
    if (genre) {
      const lowerCaseGenre = genre.toLowerCase()

      const [genres] = await connection.query(
        'SELECT id, name FROM genre WHERE LOWER(name) = ?',
        [lowerCaseGenre]
      )

      if (genres.length === 0) {
        return { message: 'Genre not found' }
      }

      const [{ id }] = genres

      const [movies] = await connection.query(
        'SELECT BIN_TO_UUID(m.id) AS id, m.title, m.year, m.director, m.duration, m.poster, m.rate, g.name AS genre FROM movie AS m INNER JOIN movie_genre AS mg ON m.id = mg.movie_id INNER JOIN genre AS g ON mg.genre_id = g.id WHERE g.id = ?;',
        [id]
      )

      return movies
    }

    const [movies] = await connection.query('SELECT BIN_TO_UUID(id) id, title, year, director, duration, poster, rate FROM movie;')

    return movies
  }

  static async getById ({ id }) {
    try {
      const [movie] = await connection.query(
        'SELECT BIN_TO_UUID(id) id, title, year, director, duration, poster, rate FROM movie WHERE id = UUID_TO_BIN(?);',
        [id])

      if (movie.length === 0) return null

      return movie[0]
    } catch (e) {
      return null
    }
  }

  static async create ({ input }) {

  }

  static async delete ({ id }) {

  }

  static async update ({ id, input }) {

  }
}
