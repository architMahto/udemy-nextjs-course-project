import { connectDatabase, insertDocument } from '../../../helpers/dbUtil'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const userEmail = req.body.email

    if (!userEmail || !userEmail.includes('@')) {
      res.status(422).json({ message: 'Invalid email address.'})
      return
    }


    const client = await connectDatabase()

    await insertDocument(client, 'newsletters', { email: userEmail })

    client.close()


    res.status(201).json({ message: 'Successfully registered for newsletter' })
  }
}
