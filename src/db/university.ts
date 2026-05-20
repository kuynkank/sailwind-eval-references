export interface ClassScheduleEntry {
  id: number
  time: string
  course: string
  location: string
}

export interface DaySchedule {
  id: number
  day: string
  classes: ClassScheduleEntry[]
}

export interface SupportTeamMember {
  id: number
  name: string
  role: string
  avatarUrl: string
}

export interface NavItem {
  id: number
  label: string
  icon: string
  active: boolean
}

export interface GraduationRequirement {
  id: number
  label: string
  done: boolean
}

export interface QuickAccessLink {
  id: number
  label: string
}

const schedule: DaySchedule[] = [
  {
    id: 1,
    day: 'Monday',
    classes: [
      {
        id: 1,
        time: '9:00AM – 10:00AM',
        course: 'CS 3100 Data Structures & Algorithms II',
        location: 'Thompson 404',
      },
      {
        id: 2,
        time: '12:45PM – 2:15PM',
        course: 'CS 3205 HCI in Software Development',
        location: 'Flores A201',
      },
      {
        id: 3,
        time: '4:00PM – 5:30PM',
        course: 'CS 3701 Introduction to Cybersecurity',
        location: 'Orborne Hall',
      },
    ],
  },
  {
    id: 2,
    day: 'Tuesday',
    classes: [
      {
        id: 4,
        time: '10:15AM – 11:30AM',
        course: 'KOR 2020 Intermediate Korean II',
        location: 'Phillips 329',
      },
      {
        id: 5,
        time: '3:30PM – 4:45PM',
        course: 'CS 4710 Artificial Intelligence',
        location: 'Orborne Hall',
      },
    ],
  },
  {
    id: 3,
    day: 'Wednesday',
    classes: [
      {
        id: 6,
        time: '9:00AM – 10:00AM',
        course: 'CS 3100 Data Structures & Algorithms II',
        location: 'Thompson 404',
      },
      {
        id: 7,
        time: '12:45PM – 2:15PM',
        course: 'CS 3205 HCI in Software Development',
        location: 'Flores A201',
      },
      {
        id: 8,
        time: '4:00PM – 5:30PM',
        course: 'CS 3701 Introduction to Cybersecurity',
        location: 'Orborne Hall',
      },
    ],
  },
  {
    id: 4,
    day: 'Thursday',
    classes: [
      {
        id: 9,
        time: '10:15AM – 11:30AM',
        course: 'KOR 2020 Intermediate Korean II',
        location: 'Phillips 329',
      },
      {
        id: 10,
        time: '3:30PM – 4:45PM',
        course: 'CS 4710 Artificial Intelligence',
        location: 'Orborne Hall',
      },
    ],
  },
  {
    id: 5,
    day: 'Friday',
    classes: [],
  },
]

const navItems: NavItem[] = [
  { id: 1, label: 'Home', icon: 'Home', active: true },
  { id: 2, label: 'Classes', icon: 'GraduationCap', active: false },
  { id: 3, label: 'Health & Safety', icon: 'HeartHandshake', active: false },
  { id: 4, label: 'Housing & Residence Life', icon: 'Building2', active: false },
  { id: 5, label: 'Tuition & Financial Aid', icon: 'Landmark', active: false },
  { id: 6, label: 'Career Services', icon: 'Handshake', active: false },
]

const quickAccessLinks: QuickAccessLink[] = [
  { id: 1, label: 'Student Clinic Appointments' },
  { id: 2, label: 'Maintenance Request' },
  { id: 3, label: 'University Course Catalog' },
  { id: 4, label: 'Student Events Calendar' },
]

const graduationRequirements: GraduationRequirement[] = [
  { id: 1, label: 'Exceed minimum GPA', done: true },
  { id: 2, label: 'Maintain good standing', done: true },
  { id: 3, label: 'Complete required degree classes', done: false },
  { id: 4, label: 'Complete required electives', done: true },
]

const supportTeam: SupportTeamMember[] = [
  { id: 1, name: 'Marsha McCoy', role: 'Faculty Advisor', avatarUrl: '/images/avatar-marsha.jpg' },
  { id: 2, name: 'Praveen Sharma', role: 'Peer Advisor', avatarUrl: '/images/avatar-praveen.jpg' },
  { id: 3, name: 'Sara Vargas', role: 'Wellness Coach', avatarUrl: '/images/avatar-sara.jpg' },
]

export async function getSchedule(): Promise<DaySchedule[]> {
  return schedule
}

export async function getNavItems(): Promise<NavItem[]> {
  return navItems
}

export async function getQuickAccessLinks(): Promise<QuickAccessLink[]> {
  return quickAccessLinks
}

export async function getSupportTeam(): Promise<SupportTeamMember[]> {
  return supportTeam
}

export async function getGraduationRequirements(): Promise<GraduationRequirement[]> {
  return graduationRequirements
}
