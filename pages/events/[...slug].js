import { Fragment } from 'react'
import Head from 'next/head'

import Button from '../../components/common/button'
import ErrorAlert from '../../components/common/errorAlert'
import EventList from '../../components/events/eventList'
import ResultsTitle from '../../components/events/resultsTitle'

import { getFilteredEvents } from '../../helpers/apiUtil'

export default function FitleredEventsPage(props) {
  const { filteredEvents, hasError, numMonth, numYear } = props

  const pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      <meta
        name='description'
        content={`All events for ${numMonth}/${numYear}`}
      />
    </Head>
  )

  if (hasError) {
    return (
      <Fragment>
        {pageHeadData}
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className='center'>
          <Button url='/events'>Show All Events</Button>
        </div>
      </Fragment>
    )
  }

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        {pageHeadData}
        <ErrorAlert>
          <p>No events found</p>
        </ErrorAlert>
        <div className='center'>
          <Button url='/events'>Show All Events</Button>
        </div>
      </Fragment>
    )
  }

  return (
    <Fragment>
      {pageHeadData}
      <ResultsTitle date={new Date(numYear, numMonth - 1)} />
      <EventList events={filteredEvents} />
    </Fragment>
  )
}

export async function getServerSideProps(context) {
  const { params } = context

  const { slug: filterData } = params
  const [ year, month ] = filterData
  const numYear = +year
  const numMonth = +month

  if (
    isNaN(year) ||
    isNaN(month) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return {
      props: { hasError: true }
    }
  }

  const filteredEvents = await getFilteredEvents({ year: numYear, month: numMonth })

  return {
    props: { filteredEvents, numMonth, numYear }
  }
}
