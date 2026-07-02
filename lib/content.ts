export const masthead = {
  title: "The Wedding Times",
  edition: "Special Wedding Edition",
  hashtag: "#RajWaliShefali",
  tagline: ["Love", "Adventure", "Celebration", "Forever"],
  locationLabel: "Goa, India",
  centerLabel: "A celebration of love & new beginnings",
  priceLabel: "Priceless",
};

export const headline = {
  kicker: "Breaking News",
  primary: "Shefali & Raj",
  subhead: "To Tie The Knot In Goa",
  jump: "Continued on Page 2",
};

export const dateline = {
  front: "Special Advance Edition · Goa, India · 2027",
  day1: "Monday · 1 February, 2027 · Goa Edition",
};

export const venue = {
  name: "Kenilworth Resort & Spa",
  city: "Goa",
  country: "India",
};

export const dates = [
  { day: "Monday", date: "1 February, 2027" },
  { day: "Tuesday", date: "2 February, 2027" },
] as const;

export const story = {
  kicker: "The Story",
  deck: "It all started with a friendship.",
  paragraphs: [
    "For two years since 2021, we were part of the same circle of friends—spending weekends together, dancing at clubs, chasing concerts, and creating memories on countless nights out. Somewhere between the laughter, the adventures, and the ordinary moments, a bond was quietly growing.",
    "Then came 2023, when we traveled together to Tomorrowland—Raj's dream festival. Surrounded by music, lights, and magic, something changed. We didn't realize it at the time, but that trip became the beginning of our story.",
    "When we returned home, everything felt a little different. The excitement of the trip was over, yet something still felt missing. It wasn't Tomorrowland we missed—it was each other.",
    "Coming from completely different backgrounds, we never imagined that life would lead us here. There were uncertainties, questions, and moments when the path ahead wasn't clear. But as it turns out, opposites really do attract. What made us different became what brought us closer, helping us grow, learn, and build something beautiful together.",
    "And now, after years of friendship, adventures, laughter, and love, we are beginning our greatest journey yet. We can't wait to celebrate the next chapter of our story with you.",
  ],
};

export const families = {
  heading: "Families Behind The Celebration",
  intro: "With the Love, Blessings & Best Wishes of",
  shefali: {
    label: "The Mahey Family",
    members: [
      "Gurjeet Singh",
      "Neelam Mahey",
      "Rajat Mahey",
      "Shubhra Mahey",
      "Gaurav Chavan",
    ],
  },
  raj: {
    label: "The Surti & Tailor Family",
    members: [
      "Prafulbhai Surti",
      "Varshaben Surti",
      "Binny Tailor",
      "Vishal Tailor",
      "Divya Tailor",
      "Ashish Tailor",
      "Aarya Tailor",
      "Ayaan Tailor",
      "Aryan Tailor",
      "Sanchi Tailor",
    ],
  },
};

export const invited = {
  primary: "You Are Officially Invited",
  sub: "Join us as we celebrate the greatest headline of our lives.",
  footer: "RSVP & Details Inside",
};

export type EventCardData = {
  label: string;
  title: string;
  location: string;
  time: string;
  dress: string;
  expect: string;
};

export const day1 = {
  title: "Day 1 Edition",
  deck: "Haldi & Sangeet Celebration Guide",
  haldi: {
    label: "Afternoon Edition",
    title: "Haldi Ceremony",
    location: "Aquatica Poolside (Outdoor)",
    time: "11:00 AM – 04:00 PM",
    dress: "Yellow • Ethnic Wear",
    expect:
      "The celebrations officially begin with our Haldi ceremony. Join us poolside for an afternoon filled with laughter, music, traditions, vibrant colors, and unforgettable memories. Expect sunshine, flower petals, family fun, and a few surprise moments along the way.",
  } satisfies EventCardData,
  sangeet: {
    label: "Evening Edition",
    title: "Sangeet Night",
    location: "Pavilion (Indoor)",
    time: "07:00 PM – 02:00 AM",
    dress: "Sparkling • Indo-Western",
    expect:
      "The night before our big day, the dancefloor comes alive. Get ready for an evening of performances, music, dancing, and celebration as family and friends take center stage. Bring your best energy and your best moves — we plan on making memories that will last a lifetime.",
  } satisfies EventCardData,
  timeline: {
    title: "Ceremony Timeline",
    deck: "From Haldi sunshine to the Sangeet dancefloor.",
    entries: [
      { time: "11:00 AM", icon: "flower", label: "Haldi Begins" },
      { time: "02:00 PM", icon: "utensils", label: "Lunch Served" },
      { time: "04:00 PM", icon: "sun", label: "Haldi Closes" },
      { time: "07:00 PM", icon: "sparkles", label: "Sangeet Opens" },
      { time: "09:00 PM", icon: "mic", label: "Performances" },
      { time: "10:00 PM", icon: "wine", label: "Dinner" },
      { time: "12:00 AM", icon: "disc", label: "Dance Floor" },
    ] as const,
  },
};

