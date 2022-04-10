import EventList from '../../components/events/eventList'

import { getAllEvents } from '../../dummy-data'

export default function EventsPage() {
  const events = getAllEvents()

  return (
    <div>
      <EventList events={events} />
    </div>
  )
}
