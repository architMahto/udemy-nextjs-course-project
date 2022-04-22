import { useContext } from 'react'

import classes from './notification.module.scss'
import NotificationContext from '../../contexts/notificationContext'

export default function Notification(props) {
  const { message, status, title } = props
  const { hideNotification } = useContext(NotificationContext)

  let statusClasses = ''

  if (status === 'success') {
    statusClasses = classes.success
  }

  if (status === 'error') {
    statusClasses = classes.error
  }

  if (status === 'pending') {
    statusClasses = classes.pending
  }

  const activeClasses = `${classes.notification} ${statusClasses}`

  return (
    <div className={activeClasses} onClick={hideNotification}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  )
}