// — Day 2: Wedding Day —
export const day2 = {
  title: "Day 2 Edition",
  deck: "The Day Filled With Moments Worth Reliving",
  journeyTitle: "Today's Journey",
  journey: [
    {
      step: 1,
      title: "Grah Shanti Pooja",
      icon: "flame",
      time: "07:00 AM",
      location: "Regency 2 Hall (Indoor)",
      outfit: "Ethnic Wear",
      description:
        "We begin the day with blessings and prayers, seeking peace, prosperity and happiness for the beautiful journey ahead. (Exclusive to the Groom's Family)",
    },
    {
      step: 2,
      title: "Chooda Ceremony",
      icon: "sparkles",
      time: "09:00 AM",
      location: "Held privately surrounded by family and laughter",
      outfit: "Ethnic Wear",
      description:
        "A ceremony celebrating the journey from daughter to bride. A cherished Punjabi tradition where the bride is adorned with her sacred choodha, symbolizing the beginning of a beautiful new chapter. (Exclusive to the Bride's Family)",
    },
    {
      step: 3,
      title: "Baaraat",
      icon: "music",
      time: "11:00 AM",
      location: "Chess Board (Outdoor)",
      outfit: "Traditional Wear (Any shades of color)",
      description:
        "Drums, dance and unforgettable energy as Raj makes his grand entrance surrounded by family and friends. The celebration moves forward!",
    },
    {
      step: 4,
      title: "Wedding Ceremony",
      icon: "crown",
      time: "03:00 PM",
      location: "Sea Mist (Beach Lawn, Outdoor)",
      outfit: "Traditional Wear (Any shades of color)",
      description:
        "Two families, two hearts and countless blessings. Join us as we celebrate a union filled with traditions, laughter, blessings, and the promise of forever.",
    },
    {
      step: 5,
      title: "After-Party",
      icon: "disc",
      time: "11:00 PM",
      location: "Pavilion (Indoor)",
      outfit: "Night Club Wear",
      description:
        "The last night before everyone part ways. An indoor celebration filled with music, dance and unforgettable memories to close this beautiful chapter.",
    },
  ] as const,
  highlightsTitle: "Second Day Highlights",
  highlights: [
    { icon: "calendar", text: "5 Beautiful Events" },
    { icon: "users", text: "2 Families" },
    { icon: "heart", text: "1 Unforgettable Day" },
    { icon: "prayer", text: "Countless Blessings" },
    { icon: "camera", text: "Memories In The Making" },
  ] as const,
  highlightsClose: "One day. Infinite memories. A lifetime to cherish.",
  factsTitle: "Couple Facts & Figures",
  factsSubtitle: "According to highly reliable sources…",
  facts: [
    {
      icon: "waves",
      text: "Raj loves water so much that if he could, he'd probably build a mansion under the ocean and call it home.",
    },
    {
      icon: "car",
      text: "Raj loves driving. Shefali has mastered the art of being a professional passenger princess.",
    },
    {
      icon: "coffee",
      text: "Shefali's coffee consumption is directly linked to world productivity levels. No coffee = proceed with caution.",
    },
    {
      icon: "music",
      text: "Tomorrowland 2023 wasn't just a festival — it accidentally became the beginning of this love story.",
    },
    {
      icon: "utensils",
      text: "Raj has a very sophisticated taste in pasta. By sophisticated, we mean Alfredo. Every. Single. Time.",
    },
    {
      icon: "pizza",
      text: "When Shefali finds a favorite food, she doesn't just enjoy it — she enters a long-term committed relationship with it for weeks.",
    },
    {
      icon: "dance",
      text: "One loves the dance floor. The other loves playing music. This explains a lot.",
    },
    {
      icon: "globe",
      text: "Opposite backgrounds. Different personalities. Same destination. After years of friendship, countless adventures, and one life-changing trip, from best friends to forever.",
    },
  ] as const,
  headlinesTitle: "Today's Headlines",
  headlines: [
    "Big day ahead as love takes center stage",
    "Families come together for rituals and blessings",
    "Raj's baraat set to light up the Goan streets",
    "Countdown to Mrs. begins",
    "After-Party Predictions: No Rules, No Schedules",
  ] as const,
  headlinesClose: "Stay tuned for a day to remember forever.",
  footer: "The End… Or Just The Beginning?",
  photoCaption: "The Picture Patch Photography",
};

