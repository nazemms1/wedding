import type { SiteConfig } from "../../types/config";

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

  branding: {
    openingLine: "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ",
    verse:
      "﴿ وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ﴾",
    verseFont: "'Scheherazade New', 'Noto Naskh Arabic', serif",
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
      "https://maps.google.com/maps?q=33.49735850955281,36.249302772151715&z=16&output=embed",
    googleMapsLink: "https://www.google.com/maps?q=33.49735850955281,36.249302772151715",
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
    envelope: "/wedding/envelope.jpeg",
    couple: "/wedding/wedding-ring.jpeg",
    message: "/wedding/message.jpeg",
    date: "/wedding/date.jpeg",
    venue: "/wedding/venue.jpeg",
    guestbook: "/wedding/guestbook.jpeg",
    engagment: "/wedding/B-J.jpeg",
  },

  guestbook: {
    seedMessages: [
      {
        name: "Sarah & Mark",
        message:
          "Wishing you both a lifetime of happiness and endless adventures together. So thrilled to celebrate you!",
      },
      {
        name: "The Johnson Family",
        message:
          "May your love grow stronger with every passing year. Congratulations to the most beautiful couple!",
      },
    ],
  },
};
