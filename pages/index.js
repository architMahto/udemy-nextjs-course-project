import { getFeaturedEvents } from '../helpers/apiUtil'
import EventList from '../components/events/eventList'

export default function Home(props) {
  const { featuredEvents } = props

  return (
    <div>
      <EventList events={featuredEvents} />
    </div>
  )
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents()
  return {
    props: {
      featuredEvents
    }
  }
}
