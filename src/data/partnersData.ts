/**
 * @file Partner Data
 * @description This file contains comprehensive data for all partnership organizations.
 * It includes details such as logos, descriptions, industry information, and collaboration specifics.
 * The data is used throughout the application to display partner information.
 */

// Import partner logos from the assets directory.
import AirAlgerieLogo from "@/assets/Air_Algérie_logo.png";
import BankOfAlgeriaLogo from "@/assets/Bank_of_Algeria.png";
import DjezzyLogo from "@/assets/Djezzy_Logo.png";
import SonatrachLogo from "@/assets/Flag_of_Sonatrach.png";
import MobilisLogo from "@/assets/Logo_Mobilis.png";
import OoredooLogo from "@/assets/Ooredoo_logo.svg";
import SonelgazLogo from "@/assets/Sonlgaz.png";
import CNASLogo from "@/assets/cnas.png";

/**
 * @interface Partner
 * @description Defines the structure for a partner object, containing all relevant information.
 */
export interface Partner {
  /** @property {string} id - A unique identifier for the partner. */
  id: string;
  /** @property {string} name - The name of the partner company. */
  name: string;
  /** @property {string} logo - The path or import reference to the partner's logo. */
  logo: string;
  /** @property {string} description - A brief description of the partnership. */
  description: string;
  /** @property {string} industry - The industry sector the partner operates in. */
  industry: string;
  /** @property {string} founded - The year the partner company was founded. */
  founded: string;
  /** @property {string} headquarters - The location of the partner's headquarters. */
  headquarters: string;
  /** @property {string} about - A detailed description of the partner company. */
  about: string;
  /** @property {object} collaboration - Details about the collaboration with the partner. */
  collaboration: {
    /** @property {string} startDate - The year the collaboration started. */
    startDate: string;
    /** @property {string[]} services - A list of services provided or integrated. */
    services: string[];
    /** @property {string} impact - The impact or result of the collaboration. */
    impact: string;
  };
  /** @property {object[]} stats - Key statistics related to the partnership. */
  stats: {
    /** @property {string} label - The label for the statistic (e.g., "Daily Passengers"). */
    label: string;
    /** @property {string} value - The value of the statistic. */
    value: string;
  }[];
  /** @property {string} [website] - An optional URL to the partner's website. */
  website?: string;
  /** @property {string[]} [gallery] - An optional array of URLs for gallery images. */
  gallery?: string[];
}

/**
 * @const {Partner[]} partnersData
 * @description An array of partner objects, serving as the central database for partnership information.
 */
