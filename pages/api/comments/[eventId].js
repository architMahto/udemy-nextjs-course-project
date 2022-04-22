import { connectDatabase, insertDocument, getAllDocuments } from '../../../helpers/dbUtil'

export default async function handler(req, res) {
  const client = await connectDatabase()

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
      return
    }

    const newComment = {
      email,
      name,
      text,
      eventId
    }

    const result = await insertDocument(client, 'comments', newComment)
    newComment.id = result.id

    res.status(201).json({ message: 'Successfully posted a comment ', comment: newComment })
  }

  if (req.method === 'GET') {
    const result = await getAllDocuments(client, 'comments', { _id: -1 }, { eventId })

    res.status(200).json({ message: 'Successfully retrieved comments ', comments: result })
  }

  client.close()
}
