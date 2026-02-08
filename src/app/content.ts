// Website Content - Edit this file to update text throughout the site

// Fallback image if no property images are available
export const FALLBACK_IMAGE = "/logo.png";

// Utility function to get property image paths
export function getPropertyImagePath(slug: string, imageName: string): string {
  return `/properties/${slug}/${imageName}`;
}

// Utility function to get all property images with full paths
// If showImages is false, return fallback logo instead
export function getPropertyImages(property: { slug: string; images: string[]; showImages?: boolean }): string[] {
  // If showImages is explicitly set to false, return fallback
  if (property.showImages === false) {
    return [FALLBACK_IMAGE];
  }
  
  // If property has no images or empty array, return fallback
  if (!property.images || property.images.length === 0) {
    return [FALLBACK_IMAGE];
  }
  
  // Otherwise return the property images
  return property.images.map(img => getPropertyImagePath(property.slug, img));
}

export const siteInfo = {
  companyName: "J&M PRESTIGE",
  companySubtitle: "PROPERTY CORP",
  tagline: "Your full-service luxury real estate experts",
  email: "jmprestigepropertycorp@gmail.com",
  phones: {
    philippines: "+63 967 097 2465",
    poland: "+48 662 993 676",
  },
  address: {
    street: "Swarozyca 15A",
    city: "71-601 Szczecin, Poland",
  },
  foundedYear: 2023,
};

export const heroSection = {
  ctaButtons: [
    { text: "Explore Services", href: "#services" },
    { text: "Contact Us", href: "#contact" },
  ],
};

export const services = [
  {
    id: "buy-sell",
    icon: "🏡",
    title: "Buy & Sell",
    description:
      "Expert guidance through every step of your property transaction. We connect buyers and sellers with precision and professionalism.",
    ctaText: "View Property Listings",
    ctaLink: "/properties?category=for-sale",
  },
  {
    id: "short-term-rentals",
    icon: "🏠",
    title: "Short-Term Rentals",
    description:
      "Premium furnished properties available for short-term stays. Perfect for business travelers and vacation seekers looking for luxury accommodations.",
    ctaText: "Browse Available Properties",
    ctaLink: "/properties?category=short-term-rental",
  },
  {
    id: "property-management",
    icon: "🔑",
    title: "Property Management",
    description:
      "Comprehensive management services that protect and enhance your investment. Peace of mind for property owners.",
    ctaText: "Explore Management Services",
    ctaLink: "#contact",
  },
  {
    id: "investments",
    icon: "💰",
    title: "Investments",
    description:
      "Strategic investment opportunities designed to maximize returns. Build your real estate portfolio with confidence.",
    ctaText: "Discover Investment Opportunities",
    ctaLink: "#contact",
  },
];

