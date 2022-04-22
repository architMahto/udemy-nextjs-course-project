import classes from './commentList.module.scss'

export default function CommentList(props) {
  const { comments } = props

  return (
    <ul className={classes.comments}>
      {comments.map(comment => (
        <li key={comment.id}>
          {' '}
          <p>{comment.text}</p>
          <div>
            By <address>{comment.name}</address>
          </div>
        </li>
      ))}
    </ul>
  )
}
