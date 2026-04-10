export interface SiteConfig {
  meta: {
    title: string
    language: string
  }
  couple: {
    partner1: string
    partner2: string
    tagline: string
  }
  branding: {
   
    openingLine: string | null
 
    verse: string | null
 
    verseFont: string
  }
  message: {
    paragraphs: string[]
    signature: string
  }
  event: {
    weddingDate: string
    displayDate: string
    displayTime: string
  }
  venue: {
    name: string
    address: string
    googleMapsEmbedUrl: string
    googleMapsLink: string
  }
  closing: {
    message: string
    rsvpLink: string
    hashtag: string
  }
  gallery: {
    images: GalleryImage[]
  }
  video: {
    src: string
    poster: string
  }
  sectionImages: {
    envelope: string
    couple: string
    message: string
    date: string
    venue: string
    guestbook: string
    engagment: string
  }
   
  guestbook: {
    seedMessages: Array<{ name: string; message: string }>
  }
}

export interface GalleryImage {
  src: string
  alt: string
}
