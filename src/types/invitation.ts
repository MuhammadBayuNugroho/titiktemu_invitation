export interface TemplateColors {
  primary: string
  secondary: string
  background: string
  foreground: string
  accent: string
}

export interface TemplateTypography {
  heading: 'serif' | 'sans'
  body: 'serif' | 'sans'
}

export interface TemplateConfig {
  id?: string
  slug: string
  name: string
  description?: string
  colors: TemplateColors
  typography: TemplateTypography
  sections: string[]
  animationStyle?: string
  ornamentStyle?: string
}

export interface CoupleData {
  brideName: string
  brideFullName: string
  brideParentNames: string
  brideSocial?: string
  groomName: string
  groomFullName: string
  groomParentNames: string
  groomSocial?: string
}

export interface EventSchedule {
  date: string
  startTime: string
  endTime: string
}

export interface EventData {
  eventDate: string
  timezone: string
  akad: EventSchedule
  reception: EventSchedule
  venueName: string
  venueAddress: string
  latitude?: number
  longitude?: number
  mapsUrl?: string
}

export interface MediaData {
  coverImageUrl?: string
  musicUrl?: string
  gallery: Array<{
    id?: string
    url: string
    sortOrder: number
  }>
}

export interface StoryItem {
  id?: string
  year?: string
  title: string
  story: string
  imageUrl?: string
  sortOrder: number
}

export interface GiftItem {
  id?: string
  giftType: 'bank' | 'ewallet'
  providerName: string
  accountNumber: string
  accountName: string
}

export interface InvitationData {
  id?: string
  slug: string
  templateSlug: string
  title: string
  openingText?: string
  couple: CoupleData
  event: EventData
  media: MediaData
  stories: StoryItem[]
  gifts: GiftItem[]
  status: 'draft' | 'pending_payment' | 'paid' | 'published' | 'unpublished'
}

export interface GuestData {
  id?: string
  name: string
  phone?: string
  category: 'family' | 'friend' | 'coworker' | 'organization' | 'other'
  token: string
}

export interface RSVPInput {
  invitationId: string
  guestId?: string
  name: string
  attendance: 'hadir' | 'tidak_hadir' | 'masih_ragu'
  guestCount: number
  message?: string
}

export interface WishInput {
  invitationId: string
  name: string
  message: string
}
