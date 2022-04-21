import LogisticsItem from './logisticsItem';

import AddressIcon from '../icons/addressIcon'
import DateIcon from '../icons/dateIcon'

import classes from './eventLogistics.module.scss';

export default function EventLogistics(props) {
  const { address, date, imageSrc, imageAlt } = props

  const humanReadableDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const addressText = address?.replace(', ', '\n');

  return (
    <section className={classes.logistics}>
      <div className={classes.image}>
        <img src={`/${imageSrc}`} alt={imageAlt} />
      </div>
      <ul className={classes.list}>
        <LogisticsItem icon={DateIcon}>
          <time>{humanReadableDate}</time>
        </LogisticsItem>
        <LogisticsItem icon={AddressIcon}>
          <address>{addressText}</address>
        </LogisticsItem>
      </ul>
    </section>
  );
}
