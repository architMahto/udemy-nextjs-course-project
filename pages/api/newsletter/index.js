import { connectDatabase, insertDocument } from '../../../helpers/dbUtil'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const userEmail = req.body.email

    if (!userEmail || !userEmail.includes('@')) {
      res.status(422).json({ message: 'Invalid email address.'})
      return
    }

    try {
      const client = await connectDatabase()
      await insertDocument(client, 'newsletters', { email: userEmail })

      client.close()
    } catch (err) {
      res.status(500).json({ message: 'Failure in registering for newsletter' })
      return
    }

    res.status(201).json({ message: 'Successfully registered for newsletter' })
  }
}
