import Head from 'next/head'

import { getFeaturedEvents } from '../helpers/apiUtil'
import EventList from '../components/events/eventList'
import NewsletterRegistration from '../components/input/newsletterRegistration'

export default function Home(props) {
  const { featuredEvents } = props

  return (
    <div>
      <Head>
        <title>NextJS Events</title>
        <meta
          name='description'
          content='Find a lot of great events that allow you to evolve'
        />
      </Head>
      <NewsletterRegistration />
      <EventList events={featuredEvents} />
    </div>
  )
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents()

  return {
    props: { featuredEvents },
    revalidate: 1800
  }
}
