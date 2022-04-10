import { Fragment } from 'react'
import { useRouter } from 'next/router'

import EventList from '../../components/events/eventList'
import EventsSearch from '../../components/events/eventsSearch'

import { getAllEvents } from '../../dummy-data'

export default function EventsPage() {
  const events = getAllEvents()
  const { push } = useRouter()

  function searchHandler(year, month) {
    const fullPath = `/events/${year}/${month}`
    push(fullPath)
  }

  return (
    <Fragment>
      <EventsSearch onSearch={searchHandler} />
      <EventList events={events} />
    </Fragment>
  )
}
