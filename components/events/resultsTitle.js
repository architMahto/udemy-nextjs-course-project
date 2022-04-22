import Button from '../common/button'

import classes from './resultsTitle.module.scss'

export default function ResultsTitle(props) {
  const { date } = props

  const humanReadableDate = new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  })

  return (
    <section className={classes.title}>
      <h1>Events in {humanReadableDate}</h1>
      <Button url='/events'>Show all events</Button>
    </section>
  )
}
