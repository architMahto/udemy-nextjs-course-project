import Button from '../common/button'

import AddressIcon from '../icons/addressIcon'
import ArrowRightIcon from '../icons/arrowRightIcon'
import DateIcon from '../icons/dateIcon'

import classes from './eventItem.module.scss'

export default function EventItem(props) {
  const {
    event: {
      title,
      image,
      date,
      location,
      id
    }
  } = props

  const humanReadableDate = new Date(date).toLocaleDateString('en-CA', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
  const formattedAddress = location.replace(', ', '\n')
  const exploreLink = `/events/${id}`

  return (
    <li className={classes.item}>
      <img src={`/${image}`} alt={title} />
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{title}</h2>
          <div className={classes.date}>
            <DateIcon />
            <time>{humanReadableDate}</time>
          </div>
          <div className={classes.address}>
            <AddressIcon />
            <address>{formattedAddress}</address>
          </div>
        </div>
        <div className={classes.actions}>
          <Button url={exploreLink}>
            <span>Explore Event</span>
            <span className={classes.icon}>
              <ArrowRightIcon />
            </span>
          </Button>
        </div>
      </div>
    </li>
  )
}
