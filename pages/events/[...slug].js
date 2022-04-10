import { Fragment } from 'react'
import { useRouter } from 'next/router'

import Button from '../../components/common/button'
import ErrorAlert from '../../components/errorAlert/errorAlert'
import EventList from '../../components/events/eventList'
import ResultsTitle from '../../components/resultsTitle/resultsTitle'

import { getFilteredEvents } from '../../dummy-data'

export default function FitleredEventsPage() {
  const { query: { slug: filterData } } = useRouter()

  if (!filterData) {
    return (<p className='center'>Loading...</p>)
  }

  const [ year, month ] = filterData

  if (
    isNaN(year) ||
    isNaN(month) ||
    +year > 2030 ||
    +year < 2021 ||
    +month < 1 ||
    +month > 12
  ) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className='center'>
          <Button url='/events'>Show All Events</Button>
        </div>
      </Fragment>
    )
  }

  const filteredEvents = getFilteredEvents({ year: +year, month: +month })

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
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
      <ResultsTitle date={new Date(+year, +month - 1)} />
      <EventList events={filteredEvents} />
    </Fragment>
  )
}
