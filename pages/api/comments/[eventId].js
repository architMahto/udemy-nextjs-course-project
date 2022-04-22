import { connectDatabase, insertDocument, getAllDocuments } from '../../../helpers/dbUtil'

export default async function handler(req, res) {
  let client
  try {
    client = await connectDatabase()
  } catch (err) {
    res.status(500).json({ message: 'Failure in connecting to database' })
    return
  }

  if (req.method === 'POST') {
    const { eventId } = req.query
    const { email, name, text } = req.body

    if (
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !text ||
      text.trim() === ''
    ) {
      res.status(422).json({ message: 'Invalid input. '})
      client.close()
      return
    }

    try {
      const newComment = {
        email,
        name,
        text,
        eventId
      }

      const result = await insertDocument(client, 'comments', newComment)
      newComment.id = result.id

      res.status(201).json({ message: 'Successfully posted a comment ', comment: newComment })
    } catch (err) {
      res.status(500).json({ message: 'Failure in entering comment' })
    }
  }

  if (req.method === 'GET') {
    try {
      const result = await getAllDocuments(client, 'comments', { _id: -1 }, { eventId })
      res.status(200).json({ message: 'Successfully retrieved comments ', comments: result })
    } catch (err) {
      res.status(500).json({ message: 'Failure in retrieving comment' })
    }
  }

  client.close()
}
