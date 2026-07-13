/**
 * Mock users for prototyping.
 *
 * In Appian, User is a built-in system record type — you don't create it.
 * Custom record types form MANY_TO_ONE relationships to it.
 *
 * User-reference fields in entity modules (like `assignee`, `createdBy`)
 * store a username string. Use the usernames below as values in seed data.
 */

export interface MockUser {
  username: string
  displayName: string
  initials: string
  avatarUrl: string
}

export const mockUsers: MockUser[] = [
  { username: 'karen.anderson', displayName: 'Karen Anderson', initials: 'KA', avatarUrl: '/images/avatar-karen.jpg' },
  {
    username: 'marsha.mccoy',
    displayName: 'Marsha McCoy',
    initials: 'MM',
    avatarUrl: '/images/avatar-marsha.jpg',
  },
  {
    username: 'praveen.sharma',
    displayName: 'Praveen Sharma',
    initials: 'PS',
    avatarUrl: '/images/avatar-praveen.jpg',
  },
  {
    username: 'sara.vargas',
    displayName: 'Sara Vargas',
    initials: 'SV',
    avatarUrl: '/images/avatar-sara.jpg',
  },
]

/** Look up a display name from a username */
export function getDisplayName(username: string): string {
  const user = mockUsers.find((u) => u.username === username)
  return user?.displayName ?? username
}

/** Look up initials from a username */
export function getInitials(username: string): string {
  const user = mockUsers.find((u) => u.username === username)
  return user?.initials ?? username.slice(0, 2).toUpperCase()
}

/** Look up avatar URL from a username */
export function getAvatarUrl(username: string): string {
  const user = mockUsers.find((u) => u.username === username)
  return user?.avatarUrl ?? ''
}