export const properties = [
  {
    id: 1,
    slug: "luxury-apartment-szczecin",
    name: "Luxury Apartment in Szczecin",
    location: "Szczecin, Poland",
    category: "short-term-rental", // Category: "short-term-rental" or "for-sale"
    type: "Apartment",
    bedrooms: 2,
    bathrooms: 1,
    maxGuests: 4,
    area: "75 m²",
    price: "€80",
    priceUnit: "per night",
    description:
      "Modern luxury apartment in the heart of Szczecin. Fully furnished with premium amenities, perfect for short-term stays.",
    longDescription:
      "Experience luxury living in this beautifully appointed apartment located in the heart of Szczecin. This spacious 75m² property features modern furnishings, a fully equipped kitchen, and stunning city views. Perfect for both business travelers and leisure guests seeking comfort and convenience.",
    features: ["WiFi", "Parking", "Kitchen", "City Center"],
    // Categorized amenities
    amenities: [
      {
        category: "General Amenities",
        items: [
          "High-speed Wi-Fi",
          "Air conditioning",
          "Heating",
          "Free Parking",
          "Smart TV",
          "Washer/Dryer",
          "Workspace"
        ]
      },
      {
        category: "Kitchen",
        items: [
          "Full Kitchen",
          "Coffee maker",
          "Cookware & utensils"
        ]
      }
    ],
    // Images: Store in /public/properties/{slug}/
    // Just provide filenames here, path is auto-generated
    images: ["image-1.jpg", "image-2.jpg", "image-3.jpg"],
    showImages: false, // Set to false to always show logo instead of property images
    available: true,
    published: false, // Set to false to hide from listings
    featured: false, // Set to true to show in homepage Featured section
    airbnbLink: "www.google.com", // Add Airbnb link if available
    bookingLink: "www.google.com", // Add Booking.com link if available
  },
  {
    id: 2,
    slug: "onepacific-tb-15n",
    name: "Mactan Newtown One Pacific 1 Bedroom",
    location: "Mactan Newtown, Lapu-Lapu, Cebu, Philippines",
    category: "short-term-rental", // Category: "short-term-rental" or "for-sale"
    type: "Condo",
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    area: "34 m²",
    price: "2500 PHP",
    priceUnit: "per night",
    description:
      "Elegant executive suite ideal for business travelers. Premium location with easy access to major business districts.",
    longDescription:
      "This sophisticated executive suite offers the perfect blend of comfort and functionality for the discerning business traveler. Located in downtown Szczecin, this 55m² suite features a dedicated workspace, modern amenities, and proximity to key business centers.",
    features: ["WiFi", "Balcony", "Air Conditioning", "Kitchen", "Central Location"],
    // Categorized amenities
    amenities: [
      {
        category: "General Amenities",
        items: [
          "High-speed Wi-Fi",
          "Air conditioning",
          "Smart TV",
          "Private balcony"
        ]
      },
      {
        category: "Kitchen Essentials",
        items: [
          "Rice cooker",
          "Electric kettle",
          "Frying pan & basic cookware",
          "Cutlery and utensils"
        ]
      },
      {
        category: "Bathroom Comfort",
        items: [
          "Hot water shower (water heater installed)",
          "Bathroom toiletries"
        ]
      }
    ],
    // Images: Store in /public/properties/{slug}/
    images: ["op_tb15n1.jpeg", "op_tb15n2.jpeg", "op_tb15n3.jpeg", "op_tb15n4.jpeg", "op_tb15n5.jpeg", "op_tb16n7.jpeg"],
    showImages: false, // Set to false to always show logo instead of property images
    available: true,
    published: true, // Set to false to hide from listings
    featured: true, // Set to true to show in homepage Featured section
    airbnbLink: "#",
    bookingLink: "#",
  },
  {
    id: 3,
    slug: "luxury-villa-marbella",
    name: "Luxury Villa with Ocean View",
    location: "Marbella, Spain",
    category: "for-sale",
    type: "Villa",
    bedrooms: 4,
    bathrooms: 3,
    maxGuests: 8,
    area: "350 m²",
    price: "€1,250,000",
    priceUnit: "", // Empty for for-sale properties
    description:
      "Stunning Mediterranean villa with panoramic ocean views. Premium location in exclusive Marbella neighborhood.",
    longDescription:
      "This exceptional villa offers the ultimate in luxury Mediterranean living. Featuring 350m² of elegant living space, the property boasts 4 spacious bedrooms, 3 modern bathrooms, and expansive terraces with breathtaking ocean views. The villa includes a private pool, landscaped garden, and is located in one of Marbella's most sought-after neighborhoods, just minutes from the beach and golf courses.",
    features: ["Ocean View", "Private Pool", "Garden", "Garage"],
    amenities: [
      {
        category: "Property Features",
        items: [
          "Private swimming pool",
          "Landscaped garden",
          "2-car garage",
          "Outdoor terrace",
          "BBQ area"
        ]
      },
      {
        category: "Interior",
        items: [
          "Modern kitchen",
          "Marble flooring",
          "Built-in wardrobes",
          "Air conditioning throughout",
          "Fireplace"
        ]
      },
      {
        category: "Location",
        items: [
          "5 minutes to beach",
          "Walking distance to golf course",
          "Gated community",
          "24/7 security"
        ]
      }
    ],
    images: ["image-1.jpg"], // Placeholder - replace with actual villa images
    showImages: false, // Set to false to always show logo instead of property images
    available: true,
    published: false, // Set to false to hide from listings
    featured: false, // Set to true to show in homepage Featured section
    airbnbLink: "",
    bookingLink: "",
  },
  {
    id: 4,
    slug: "reef-island-resort-condo",
    name: "The Reef Island Resort - 11th Floor Condo",
    location: "Dapdap, Lapu-Lapu City, 6015 Cebu, Philippines",
    category: "for-sale",
    type: "Condo",
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 4,
    area: "40 m²",
    price: "₱9,000,000",
    priceUnit: "",
    description:
      "Ready-to-move-in condo at The Reef Island Resort. Fully furnished 11th floor unit with stunning views and premium resort amenities.",
    longDescription:
      "Experience luxury island living in this fully furnished 40m² condo located on the 11th floor of The Reef Island Resort. This move-in ready unit features modern furnishings, a well-equipped kitchen, and access to world-class resort amenities including a swimming pool, gym, and private beach. Located in Dapdap, Lapu-Lapu City, the property offers convenient access to Mactan Newtown, shopping centers, restaurants, and is just 15-20 minutes from the airport. Perfect for investment or personal use with its prime location and comprehensive facilities.",
    features: ["Beach Access", "Swimming Pool", "Gym", "Furnished", "11th Floor"],
    amenities: [
      {
        category: "Unit Features",
        items: [
          "Split type air conditioning",
          "King size bed",
          "Refrigerator",
          "Smart TV",
          "Microwave",
          "Clothes cabinet",
          "Kitchen cabinet",
          "Hot and cold shower",
          "Dining table with 4 chairs",
          "Center table",
          "Sofa bed"
        ]
      },
      {
        category: "Building Amenities",
        items: [
          "Swimming pool",
          "Gym/Fitness center",
          "Concierge service",
          "24-hour security",
          "CCTV surveillance",
          "In-house bakery & coffee shop",
          "Restaurant",
          "Private beach access"
        ]
      },
      {
        category: "Nearby Conveniences",
        items: [
          "LG Garden shopping",
          "Mactan Newtown (5 min)",
          "Metro supermarket",
          "Robinson supermarket",
          "Local & international restaurants",
          "Pharmacies",
          "Banks & ATMs",
          "Fast food chains",
          "IT Park bus terminal",
          "Bars & entertainment",
          "Airport (15-20 min by car)"
        ]
      }
    ],
    images: ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg", "9.jpg", "10.jpg", "11.jpg", "12.jpg", "13.jpg", "14.jpg"], // Replace with actual property photos
    showImages: false, // Set to false to always show logo instead of property images
    available: true,
    published: true, // Set to false to hide from listings
    featured: true, // Set to true to show in homepage Featured section
    airbnbLink: "",
    bookingLink: "",
  },
  {
    id: 5,
    slug: "hayat-sky-tower-sale",
    name: "Hayat Sky Tower Studio - For Sale",
    location: "Plazaville Subdivision, Nivel Hills, Cebu City, Philippines",
    category: "for-sale",
    type: "Studio",
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    area: "25 m²",
    price: "₱3,200,000",
    priceUnit: "",
    description:
      "Fully furnished studio with balcony on 12th floor. Move-in ready. Perfect investment opportunity with high rental potential in prime Cebu City location.",
    longDescription:
      "Experience modern city living in this fully furnished 25m² studio apartment located on the 12th floor of Hayat Sky Tower. This move-in-ready unit features a private balcony, complete furnishings, and access to premium amenities. Strategically located in Plazaville Subdivision, Nivel Hills, the property is ideal for investors seeking high rental yields, young professionals, students, expats, and digital nomads. Just minutes from JY Square Mall and surrounded by essential conveniences.",
    features: ["Furnished", "Balcony", "12th Floor", "City View", "Investment"],
    amenities: [
      {
        category: "Unit Inclusions",
        items: [
          "Air conditioning",
          "Bed & mattress",
          "Refrigerator",
          "TV",
          "Microwave",
          "IH cooktop & rangehood",
          "Kitchen & storage cabinets",
          "Hot & cold shower"
        ]
      },
      {
        category: "Building Amenities",
        items: [
          "Swimming pool",
          "Gym/Fitness center",
          "Concierge service",
          "24/7 security",
          "CCTV surveillance"
        ]
      },
      {
        category: "Location & Access",
        items: [
          "JY Square Mall nearby",
          "Supermarkets walking distance",
          "Banks & ATMs",
          "Cafés & restaurants",
          "Pharmacies",
          "45-60 mins to airport",
          "60 mins to beach areas"
        ]
      }
    ],
    images: ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg", "9.jpg"], // Replace with actual photos
    showImages: true, // Set to false to always show logo instead of property images
    available: true,
    published: true,
    featured: false,
    airbnbLink: "",
    bookingLink: "",
  },
  {
    id: 6,
    slug: "hayat-sky-tower-rent",
    name: "Hayat Sky Tower Studio - For Rent",
    location: "Plazaville Subdivision, Nivel Hills, Cebu City, Philippines",
    category: "short-term-rental",
    type: "Studio",
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    area: "25 m²",
    price: "₱25,000",
    priceUnit: "per month",
    description:
      "Fully furnished studio with balcony on 12th floor. Move-in ready. Perfect for young professionals, students, expats, and digital nomads in prime Cebu City location.",
    longDescription:
      "Experience modern city living in this fully furnished 25m² studio apartment located on the 12th floor of Hayat Sky Tower. This move-in-ready unit features a private balcony, complete furnishings, and access to premium amenities. Strategically located in Plazaville Subdivision, Nivel Hills, the property is perfect for young professionals, students, expats, and digital nomads. Just minutes from JY Square Mall and surrounded by essential conveniences. Rate is negotiable.",
    features: ["Furnished", "Balcony", "12th Floor", "City View", "Monthly"],
    amenities: [
      {
        category: "Unit Inclusions",
        items: [
          "Air conditioning",
          "Bed & mattress",
          "Refrigerator",
          "TV",
          "Microwave",
          "IH cooktop & rangehood",
          "Kitchen & storage cabinets",
          "Hot & cold shower"
        ]
      },
      {
        category: "Building Amenities",
        items: [
          "Swimming pool",
          "Gym/Fitness center",
          "Concierge service",
          "24/7 security",
          "CCTV surveillance"
        ]
      },
      {
        category: "Location & Access",
        items: [
          "JY Square Mall nearby",
          "Supermarkets walking distance",
          "Banks & ATMs",
          "Cafés & restaurants",
          "Pharmacies",
          "45-60 mins to airport",
          "60 mins to beach areas"
        ]
      }
    ],
    images: ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg", "9.jpg"], // Replace with actual photos
    showImages: true, // Set to false to always show logo instead of property images
    available: true,
    published: true,
    featured: false,
    airbnbLink: "",
    bookingLink: "",
  },
  {
    id: 7,
    slug: "tambuli-seaside-resort",
    name: "Tambuli Seaside Resort & Spa - Studio with Balcony",
    location: "Buyong Road, Maribago, Lapu-Lapu City, Cebu, Philippines",
    category: "for-sale",
    type: "Studio",
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    area: "36 m²",
    price: "₱5,000,000",
    priceUnit: "",
    description:
      "Fully furnished studio on 3rd floor of Tower D with private balcony. Beachfront resort living with direct beach access. Move-in ready investment opportunity.",
    longDescription:
      "Experience beachfront luxury living in this fully furnished 36m² studio apartment located on the 3rd floor of Tower D at Tambuli Seaside Resort & Spa. This move-in-ready unit features a private balcony, complete furnishings, and direct access to the resort's private beach. The property includes world-class amenities such as swimming pools, gym, and spa facilities. Located in Maribago, Lapu-Lapu City, just 15-20 minutes from the airport and surrounded by shopping centers, restaurants, and essential services. Perfect for investors, retirees, or anyone seeking a premium beachfront lifestyle.",
    features: ["Furnished", "Balcony", "Beach Access", "3rd Floor", "Resort Living"],
    amenities: [
      {
        category: "Unit Inclusions",
        items: [
          "Air conditioning",
          "Queen size bed",
          "Refrigerator",
          "TV",
          "Microwave",
          "IH induction cooktop",
          "Range hood",
          "Clothes cabinet",
          "Kitchen cabinet",
          "Hot & cold shower"
        ]
      },
      {
        category: "Resort Amenities",
        items: [
          "Swimming pool",
          "Gym/Fitness center",
          "Spa facilities",
          "Concierge service",
          "24/7 security",
          "CCTV surveillance",
          "Private beach (inside resort)"
        ]
      },
      {
        category: "Nearby Conveniences",
        items: [
          "LG Garden",
          "Mactan Newtown",
          "Metro supermarket",
          "Robinson supermarket",
          "Local & international restaurants",
          "Pharmacies",
          "Airport (15-20 min by car)"
        ]
      }
    ],
    images: ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg", "9.jpg", "10.jpg", "11.jpg", "12.jpg", "13.jpg", "14.jpg", "15.jpg", "16.jpg", "17.jpg", "18.jpg", "19.jpg", "20.jpg"], // Replace with actual photos
    showImages: false, // Set to false to always show logo instead of property images
    available: true,
    published: true,
    featured: false,
    airbnbLink: "",
    bookingLink: "",
  },
];

