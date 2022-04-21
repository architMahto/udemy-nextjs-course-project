import { Fragment } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

import EventList from '../../components/events/eventList'
import EventsSearch from '../../components/events/eventsSearch'

import { getAllEvents } from '../../helpers/apiUtil'

export default function EventsPage(props) {
  const { events } = props
  const { push } = useRouter()

  function searchHandler(year, month) {
    const fullPath = `/events/${year}/${month}`
    push(fullPath)
  }

  return (
    <Fragment>
      <Head>
        <title>All Events</title>
        <meta
          name='description'
          content='Find a lot of great events that allow you to evolve'
        />
      </Head>
      <EventsSearch onSearch={searchHandler} />
      <EventList events={events} />
    </Fragment>
  )
}

export async function getStaticProps() {
  const events = await getAllEvents()

  return {
    props: { events },
    revalidate: 60
  }
}
