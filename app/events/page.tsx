import EventCard from '@/components/organisms/EventCard'
import { FC } from 'react'
import {
  EventListing, // type
  EventSections, // type
  mockEventsResponse, // mock data
} from 'tests/mocks/events'

const EventList: FC<{
  title: string
  eventList: EventListing[]
}> = ({ title, eventList }) => {
  return (
    <div>
      <h2 className="flex items-center text-2xl font-bold my-4 after:flex-1 after:content-[''] after:border after:border-blue-600 after:h-0 after:mx-2">
        {title}
      </h2>
      <section className="flex flex-col gap-0.5 md:gap-4">
        {eventList.map((eventListing) => (
          <EventCard eventListing={eventListing} key={eventListing.id} />
        ))}
      </section>
    </div>
  )
}

const Page = () => {
  const {
    [EventSections.HappeningThisWeek]: happeningThisWeekEvents,
    [EventSections.HappeningToday]: happeningTodayEvents,
    [EventSections.PlanAhead]: planAheadEvents,
  } = mockEventsResponse
  return (
    <main className="max-w-4xl md:p-8 pt-0">
      {happeningTodayEvents.length > 0 ? (
        <EventList title="HAPPENING TODAY" eventList={happeningTodayEvents} />
      ) : null}
      {happeningThisWeekEvents.length > 0 ? (
        <EventList
          title="HAPPENING THIS WEEK"
          eventList={happeningThisWeekEvents}
        />
      ) : null}
      {planAheadEvents.length > 0 ? (
        <EventList title="PLAN AHEAD" eventList={planAheadEvents} />
      ) : null}
    </main>
  )
}

export default Page
