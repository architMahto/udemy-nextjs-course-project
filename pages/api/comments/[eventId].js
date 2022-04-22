export default function handler(req, res) {
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
      id: new Date().toISOString(),
      email,
      name,
      text
    }

    res.status(201).json({ message: 'Successfully posted a comment ', comment: newComment })
  }

  if (req.method === 'GET') {
    const commentList = [
      { id: 'c1', name: 'Max', text: 'A first comment!' },
      { id: 'c2', name: 'Manuel', text: 'A second comment!' },
    ]
    res.status(200).json({ message: 'Successfully retrieved comments ', comments: commentList })
  }
}
