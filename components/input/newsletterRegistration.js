import { useRef, useContext } from 'react'
import NotificationContext from '../../contexts/notificationContext'
import classes from './newsletterRegistration.module.scss'

export default function NewsletterRegistration() {
  const emailInputRef = useRef()
  const { showNotification } = useContext(NotificationContext)

  function registrationHandler(event) {
    event.preventDefault()

    const enteredEmail = emailInputRef.current.value

    showNotification({
      title: 'Signing up...',
      message: 'Registering for newsletter.',
      status: 'pending'
    })

    fetch('/api/newsletter', {
      method: 'POST',
      body: JSON.stringify({ email: enteredEmail }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json()
        }

        respsonse.json().then(data => {
          throw new Error(data.message || 'Something went wrong!')
        })
      })
      .then(() => {
        showNotification({
          title: 'Success!',
          message: 'Successfully registered for newsletter.',
          status: 'success'
        })
      })
      .catch(error => {
        const { message } = error

        showNotification({
          title: 'Error!',
          message: message || 'Something went wrong!',
          status: 'error'
        })
      })
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type='email'
            id='email'
            placeholder='Your email'
            aria-label='Your email'
            ref={emailInputRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  )
}
