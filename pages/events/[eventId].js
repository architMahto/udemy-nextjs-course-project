import { Fragment } from 'react'

import ErrorAlert from '../../components/errorAlert/errorAlert'
import EventContent from '../../components/eventDetails/eventContent'
import EventLogistics from '../../components/eventDetails/eventLogistics'
import EventSummary from '../../components/eventDetails/eventSummary'

import { getEventById, getFeaturedEvents } from '../../helpers/apiUtil'

export default function EventPage(props) {
  const { selectedEvent: event } = props

  if (!event) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No event found!</p>
        </ErrorAlert>
      </Fragment>
    )
  }

  return (
    <Fragment>
      <EventSummary title={event.title} />
      <EventLogistics
        address={event.location}
        date={event.date}
        imageAlt={event.title}
        imageSrc={event.image}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  )
}

export async function getStaticPaths() {
  const events = await getFeaturedEvents()
  const paths = events.map((event) => ({ params: { eventId: event.id } }))

  return { paths, fallback: 'blocking' }
}

export async function getStaticProps(context) {
  const eventId = context.params.eventId
  const selectedEvent = await getEventById(eventId)

  return {
    props: { selectedEvent },
    revalidate: 30
  }
}
