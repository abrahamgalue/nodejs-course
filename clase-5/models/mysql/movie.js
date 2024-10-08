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
    const {
      title,
      year,
      director,
      duration,
      poster,
      rate
    } = input

    const [uuidResult] = await connection.query('SELECT UUID() uuid;')
    const [{ uuid }] = uuidResult

    try {
      await connection.query(`INSERT INTO movie (id, title, year, director, duration, poster, rate) 
        VALUES (UUID_TO_BIN("${uuid}"), ?, ?, ?, ?, ?, ?);`,
      [title, year, director, duration, poster, rate])
    } catch (e) {
      throw new Error('Error to create Movie')
    }

    const [movies] = await connection.query('SELECT BIN_TO_UUID(id) id, title, year, director, duration, poster, rate FROM movie WHERE id = UUID_TO_BIN(?);',
      [uuid])

    return movies[0]
  }

  static async delete ({ id }) {
    try {
      await connection.query('DELETE FROM movie WHERE id = UUID_TO_BIN(?)', [id])
    } catch (e) {
      return false
    }

    return true
  }

  static async update ({ id, input }) {
    let sentence = ''
    try {
      const keys = Object.keys(input)

      sentence = keys.map(key => `${key} = '${input[key]}'`).join(', ')
    } catch (e) {
      return false
    }

    try {
      await connection.query(`UPDATE movie SET ${sentence} WHERE id = UUID_TO_BIN(?)`, [id])
    } catch (e) {
      return false
    }

    const [movie] = await connection.query(
      'SELECT BIN_TO_UUID(id) id, title, year, director, duration, poster, rate FROM movie WHERE id = UUID_TO_BIN(?);',
      [id])

    if (movie.length === 0) return false

    return movie[0]
  }
}