// — RSVP / Guest Info —
export const rsvp = {
  title: "RSVP & Guest Information",
  deck: "Everything You Need To Know Before You Travel",

  invite: {
    label: "RSVP",
    intro: "We can't wait to celebrate with you!",
    instruction: "Kindly confirm your attendance by August 22, 2026 by completing the RSVP form below. Once your RSVP has been submitted, all event updates will be shared via WhatsApp.",
    assistance: "Need assistance? Our RSVP team is happy to help with any questions regarding your RSVP, accommodation, or travel plans. Reach us on WhatsApp at +91 91672 82521.",
    fields: [
      { icon: "users", label: "Guest Count" },
      { icon: "user", label: "Name of Every Guest" },
      { icon: "whatsapp", label: "WhatsApp Number" },
    ] as const,
    toLabel: "To",
    toName: "Coming Soon",
  },

  puzzle: {
    label: "A Little Puzzle For You!",
    instruction: "Can you find these words?",
    words: ["Raj", "Shefali", "Goa", "Love", "Forever", "Wedding"] as const,
    grid: [
      ["Z", "R", "A", "J", "K", "L", "M", "N", "P", "Q", "X"],
      ["X", "Y", "U", "I", "O", "P", "A", "S", "D", "F", "G"],
      ["G", "H", "J", "K", "L", "Z", "X", "C", "V", "B", "N"],
      ["Q", "W", "E", "D", "D", "I", "N", "G", "O", "P", "A"],
      ["S", "K", "C", "F", "A", "L", "I", "K", "L", "Z", "X"],
      ["L", "O", "V", "E", "S", "H", "E", "F", "A", "L", "I"],
      ["Q", "A", "Z", "X", "C", "V", "B", "N", "M", "Q", "L"],
      ["F", "O", "R", "E", "V", "E", "R", "T", "Y", "U", "I"],
      ["M", "N", "B", "V", "C", "X", "Z", "A", "Q", "W", "E"],
      ["G", "O", "A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ] as const,
  },

  travel: {
    label: "Important Information For Our Dear Guests",
    flight: {
      title: "Travelling By Flight?",
      icon: "plane",
      airport: "GOI · Dabolim Airport",
      distance: "Approximately 25–35 minutes from Kenilworth Resort & Spa",
    },
    train: {
      title: "Travelling By Train?",
      icon: "train",
      station: "Madgaon Railway Station",
      distance: "Approximately 15–25 minutes from Kenilworth Resort & Spa",
    },
    notes: {
      title: "Please Note",
      items: [
        { icon: "id", text: "Carry a valid government-issued ID." },
        { icon: "sun", text: "Goa is warm and beautiful — stay hydrated and wear sunscreen." },
        { icon: "shirt", text: "The dress guide throughout the newspaper is suggestive, please feel free to dress comfortably." },
        { icon: "phone", text: "Keep your phone charged for photos and event updates." },
        { icon: "dance", text: "Bring your best dance moves and your best energy!" },
        { icon: "heart", text: "Most importantly, shower the newly weds with your blessings." },
      ] as const,
    },
  },

  classifieds: {
    label: "Classified Ads",
    items: [
      { icon: "search", tag: "LOST", text: "Raj's heart." },
      { icon: "heart", tag: "FOUND", text: "Shefali's forever person." },
      { icon: "users", tag: "WANTED", text: "Guests with great dance moves." },
      { icon: "tag", tag: "FOR SALE", text: "Last remaining excuses for not attending." },
      { icon: "gift", tag: "REWARD", text: "A crash course in Garba and Bhangra." },
      {
        icon: "megaphone",
        tag: "NOTICE",
        text: "Side effects of this wedding may include sore feet, happy tears, and a full heart.",
      },
    ] as const,
  },

  closing: {
    quote:
      "Good company, great food, endless laughter, and memories in the making. Let's make it a celebration to remember.",
    end: "The End… Or Just The Beginning?",
    signature: "Shefali & Raj",
  },
};
