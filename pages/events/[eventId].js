import { Fragment } from 'react'
import { useRouter } from 'next/router'

import EventContent from '../../components/eventDetails/eventContent'
import EventLogistics from '../../components/eventDetails/eventLogistics'
import EventSummary from '../../components/eventDetails/eventSummary'

import { getEventById } from '../../dummy-data'

export default function EventPage() {
  const { query: { eventId } } = useRouter()
  const event = getEventById(eventId)

  if (!event) {
    return (<p>No event found!</p>)
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
