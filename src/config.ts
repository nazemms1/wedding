import type { SiteConfig } from "./types/config";

export const config: SiteConfig = {
  meta: {
    title: "Joudi & Bisher | October 15, 2026",
    language: "en",
  },
  couple: {
    partner1: "Joudi",
    partner2: "Bisher",
    tagline: "We're getting married!",
  },
  message: {
    paragraphs: [
      "With hearts overflowing with joy and gratitude, we invite you to be part of our most cherished celebration.",
      "Your presence, laughter, and love have shaped who we are, and there is no one else we would rather have beside us as we begin this beautiful journey together.",
      "Please join us as we exchange our vows and celebrate the love that has brought us to this magical moment.",
    ],
    signature: "With all our love, Joudi & Bisher",
  },
  event: {
    weddingDate: "2026-05-03T21:00:00",
    displayDate: "Sunday, May 3st, 2026",
    displayTime: "7:00 PM",
  },
  venue: {
    name: "The Grand Rose Garden",
    address: "245 Blossom Lane, Beverly Hills, CA 90210",
    googleMapsEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.7152203733925!2d-118.41173172428956!3d34.07362807314878!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2bc04d6d147ab%3A0xd6c7c379fd081ed1!2sBeverly%20Hills%2C%20CA%2090210!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus",
    googleMapsLink: "https://maps.google.com/?q=Beverly+Hills+CA+90210",
  },
  closing: {
    message:
      "We can't wait to celebrate with you and create memories that will last a lifetime.",
    rsvpLink: "https://forms.google.com",
    hashtag: "#JoudiAndBisher2026",
  },
  gallery: {
    images: [
      {
        src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80",
        alt: "Couple walking together",
      },
      {
        src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80",
        alt: "Wedding rings",
      },
      {
        src: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80",
        alt: "Romantic moment",
      },
      {
        src: "https://images.unsplash.com/photo-1606216794079-73f76fbf9d7f?w=800&q=80",
        alt: "Couple portrait",
      },
    ],
  },
  video: {
    src: "/video/hero.mp4",
    poster:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1920&q=80",
  },
  sectionImages: {
    /** Envelope intro — soft bokeh garden / outdoor ceremony */
    envelope: "/wedding/envelope.jpeg",
    /** Couple section — romantic bokeh florals */
    couple: "/wedding/wedding-ring.jpeg",
    /** Message section — romantic blurred bokeh / soft florals */
    message: "/wedding/message.jpeg",
    /** Date section — outdoor ceremony chairs */
    date: "/wedding/date.jpeg",
    /** Venue section — grand ballroom */
    venue: "/wedding/venue.jpeg",
    /** Guestbook section — couple hands / ring detail */
    guestbook: "/wedding/guestbook.jpeg",
  },
};
