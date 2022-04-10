import { getFeaturedEvents } from '../dummy-data'
import EventList from '../components/events/eventList'

export default function Home() {
  const featuredEvents = getFeaturedEvents()

  return (
    <div>
      <EventList events={featuredEvents} />
    </div>
  )
}