export const partnersData: Partner[] = [
  {
    id: "air-algerie",
    name: "Air Algérie",
    logo: AirAlgerieLogo,
    description: "National airline partnership",
    industry: "Aviation & Transportation",
    founded: "1953",
    headquarters: "Algiers, Algeria",
    about: "Air Algérie is the national airline of Algeria, with its head office in the Immeuble El-Djazair in Algiers. It operates scheduled international services to destinations in Europe, Africa, Asia, and the Middle East, as well as domestic flights within Algeria.",
    collaboration: {
      startDate: "2020",
      services: [
        "Digital queue management for check-in counters",
        "Real-time flight status integration",
        "Customer flow optimization",
        "Multi-terminal coordination system"
      ],
      impact: "Reduced average wait times by 45% and improved customer satisfaction scores by 38%"
    },
    stats: [
      { label: "Daily Passengers", value: "5,000+" },
      { label: "Counters Managed", value: "120+" },
      { label: "Airports", value: "15" }
    ],
    website: "https://www.airalgerie.dz",
    gallery: [
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",
      "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=800&q=80",
      "https://images.unsplash.com/photo-1583968791244-bf170ca7e285?w=800&q=80",
      "https://images.unsplash.com/photo-1556388158-158f89457711?w=800&q=80",
      "https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=800&q=80"
    ]
  },
  {
    id: "bank-of-algeria",
    name: "Bank of Algeria",
    logo: BankOfAlgeriaLogo,
    description: "Banking sector collaboration",
    industry: "Banking & Finance",
    founded: "1962",
    headquarters: "Algiers, Algeria",
    about: "The Bank of Algeria is the central bank of Algeria. It is responsible for issuing the national currency, managing monetary policy, and regulating the banking sector to ensure financial stability across the nation.",
    collaboration: {
      startDate: "2019",
      services: [
        "Branch queue management system",
        "Priority service routing",
        "Customer appointment scheduling",
        "Multi-service ticket management"
      ],
      impact: "Enhanced branch efficiency by 50% and reduced customer complaints by 62%"
    },
    stats: [
      { label: "Branches Connected", value: "200+" },
      { label: "Daily Transactions", value: "15,000+" },
      { label: "Service Types", value: "25+" }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?w=800&q=80",
      "https://images.unsplash.com/photo-1554224311-beee4ece8c35?w=800&q=80",
      "https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=800&q=80",
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80",
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80"
    ]
  },
  {
    id: "djezzy",
    name: "Djezzy",
    logo: DjezzyLogo,
    description: "Telecommunications partner",
    industry: "Telecommunications",
    founded: "2001",
    headquarters: "Algiers, Algeria",
    about: "Djezzy is one of Algeria's leading mobile telecommunications operators, providing innovative mobile services to millions of customers across the country with cutting-edge 4G technology and comprehensive network coverage.",
    collaboration: {
      startDate: "2021",
      services: [
        "Retail store queue management",
        "Customer service desk optimization",
        "Digital check-in system",
        "Service quality analytics"
      ],
      impact: "Improved store throughput by 55% and increased customer retention by 28%"
    },
    stats: [
      { label: "Retail Locations", value: "300+" },
      { label: "Daily Visitors", value: "25,000+" },
      { label: "Service Points", value: "800+" }
    ],
    website: "https://www.djezzy.dz",
    gallery: [
      "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?w=800&q=80",
      "https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=800&q=80",
      "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80",
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80",
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
    ]
  },
  {
    id: "sonatrach",
    name: "Sonatrach",
    logo: SonatrachLogo,
    description: "Energy sector partnership",
    industry: "Oil & Gas",
    founded: "1963",
    headquarters: "Algiers, Algeria",
    about: "Sonatrach is the national oil and gas company of Algeria, ranking among Africa's largest corporations. It handles the exploration, production, transportation, and marketing of hydrocarbons and their derivatives.",
    collaboration: {
      startDate: "2018",
      services: [
        "Administrative office queue management",
        "Visitor registration system",
        "Security clearance integration",
        "Multi-facility coordination"
      ],
      impact: "Streamlined administrative processes by 40% and enhanced security protocols"
    },
    stats: [
      { label: "Facilities Managed", value: "50+" },
      { label: "Daily Visitors", value: "3,000+" },
      { label: "Service Centers", value: "35" }
    ],
    website: "https://www.sonatrach.com",
    gallery: [
      "https://images.unsplash.com/photo-1564514167111-cb3f8a79e90c?w=800&q=80",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80",
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80",
      "https://images.unsplash.com/photo-1586864387634-afe5ad3f6a44?w=800&q=80"
    ]
  },
  {
    id: "mobilis",
    name: "Mobilis",
    logo: MobilisLogo,
    description: "Mobile network operator",
    industry: "Telecommunications",
    founded: "2003",
    headquarters: "Algiers, Algeria",
    about: "Mobilis is Algeria's leading mobile telecommunications operator, providing comprehensive mobile and internet services nationwide with the most extensive network coverage in the country.",
    collaboration: {
      startDate: "2020",
      services: [
        "Customer service center management",
        "Virtual queuing system",
        "SMS notification integration",
        "Multi-channel service coordination"
      ],
      impact: "Reduced wait times by 52% and improved first-contact resolution by 35%"
    },
    stats: [
      { label: "Service Centers", value: "400+" },
      { label: "Daily Customers", value: "30,000+" },
      { label: "Support Channels", value: "12" }
    ],
    website: "https://www.mobilis.dz",
    gallery: [
      "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&q=80",
      "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80",
      "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&q=80",
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80",
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80"
    ]
  },
  {
    id: "ooredoo",
    name: "Ooredoo",
    logo: OoredooLogo,
    description: "Telecommunications partner",
    industry: "Telecommunications",
    founded: "2004",
    headquarters: "Algiers, Algeria",
    about: "Ooredoo Algeria is a major telecommunications provider offering mobile, internet, and digital services with a focus on innovation and customer experience across the Algerian market.",
    collaboration: {
      startDate: "2021",
      services: [
        "Smart store queue management",
        "Digital customer journey mapping",
        "Service quality monitoring",
        "Real-time analytics dashboard"
      ],
      impact: "Enhanced customer experience scores by 42% and optimized staff allocation"
    },
    stats: [
      { label: "Stores", value: "250+" },
      { label: "Daily Customers", value: "20,000+" },
      { label: "Service Types", value: "30+" }
    ],
    website: "https://www.ooredoo.dz",
    gallery: [
      "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800&q=80",
      "https://images.unsplash.com/photo-1556155092-8707de31f9c4?w=800&q=80",
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80",
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80"
    ]
  },
  {
    id: "sonelgaz",
    name: "Sonelgaz",
    logo: SonelgazLogo,
    description: "Electricity and gas provider",
    industry: "Energy & Utilities",
    founded: "1969",
    headquarters: "Algiers, Algeria",
    about: "Sonelgaz is Algeria's state-owned electricity and natural gas distribution company, providing essential energy services to millions of households and businesses nationwide.",
    collaboration: {
      startDate: "2019",
      services: [
        "Customer service center optimization",
        "Bill payment queue management",
        "Service request routing",
        "Regional office coordination"
      ],
      impact: "Improved service delivery by 48% and reduced operational costs by 25%"
    },
    stats: [
      { label: "Service Centers", value: "180+" },
      { label: "Daily Visitors", value: "12,000+" },
      { label: "Coverage Area", value: "48 Regions" }
    ],
    website: "https://www.sonelgaz.dz",
    gallery: [
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80",
      "https://images.unsplash.com/photo-1509391111737-a847f17ad50d?w=800&q=80",
      "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&q=80",
      "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=800&q=80",
      "https://images.unsplash.com/photo-1624397640148-949b1732bb0a?w=800&q=80"
    ]
  },
  {
    id: "cnas",
    name: "CNAS",
    logo: CNASLogo,
    description: "Social security partner",
    industry: "Healthcare & Social Security",
    founded: "1992",
    headquarters: "Algiers, Algeria",
    about: "CNAS (Caisse Nationale des Assurances Sociales) is Algeria's national social security fund, managing health insurance and social benefits for employed workers and their families.",
    collaboration: {
      startDate: "2018",
      services: [
        "Healthcare facility queue management",
        "Patient appointment system",
        "Multi-service coordination",
        "Priority care routing"
      ],
      impact: "Reduced patient wait times by 60% and improved service accessibility by 45%"
    },
    stats: [
      { label: "Facilities", value: "500+" },
      { label: "Daily Beneficiaries", value: "40,000+" },
      { label: "Service Points", value: "1,200+" }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800&q=80",
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80",
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
      "https://images.unsplash.com/photo-1504813184591-01572f98c85f?w=800&q=80",
      "https://images.unsplash.com/photo-1571772996211-2f02c9727629?w=800&q=80"
    ]
  }
];

/**
 * Retrieves a partner's data by their unique ID.
 * @param {string} id - The unique identifier of the partner to find.
 * @returns {Partner | undefined} The partner object if found, otherwise undefined.
 */
export const getPartnerById = (id: string): Partner | undefined => {
  return partnersData.find(partner => partner.id === id);
};
