import { useEffect, useState } from 'react'

import CommentList from './commentList'
import NewComment from './newComment'

import classes from './comments.module.scss'

export default function Comments(props) {
  const { eventId } = props

  const [ showComments, setShowComments ] = useState(false)
  const [ comments, setComments ] = useState([])

  useEffect(() => {
    if (showComments) {
      fetch(`/api/comments/${eventId}`)
        .then(response => response.json())
        .then((data) => {
          setComments(data.comments)
        })
    }
  }, [showComments, eventId])

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus)
  }

  function addCommentHandler(commentData) {
    fetch(`/api/comments/${eventId}`, {
      method: 'POST',
      body: JSON.stringify({ ...commentData }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => console.log('data:', data))
  }

  if (!comments) {
    return (<p>Loading...</p>)
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList comments={comments} />}
    </section>
  )
}
