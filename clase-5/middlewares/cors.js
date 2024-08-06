import cors from 'cors'

const ACCEPTED_ORIGINS = [
  'http://localhost:1234',
  'http://localhost:8080',
  'http://localhost:3000',
  'https://movies.com'
]

/*
Metodos normales: GET/HEAD/POST
Metodos complejos: PUT/PATCH/DELETE

CORS PRE-Flight
OPTIONS

Lo hace el middleware cors

app.options('/movies/:id', (req, res) => {
  const origin = req.header('origin')

  // Cuando la peticion es del mismo origin
  // http://localhost:1234 => http://localhost:1234
  if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    res.header('Access-Control-Allow-Origin', origin)
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
  }
  res.sendStatus(200)
})
*/

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) => cors({
  origin: (origin, callback) => {
    if (acceptedOrigins.indexOf(origin) !== -1) {
      return callback(null, true)
    }

    if (!origin) {
      return callback(null, true)
    }

    return callback(new Error('Not allowed by CORS'))
  }
}
)
