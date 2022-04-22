import { Fragment, useContext } from 'react'

import MainHeader from './mainHeader'
import Notification from '../common/notification'

import NotificationContext from '../../contexts/notificationContext'

export default function Layout(props) {
  const { children } = props
  const { notification: activeNotification } = useContext(NotificationContext)

  return (
    <Fragment>
      <MainHeader />
      <main>{children}</main>
      {activeNotification && (
        <Notification
          title={activeNotification.title}
          message={activeNotification.message}
          status={activeNotification.status}
        />
      )}
    </Fragment>
  )
}
