'use client'
import LocationIcon from 'assets/LocationIcon'
import Image from 'next/image'
import Link from 'next/link'
import { EventCategoryTitles, EventListing } from 'tests/mocks/events'

const EventCard: React.FC<{ eventListing: EventListing }> = ({
  eventListing,
}) => {
  const {
    // id,
    title,
    category,
    description,
    endDate,
    entryInfo,
    featurePhotoUrl,
    linkUrl,
    logoUrl,
    startDate,
  } = eventListing

  const startDateObj = new Date(startDate)
  const startDateDisplay =
    startDateObj < new Date()
      ? 'Now'
      : startDateObj.toLocaleDateString('en-US', {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
        })
  const endDateDisplay = new Date(endDate).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })

  const googleMapsLocationLink = `http://google.com/maps/search/${entryInfo.location
    .split(' ')
    .join('+')}`

  const dateRangeDisplay = `${startDateDisplay} through ${endDateDisplay}`

  return (
    <article className="flex flex-col border-gray-300 bg-gray-100 text-black p-1 md:rounded-lg md:border-2 md:flex-row">
      <div className="flex flex-col relative p-2">
        <span className="text-blue-600 font-bold text-sm mb-2">
          {EventCategoryTitles[category]}
        </span>
        <Image
          className="absolute right-8 top-2 rounded-lg shadow-lg border-2 border-gray-300"
          alt={title}
          height={75}
          loader={({ src }) => src}
          src={logoUrl}
          width={75}
        />
        <Link href={linkUrl} target={'_blank'}>
          <Image
            alt={title}
            className="rounded-xl shadow-md mb-2 w-full md:w-80"
            height={540}
            loader={({ src }) => src}
            src={featurePhotoUrl}
            width={720}
          />
        </Link>
      </div>
      <div className="flex flex-col flex-1">
        <span className="p-2 pb-0 font-bold">{title}</span>
        <div className="flex flex-1 flex-col md:flex-row">
          <div className="flex flex-col flex-1 text-xs p-2">
            <span className="font-bold">
              {startDateDisplay === endDateDisplay
                ? startDateDisplay
                : dateRangeDisplay}
            </span>
            <div className="flex flex-col flex-1">
              {description.map((block, i) => (
                <p key={i}>{block.text}</p>
              ))}
            </div>
            <div className="flex items-center gap-1 mt-2">
              <LocationIcon fill="#000" height="0.75rem" width="0.75rem" />
              <span>
                <Link
                  className="text-blue-600 hover:underline"
                  href={googleMapsLocationLink}
                  target={'_blank'}
                >
                  {entryInfo.location}
                </Link>{' '}
                / {entryInfo.price} / {entryInfo.time}
              </span>
            </div>
          </div>
          <div className="flex justify-center items-center p-2">
            <a
              className="bg-blue-600 p-3 w-16 flex justify-center font-bold text-white rounded-lg"
              href={linkUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              GO
            </a>
          </div>
        </div>
      </div>
    </article>
  )
}

export default EventCard