export const aboutSection = {
  heading: "Why Choose J&M Prestige",
  description:
    "With years of excellence in the luxury real estate market, J&M Prestige Property Corp stands as a beacon of trust, expertise, and unparalleled service.",
  features: [
    {
      title: "Expert Knowledge",
      description:
        "Deep understanding of luxury property markets and investment strategies",
    },
    {
      title: "Personalized Service",
      description:
        "Tailored solutions that align with your unique goals and vision",
    },
    {
      title: "Proven Track Record",
      description:
        "Consistent results and satisfied clients across all service areas",
    },
  ],
};

export const testimonials = [
  {
    id: 1,
    name: "Isandro M.",
    text: "Working with J&M Prestige was exceptional. Their expertise in luxury real estate and attention to detail made our property acquisition seamless and stress-free.",
  },
  {
    id: 2,
    name: "Karolina M.",
    text: "The team's professionalism and market knowledge are unmatched. They helped us find the perfect investment property and managed the entire development process flawlessly.",
  },
  {
    id: 3,
    name: "Tomasz L.",
    text: "Outstanding service from start to finish. J&M Prestige's property management services have exceeded our expectations, maximizing returns while minimizing hassle.",
  },
];

export const contactSection = {
  heading: "Let's Connect",
  description:
    "Ready to elevate your real estate journey? Get in touch with our team of experts.",
  formLabels: {
    name: "Full Name",
    email: "Email",
    message: "Message",
    submit: "Send Message",
  },
  placeholders: {
    name: "Your name",
    email: "your@email.com",
    message: "Tell us about your real estate needs...",
  },
};
