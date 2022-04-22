import { Fragment } from 'react'
import Head from 'next/head'

import ErrorAlert from '../../components/common/errorAlert'
import EventContent from '../../components/eventDetails/eventContent'
import EventLogistics from '../../components/eventDetails/eventLogistics'
import EventSummary from '../../components/eventDetails/eventSummary'
import Comments from '../../components/input/comments'

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
      <Head>
        <title>{event.title}</title>
        <meta
          name='description'
          content={event.description}
        />
      </Head>
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
      <Comments eventId={event.id} />
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
