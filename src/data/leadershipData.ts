export interface LeadershipEntry {
  id: string
  title: string
  subtitle: string
  image: string | null
  imageSecondary?: string
  extraImages?: string[]
  narrative: string
  contributions: string[]
}

export const leadershipData: LeadershipEntry[] = [
  {
    id: 'yosh-turizm',
    title: 'Yosh Turizm Elchilari',
    subtitle: 'Tourism Ambassador Program',
    image: '/images/qoqon.jpg',
    extraImages: ['/images/senat_1.jpg', '/images/senat_2.jpg', '/images/senat_3.jpg'],
    narrative:
      'As a Young Tourism Ambassador, I represented Uzbekistan across national and international platforms — from cultural festivals to government institutions.',
    contributions: [
      'Delivered a public speech at the International Kokand Handicraft Festival to an audience of 100+ attendees.',
      'Served as a Coordinator of Delegates at Maqom International Fest, managing logistics and delegate communication.',
      'Visited the Oliy Majlis Senate to engage directly with senators on tourism development and youth initiatives.',
    ],
  },
  {
    id: 'mun',
    title: 'Model United Nations',
    subtitle: 'Delegate & Organiser',
    image: '/images/tiiame.JPG',
    imageSecondary: '/images/sifmun.jpg',
    narrative:
      'My MUN journey evolved from delegate to organiser — experiencing both sides of international diplomacy simulation.',
    contributions: [
      'Participated as a delegate at TIIAME MUN 2024 in Tashkent, representing a country committee and drafting resolutions.',
      'Co-organised SIFMUN 2025 — handled committee structure, delegate onboarding, and session facilitation.',
    ],
  },
  {
    id: 'startup-club',
    title: 'Start-Up Club',
    subtitle: 'Founder & Pitcher',
    image: '/images/start_up_1.jpg',
    imageSecondary: '/images/start_up_2.jpg',
    narrative:
      'I founded the Start-Up Club at my school to create a space where students could build real products and pitch them to industry leaders.',
    contributions: [
      'Founded the Start-Up Club at school — built the program structure, recruited members, and ran weekly sessions.',
      "Presented our product BuildSoft directly to the Deputy Minister of Education of Uzbekistan.",
      "Pitched at Start-Up Arena in front of Alisher Saddulayev (Head Director, Youth Affairs Agency) and Abdulaziz Yo'ldoshev (CEO, Yoshlar Ventures).",
    ],
  },
]
