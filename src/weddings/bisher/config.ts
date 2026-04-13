import type { SiteConfig } from "../../types/config";

export const config: SiteConfig = {
  meta: {
    title: "بشر وجودي | ٣٠ أبريل ٢٠٢٦",
    language: "ar",
  },

  couple: {
    partner1: "جودي",
    partner2: "بشر",
    tagline: "نحتفل بزفافنا",
  },
 

  message: {
    paragraphs: [
      "بقلوب مفعمة بالبهجة والامتنان، يسعدنا دعوتكم لتكونوا شهوداً على بداية رحلتنا الجميلة.",
      "حضوركم ومحبتكم ودعمكم كانت ولا تزال سنداً وقوة لنا، ولا نتصور هذا اليوم العظيم إلا وأنتم بجانبنا.",
      "تشرّفوا بحضور حفل زفافنا والاحتفال معنا بهذه اللحظة التي طال انتظارها.",
    ],
    signature: "بكل تقديرنا ومحبتنا، بشر وجودي",
  },

  event: {
    weddingDate: "2026-04-30T21:00:00",
    displayDate: "الخميس، ٣٠ أبريل ٢٠٢٦",
    displayTime: "٧:٠٠ مساءً",
  },

  venue: {
    name: "صالة شوفال",
    address: "دمشق، سوريا",
    googleMapsEmbedUrl:
      "https://maps.google.com/maps?q=33.5277341596426,36.2971208378633&z=16&output=embed",
    googleMapsLink:
      "https://www.google.com/maps?q=33.5277341596426,36.2971208378633",
  },

  closing: {
    message: "يسعدنا احتفالكم معنا في هذا اليوم المميز.",
    rsvpLink: "https://forms.google.com",
    hashtag: "#بشر_وجودي_2026",
  },

  gallery: {
    images: [],
  },

  video: {
    src: "",
    poster: "",
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
        name: "أحمد وسمير",
        message:
          "مبروك يا بشر وجودي — كل عام وأنتما بخير وسعادة وبركة. شرفتمونا بدعوتنا.",
      },
      {
        name: "عائلة الخطيب",
        message:
          "أطيب الأمنيات لكما في بداية رحلتكما الجميلة. عقبال الأفراح دايمًا.",
      },
    ],
  },
};
