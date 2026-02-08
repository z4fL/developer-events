export interface EventItem {
  image: string
  title: string
  slug: string
  location: string
  date: string
  time: string
}

export const events: EventItem[] = [
  {
    image: '/images/event1.png',
    title: 'React Summit 2026',
    slug: 'react-summit-2026',
    location: 'Amsterdam, Netherlands',
    date: 'May 12, 2026',
    time: '9:00 AM - 5:00 PM',
  },
  {
    image: '/images/event2.png',
    title: 'Google I/O 2026',
    slug: 'google-io-2026',
    location: 'Mountain View, CA, USA',
    date: 'May 19, 2026',
    time: '10:00 AM - 6:00 PM',
  },
  {
    image: '/images/event3.png',
    title: 'HackMIT 2026',
    slug: 'hackmit-2026',
    location: 'Cambridge, MA, USA',
    date: 'November 7, 2026',
    time: '48 hours',
  },
  {
    image: '/images/event4.png',
    title: 'PyCon US 2026',
    slug: 'pycon-us-2026',
    location: 'Salt Lake City, UT, USA',
    date: 'April 8, 2026',
    time: '9:00 AM - 5:00 PM',
  },
  {
    image: '/images/event5.png',
    title: 'DockerCon 2026',
    slug: 'dockercon-2026',
    location: 'San Francisco, CA, USA',
    date: 'September 15, 2026',
    time: '9:00 AM - 4:30 PM',
  },
  {
    image: '/images/event6.png',
    title: 'DevOps Day SF 2026',
    slug: 'devops-day-sf-2026',
    location: 'San Francisco, CA, USA',
    date: 'March 20, 2026',
    time: '6:30 PM - 9:00 PM',
  },
]

export default events
