import { BlockTypes } from "@/utils/constants";
import { Block } from "global";

enum EventCategories {
  ArtsEntertainment = "arts-entertainment",
  Community = "community",
  FitnessHealth = "fitness-health",
  FoodDrink = "food-drink",
  Holidays = "holidays",
  LearnThings = "learn-things",
  Music = "music",
  ShoppingSales = "shopping-sales",
  Sports = "sports",
}

export enum EventSections {
  HappeningThisWeek = "happening-this-week",
  HappeningToday = "happening-today",
  PlanAhead = "plan-ahead",
}

export const EventCategoryTitles = {
  [EventCategories.ArtsEntertainment]: "Arts & Entertainment",
  [EventCategories.Community]: "Community",
  [EventCategories.FitnessHealth]: "Fitness & Health",
  [EventCategories.FoodDrink]: "Food & Drink",
  [EventCategories.Holidays]: "Holidays",
  [EventCategories.LearnThings]: "Learn Things",
  [EventCategories.Music]: "Music",
  [EventCategories.ShoppingSales]: "Shopping & Sales",
  [EventCategories.Sports]: "Sports",
};

export interface EventListing {
  category: EventCategories;
  logoUrl: string;
  // logoLinkUrl: string; // maybe this could be a thing?
  description: Block[]; // This model might be excessive
  endDate: string;
  entryInfo: {
    location: string;
    price: string;
    time: string;
  };
  id: string;
  featurePhotoUrl: string;
  linkUrl: string;
  startDate: string;
  title: string;
}

let id = 0;

