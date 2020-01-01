import fetch from 'isomorphic-unfetch'

export default async (req, res) => {
  if (!('authorization' in req.headers)) {
    res.setHeader('WWW-Authenticate', 'Basic realm="basic auth required"')
    return res.status(401).json('{ message: Authorization header missing }')
  }

  const auth = await req.headers.authorization

  try {
    const url = `https://image.rugamaga.dev/${req.url}`

    const response = await fetch(url, {
      headers: {
        authorization: auth
      }
    })

    if (!response.ok) {
      const error = new Error(response.statusText)
      error.response = response
      throw error
    }

    const body = await response.body
    res.setHeader('Content-Type', response.headers.get('Content-Type'))
    return res.status(200).send(body)
  } catch (error) {
    const { response } = error
    return response
      ? res.status(response.status).json({ message: response.statusText })
      : res.status(400).json({ message: error.message })
  }
}