export const mockEventsResponse: Record<EventSections, EventListing[]> = {
  [EventSections.HappeningToday]: [
    {
      category: EventCategories.FoodDrink,
      logoUrl:
        "https://charlotte.axios.com/wp-content/uploads/2022/01/CRW-Winter-logo-300x300-1.png",
      description: [
        {
          text: "Flirt with flavors and feast with friends during Charlotte Restaurant Week. Experience new flavors in the New Year with 3-course, specially priced menus at 90+ restaurants in 9 metro-area counties. See participating restaurants and menus and make reservations today at the event website.",
          type: BlockTypes.UNSTYLED,
          data: [],
          depth: 0,
          entityRanges: [],
          inlineStyleRanges: [],
          key: "",
        },
      ],
      endDate: "01/29/2023",
      entryInfo: {
        location: "90+ metro restaurants",
        price: "$30-$45",
        time: "Evenings",
      },
      id: `${id++}`,
      featurePhotoUrl:
        "https://charlotte.axios.com/wp-content/uploads/2023/01/CRW-diners-entree-delivery-1200x709-px-425x251.jpg",
      linkUrl: "https://charlotterestaurantweek.iheart.com/",
      startDate: "01/20/2023",
      title: "Queen's Feast: Charlotte Restaurant Week\u00AE",
    },
    {
      category: EventCategories.ArtsEntertainment,
      logoUrl:
        "https://charlotte.axios.com/wp-content/uploads/2023/01/SOMETHING-ROTTEN-HALF-KEY-ART_4C.png",
      description: [
        {
          text: "Join Theatre Charlotte for their Grand Reopening with the musical comedy Something Rotten! Hilarity ensues and absurdity reaches new heights in this satirical spectacle that pokes fun at everything audiences adore about Broadway. With its heart on its ruffled sleeve and sequins in its soul, Something Rotten! is “the funniest musical comedy in at least 400 years” (Time Out New York)",
          type: BlockTypes.UNSTYLED,
          data: [],
          depth: 0,
          entityRanges: [],
          inlineStyleRanges: [],
          key: "",
        },
      ],
      endDate: "02/05/2023",
      entryInfo: {
        location: "Theatre Charlotte",
        price: "$32",
        time: "8 p.m.",
      },
      id: `${id++}`,
      featurePhotoUrl:
        "https://charlotte.axios.com/wp-content/uploads/2023/01/somethingrotten.png",
      linkUrl: "https://www.theatrecharlotte.org/rotten",
      startDate: "01/20/2023",
      title: "Something Rotten!",
    },
  ],
  [EventSections.HappeningThisWeek]: [
    {
      category: EventCategories.ArtsEntertainment,
      logoUrl:
        "https://charlotte.axios.com/wp-content/uploads/2022/01/blumenthal_logo.png",
      description: [
        {
          text: "MOMIX’s internationally acclaimed dancer-illusionists conjure the magical world of the White Rabbit, Mad Hatter, and the Queen of Hearts in this stunning reimagining of Lewis Carroll’s novel. Journey down the rabbit hole with MOMIX and the visionary choreography of Artistic Director Moses Pendleton. Filled with visual splendor and startling creative movement, Alice reveals that nothing in MOMIX’s world is as it seems.",
          type: BlockTypes.UNSTYLED,
          data: [],
          depth: 0,
          entityRanges: [],
          inlineStyleRanges: [],
          key: "",
        },
      ],
      endDate: "01/25/2023",
      entryInfo: {
        location: "Knight Theater at Levine Center for the Arts",
        price: "$20",
        time: "Times vary",
      },
      id: `${id++}`,
      featurePhotoUrl:
        "https://charlotte.axios.com/wp-content/uploads/2022/12/Momix_1600x600-3-50fb85710c-425x251.jpg",
      linkUrl:
        "https://www.blumenthalarts.org/events/detail/momix-alice#blumenthal",
      startDate: "01/20/2023",
      title: "MOMIX Alice",
    },
    {
      category: EventCategories.FitnessHealth,
      logoUrl:
        "https://charlotte.axios.com/wp-content/uploads/2022/01/cccp-logo-2.jpg",
      description: [
        {
          text: "Whether you’re an experienced climber or just looking to try something new, all are welcome to hang and meet other members of the Charlotte LGBTQ community at the Inner Peaks Queer Climb Night. Happening on the last Tuesday of each month, experience the state-of-the-art indoor rock-climbing facility.",
          type: BlockTypes.UNSTYLED,
          data: [],
          depth: 0,
          entityRanges: [],
          inlineStyleRanges: [],
          key: "",
        },
      ],
      endDate: "01/24/2023",
      entryInfo: {
        location: "Inner Peaks South End",
        price: "Free for members, $20 non members",
        time: "6 to 8 p.m.",
      },
      id: `${id++}`,
      featurePhotoUrl:
        "https://charlotte.axios.com/wp-content/uploads/2023/01/queer-climb-night-425x251.png",
      linkUrl: "https://southendclt.org/do/queer-climb-night#cccp",
      startDate: "01/24/2023",
      title: "Something Rotten!",
    },
  ],
  [EventSections.PlanAhead]: [
    {
      category: EventCategories.FitnessHealth,
      logoUrl:
        "https://charlotte.axios.com/wp-content/uploads/2023/01/Dog-Jog-Landing-Page_CDL-Logo-Navy.png",
      description: [
        {
          text: "Walk, jog or run this family-friendly and fur-friendly 5k. Whether you love running with your dog or appreciate being around other people’s dogs, this race is for all.",
          type: BlockTypes.UNSTYLED,
          data: [],
          depth: 0,
          entityRanges: [],
          inlineStyleRanges: [],
          key: "",
        },
      ],
      endDate: "03/04/2023",
      entryInfo: {
        location: "McAlpine Creek Park",
        price: "$30-$35",
        time: "11 a.m.",
      },
      id: `${id++}`,
      featurePhotoUrl:
        "https://charlotte.axios.com/wp-content/uploads/2023/01/202A7251-425x251.jpg",
      linkUrl: "https://raceroster.com/events/2023/63379/charlottes-dog-jog",
      startDate: "03/04/2023",
      title: "Charlotte’s Dog Jog presented by LendScout",
    },
    {
      category: EventCategories.ArtsEntertainment,
      logoUrl:
        "https://charlotte.axios.com/wp-content/uploads/2016/08/levinelogonotag.jpg",
      description: [
        {
          text: "The Men Inside is a live, on-stage production that honors the paths of Black men who have become change-makers in their community. Inspired by the exhibition Men of Change: Power. Triumph. Truth., the show shares deeply personal stories and open-hearted truths of Black men in Charlotte. It’s a full-on display of the emotional and interpersonal journeys, as well as a beautiful and bold theatrical exploration of the hearts and minds of real Black men.",
          type: BlockTypes.UNSTYLED,
          data: [],
          depth: 0,
          entityRanges: [],
          inlineStyleRanges: [],
          key: "",
        },
      ],
      endDate: "02/2/2023",
      entryInfo: {
        location: "Booth Playhouse",
        price: "$20-$30",
        time: "7 p.m.",
      },
      id: `${id++}`,
      featurePhotoUrl:
        "https://charlotte.axios.com/wp-content/uploads/2023/01/the-men-inside-425x251.png",
      linkUrl: "https://www.museumofthenewsouth.org/events/themeninside/",
      startDate: "02/2/2023",
      title: "The Men Inside",
    },
  ],
};
