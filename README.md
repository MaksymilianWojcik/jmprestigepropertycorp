# J&M PRESTIGE PROPERTY CORP Website

A luxury real estate website built with Next.js, React, TypeScript, and Tailwind CSS. Features a sophisticated black and gold theme showcasing real estate services including Buy & Sell, Property Management, Investments, and Development.

## 🚀 Quick Start

### Prerequisites
- Node.js 20+ installed
- npm, yarn, pnpm, or bun package manager

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

## 📝 Updating Website Content

**Non-technical users:** All website text can be edited in one place!

👉 **See [CONTENT_GUIDE.md](./CONTENT_GUIDE.md) for detailed instructions**

Quick edit: Open `src/app/content.ts` and change any text between the quotes.

### For Developers: Content Management

All content is centralized in `src/app/content.ts`:

**Company Information:**
```typescript
export const siteInfo = {
  companyName: "J&M PRESTIGE",
  email: "jmprestigepropertycorp@gmail.com",
  phones: { philippines: "+63...", poland: "+48..." },
  // ... etc
};
```

**Services:**
```typescript
export const services = [
  { id: "buy-sell", icon: "🏡", title: "Buy & Sell", ... },
  // Add/remove services here
];
```

**Properties (Short-Term Rentals):**
```typescript
export const properties = [
  {
    id: 1,
    slug: "luxury-apartment-szczecin",  // ⚠️ CRITICAL: Used for URLs AND image paths
    name: "Luxury Apartment in Szczecin",
    location: "Szczecin, Poland",
    bedrooms: 2,
    bathrooms: 1,
    price: "€80",
    priceUnit: "per night",
    features: ["WiFi", "Parking", ...],
    images: ["image-1.jpg", "image-2.jpg"],  // Auto-paths to /properties/{slug}/
    showImages: true,  // Set to false to show logo instead
    available: true,
    published: true,
    featured: false,
  },
  // Add more properties here
];
```

**⚠️ IMPORTANT: Understanding the `slug` and `cloudinaryFolder` Fields**

The `slug` and `cloudinaryFolder` are two different but important fields:

**1. `slug`** - Used for URLs and property identification
   - Creates the property detail page URL
   - Example: `slug: "luxury-apartment-szczecin"` → `/properties/luxury-apartment-szczecin`
   - Must be unique (no two properties can have the same slug)
   - URL-friendly format (lowercase, use hyphens `-` not spaces)

**2. `cloudinaryFolder`** - Used for Cloudinary image hosting
   - Specifies which Cloudinary folder contains this property's images
   - Example: `cloudinaryFolder: "optb15n"` → Images load from Cloudinary folder "optb15n"
   - Can be empty (`""`) if not using Cloudinary yet
   - Must exactly match the folder name in your Cloudinary Media Library

**Slug vs CloudinaryFolder:**
```typescript
{
  slug: "onepacific-tb-15n",        // URL: /properties/onepacific-tb-15n
  cloudinaryFolder: "optb15n",       // Images: cloudinary.com/.../optb15n/
  images: ["op_tb15n1.jpeg"],        // Filename in Cloudinary folder
}
```

**How Images Work with Cloudinary:**

```typescript
// In content.ts
{
  cloudinaryFolder: "optb15n",         // Cloudinary folder name
  images: ["op_tb15n1.jpeg", "op_tb15n2.jpeg"],  // Just filenames!
  showImages: true,                    // false = show logo, true = show images
}

// Automatically resolves to:
// https://res.cloudinary.com/du85wguro/image/upload/optb15n/op_tb15n1.jpeg
```

👉 **See [CLOUDINARY_GUIDE.md](./CLOUDINARY_GUIDE.md) for complete image hosting guide**

**To add a new property:**
1. **Choose a slug** (URL-friendly name, e.g., `"modern-studio-cebu"`)
   - ⚠️ CRITICAL: The slug creates the property URL
2. **Upload images to Cloudinary** (see [CLOUDINARY_GUIDE.md](./CLOUDINARY_GUIDE.md))
   - Create a folder in Cloudinary Media Library
   - Upload property images to that folder
   - Note the folder name (e.g., `"modern-studio"`)
3. Copy an existing property object in `content.ts`
4. Update all fields:
   - `id` - Unique number
   - `slug` - URL-friendly identifier
   - `cloudinaryFolder` - Cloudinary folder name (or `""` if not using Cloudinary)
   - `name` - Display name
   - `category` - Either `"short-term-rental"` or `"for-sale"`
   - `price` and `priceUnit`
   - `features`, `amenities`, etc.
5. Add image filenames to `images: ["1.jpg", "2.jpg", ...]`
   - Only filenames needed, URLs are auto-generated from cloudinaryFolder
6. Set `showImages: true` when ready to display images
7. Set `published: true` to make visible on the website

**Property Categories:**
- `short-term-rental` - Properties available for short-term stays (shown in Featured Properties)
- `for-sale` - Properties available for purchase

**Property Filtering:**
The properties page (`/properties`) includes a filter system:
- Click "View All Properties" from Featured section → shows short-term rentals
- Users can switch between "All Properties", "Short-Term Rentals", and "For Sale"
- URL parameter: `/properties?category=short-term-rental` or `/properties?category=for-sale`

**Component Architecture:**
- `components.tsx` - Reusable UI components
  - `ServiceCard` - Service display cards
  - `PropertyCard` - Rental property cards
  - `TestimonialCard` - Client testimonials
  - `FeatureItem` - About section features
  - `ContactInfoItem` - Contact info display
- `page.tsx` - Main page layout using data from `content.ts`

## 🏗️ Project Structure

```
├── src/
│   └── app/
│       ├── content.ts        # ⭐ All website content (services, properties, testimonials, etc.)
│       ├── components.tsx    # Reusable UI components (PropertyCard, ServiceCard, etc.)
│       ├── page.tsx          # Main homepage layout & logic
│       ├── properties/
│       │   ├── page.tsx      # Properties listing with filters
│       │   └── [slug]/
│       │       └── page.tsx  # Individual property detail pages (uses slug!)
│       ├── layout.tsx        # App layout & metadata
│       └── globals.css       # Global styles & theme colors
├── public/
│   ├── properties/           # ⚠️ Property images MUST be organized by slug
│   │   ├── {property-slug}/  # ← Folder name MUST match property's slug field!
│   │   │   ├── image-1.jpg
│   │   │   └── image-2.jpg
│   │   └── ...
│   ├── logo.png             # Company logo (gold) - used as fallback
│   ├── logoblack.png        # Company logo (black)
│   └── jmbackground.jpg     # Hero section background
├── CONTENT_GUIDE.md         # Guide for non-technical content updates
└── README.md                # This file (technical documentation)
```

### 🔗 How the Slug and Cloudinary Connect

```
┌─────────────────────────────────────────────────────────────────┐
│ content.ts                                                      │
├─────────────────────────────────────────────────────────────────┤
│ {                                                               │
│   slug: "onepacific-tb-15n",     ← Creates property URL        │
│   cloudinaryFolder: "optb15n",   ← Cloudinary folder name      │
│   images: ["op_tb15n1.jpeg"]     ← Image filename              │
│ }                                                               │
└────────────┬──────────────────────┬──────────────────────────────┘
             │                      │
             ├─ Creates URL         ├─ Loads from Cloudinary
             │                      │
             ▼                      ▼
  /properties/onepacific-tb-15n    https://res.cloudinary.com/
       (Property page URL)          du85wguro/image/upload/
                                    optb15n/op_tb15n1.jpeg
                                    (Cloudinary CDN URL)
```

**Key Points:** 
- `slug` creates the property page URL
- `cloudinaryFolder` determines where images are hosted
- These are independent - they don't need to match!

## 🎨 Features

- **Luxury Design**: Black and gold theme with elegant animations
- **Responsive**: Fully responsive design for all devices
- **SEO Optimized**: Proper meta tags and semantic HTML
- **Type-Safe**: Built with TypeScript
- **Easy to Maintain**: All content in one file (`content.ts`)
- **Reusable Components**: Clean component architecture
- **Smooth Scrolling**: Section navigation with scroll tracking
- **Contact Form**: Integrated email contact form

## 📦 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Fonts**: [Geist](https://vercel.com/font) (Sans & Mono)
- **Image Optimization**: Next.js Image component

## 🎯 Sections

1. **Hero** - Full-screen background with CTAs
2. **Services** - 4 service cards (Buy & Sell, Short-Term Rentals, Property Management, Investments)
3. **Properties** - Featured short-term rental properties with details & pricing
4. **About** - Why Choose J&M Prestige with features
5. **Testimonials** - Client testimonials
6. **Contact** - Contact form and company information
7. **Footer** - Copyright and links

## 📋 Common Tasks & How-Tos

### 🔗 Managing Navigation & Links

All navigation and links are configured in `src/app/content.ts`:

#### Update Navigation Section Links
Navigation items are automatically generated from section IDs. To modify:
1. Open `src/app/page.tsx`
2. Find the `<nav>` section
3. Update `href` attributes (e.g., `#services`, `#about`, `#contact`)

#### Update Service Card Links
```typescript
// In content.ts
export const services = [
  {
    id: "buy-sell",
    ctaText: "View Property Listings",
    ctaLink: "/properties?category=for-sale", // Change this link
  },
  // ...
];
```

**Link types:**
- **Internal sections**: Use `#section-id` (e.g., `#contact`, `#services`)
- **Internal pages**: Use `/page-name` (e.g., `/properties`)
- **With filters**: Add query params (e.g., `/properties?category=for-sale`)
- **External links**: Use full URLs (e.g., `https://example.com`)

#### Hero Section CTAs
```typescript
// In content.ts
export const heroSection = {
  ctaButtons: [
    { text: "Explore Services", href: "#services" },
    { text: "Contact Us", href: "#contact" },
  ],
};
```

### 🏠 Managing Properties

#### Property Amenities Structure

Amenities are organized by category for better readability:

```typescript
amenities: [
  {
    category: "General Amenities",
    items: [
      "High-speed Wi-Fi",
      "Air conditioning",
      "Smart TV"
    ]
  },
  {
    category: "Kitchen Essentials",
    items: [
      "Rice cooker",
      "Electric kettle",
      "Frying pan & basic cookware"
    ]
  }
]
```

**Property Fields:**
- `bedrooms` - Number of bedrooms
- `bathrooms` - Number of bathrooms  
- `maxGuests` - Maximum number of guests (shown as "👥 2 Guests")
- `area` - Property size (e.g., "34 m²")
- `price` - Price (with currency symbol)
- `priceUnit` - "per night" for rentals, empty `""` for sales
- `category` - "short-term-rental" or "for-sale"
- `published` - `true` to show in listings, `false` to hide
- `featured` - `true` to show on homepage, `false` to show only in listings
- `available` - `true` if available, `false` if booked/sold

**Common Categories:**
- `General Amenities` - WiFi, AC, TV, balcony, etc.
- `Kitchen Essentials` - Appliances and cookware
- `Bathroom Comfort` - Hot water, toiletries, etc.
- `Work & Entertainment` - Workspace, streaming, etc.
- `Outdoor & Recreation` - Pool, gym, parking, etc.

**Tips:**
- Keep items concise (one line each)
- Group logically by room/function
- Use professional language
- Add category only if you have items for it

#### Add a Short-Term Rental Property

**Step-by-step process:**

1. **Choose a URL-friendly slug** (this is critical!)
   - Example: `"modern-loft-downtown"`
   - Must be lowercase with hyphens (no spaces or special characters)
   - This slug determines BOTH the URL AND the image folder path

2. **Create the image folder** at `/public/properties/{slug}/`
   - Example: `/public/properties/modern-loft-downtown/`

3. **Add images** to that folder
   - Example: `image-1.jpg`, `image-2.jpg`, etc.

4. **Add property to content.ts:**

```typescript
// In content.ts - properties array
{
  id: 3,
  slug: "modern-loft-downtown",          // ⚠️ Must match folder name above!
  name: "Modern Loft Downtown",
  location: "Szczecin, Poland",
  category: "short-term-rental",        // Important: for filtering
  type: "Loft",
  bedrooms: 1,
  bathrooms: 1,
  maxGuests: 2,
  area: "45 m²",
  price: "€55",
  priceUnit: "per night",
  description: "Short description for cards...",
  longDescription: "Detailed description for property page...",
  features: ["WiFi", "Parking", "Kitchen"], // Shown as tags
  // Categorized amenities
  amenities: [
    {
      category: "General Amenities",
      items: [
        "High-speed Wi-Fi",
        "Air conditioning",
        "Free Parking"
      ]
    },
    {
      category: "Kitchen Essentials",
      items: [
        "Rice cooker",
        "Electric kettle"
      ]
    }
  ],
  images: ["image-1.jpg", "image-2.jpg"],  // Only filenames - paths auto-generated!
  showImages: true,                        // false = show logo, true = show images
  available: true,
  published: true,                         // false = hidden, true = visible
  featured: false,                         // true = show on homepage
  airbnbLink: "https://airbnb.com/...",   // Optional
  bookingLink: "https://booking.com/...", // Optional
}
```

**How the slug connects everything:**
- URL: `/properties/modern-loft-downtown` (from slug)
- Images: `/public/properties/modern-loft-downtown/image-1.jpg` (from slug + filename)
- Navigation: Next.js uses slug to find and display the right property
```

#### Add a Property Available for Both Sale & Rent

If a property is available for both sale AND rent, create two separate entries:

```typescript
// Entry 1: For Sale
{
  id: 5,
  slug: "hayat-sky-tower-sale",
  name: "Hayat Sky Tower Studio - For Sale",
  category: "for-sale",
  price: "₱3,200,000",
  priceUnit: "",
  // ... other fields
},

// Entry 2: For Rent
{
  id: 6,
  slug: "hayat-sky-tower-rent", 
  name: "Hayat Sky Tower Studio - For Rent",
  category: "short-term-rental",
  price: "₱25,000",
  priceUnit: "per month",
  // ... other fields
}
```

**Benefits of separate entries:**
- Clear pricing for each option
- Appears in appropriate filter categories
- Can feature one or both
- Separate analytics/tracking
- Users see the option relevant to them

**Tip:** Use the same images folder or create separate ones if needed.

#### Add a Property for Sale
```typescript
{
  id: 3,
  slug: "luxury-villa-marbella",
  name: "Luxury Villa with Ocean View",
  location: "Marbella, Spain",
  category: "for-sale",                  // Set to for-sale
  type: "Villa",
  bedrooms: 4,
  bathrooms: 3,
  maxGuests: 8,
  area: "350 m²",
  price: "€1,250,000",                   // Total price
  priceUnit: "",                         // Empty for for-sale
  description: "Stunning Mediterranean villa...",
  longDescription: "This exceptional villa...",
  features: ["Ocean View", "Private Pool", "Garden"],
  amenities: [
    {
      category: "Property Features",
      items: [
        "Private swimming pool",
        "Landscaped garden",
        "2-car garage"
      ]
    }
  ],
  images: ["image-1.jpg"],
  available: true,
  published: false,                      // Hide until ready
  airbnbLink: "",                        // Not applicable
  bookingLink: "",                       // Not applicable
}
```

**Key Differences for For-Sale Properties:**
- `priceUnit: ""` - Leave empty (no "per night")
- `published: false` - Hide while preparing listing
- `maxGuests` - Still relevant for villa viewings/capacity
- Status badge shows "For Sale" instead of "Available/Booked"
- CTA button says "Request Information" instead of "Contact to Book"
- No Airbnb/Booking.com links

#### Control Property Visibility

Use the `published` and `featured` flags to control where properties appear:

```typescript
// Hide from all listings (draft mode)
published: false,
featured: false,

// Show in listings only
published: true,
featured: false,

// Show in listings AND homepage Featured section
published: true,
featured: true,
```

**Flags explained:**
- **`published`** - Controls visibility in ALL listings
  - `false` = Hidden everywhere (except direct URL)
  - `true` = Shown in properties page
- **`featured`** - Controls homepage Featured section
  - `false` = Not shown on homepage
  - `true` = Shown in homepage Featured section (max 2)

**Use cases:**
- **Preparing a listing**: `published: false, featured: false`
- **Regular listing**: `published: true, featured: false`
- **Highlight property**: `published: true, featured: true`

**Featured Properties Section:**
- Shows maximum 2 properties with `featured: true`
- Can include both rentals AND for-sale properties
- "View All Properties" button links to main listings (all categories)

#### Update Property Status

```typescript
// Short-term rental status
available: true,   // Shows "Available" badge (green)
available: false,  // Shows "Booked" badge (red)

// For-sale properties
// available field ignored, always shows "For Sale" badge (blue)
```

**Status badges appear:**
- Top-left corner of property cards
- Next to price on property detail pages
- Color-coded for quick recognition

#### Update Airbnb/Booking.com Links
```typescript
// In content.ts - within a property object
airbnbLink: "https://airbnb.com/rooms/12345678",
bookingLink: "https://booking.com/hotel/property-name",
```

**Important:** 
- Links automatically hidden if empty (`""`) or placeholder (`"#"`)
- The system adds `https://` if missing
- Test links after updating

### 📧 Update Contact Information

```typescript
// In content.ts
export const siteInfo = {
  email: "newemail@example.com",
  phones: {
    philippines: "+63 XXX XXX XXXX",
    poland: "+48 XXX XXX XXX",
  },
  address: {
    street: "New Street 123",
    city: "City Name, Country",
  },
};
```

**Where this appears:**
- Contact section
- Footer
- Contact form email recipient
- Property detail "Contact to Book" button

### 👥 Managing Testimonials

```typescript
// In content.ts
export const testimonials = [
  {
    id: 1,
    name: "First N.",                    // Use first name + initial
    text: "Working with J&M Prestige...", // Keep under 200 chars
  },
  // Add more testimonials
];
```

**Tips:**
- Keep testimonials authentic and specific
- Use first name + initial for privacy (e.g., "John D.")
- Avoid overly promotional language
- 2-3 sentences is ideal length

### 🎨 Updating Services

```typescript
// In content.ts
export const services = [
  {
    id: "unique-id",                     // Used for filtering
    icon: "🏡",                          // Emoji icon
    title: "Service Name",
    description: "Brief description...", // 2-3 sentences
    ctaText: "Action Text",              // Button label
    ctaLink: "/link-or-#section",        // Where button goes
  },
];
```

**Service card order:**
The order in the array is the display order on the homepage.

### 🖼️ Managing Images

#### Add Property Images

**Organized Folder Structure:**
```
public/
├── properties/
│   ├── luxury-apartment-szczecin/
│   │   ├── image-1.jpg
│   │   ├── image-2.jpg
│   │   └── image-3.jpg
│   ├── executive-suite-downtown/
│   │   ├── image-1.jpg
│   │   └── image-2.jpg
│   └── villa-oceanview/
│       ├── image-1.jpg
│       └── ...
├── logo.png
└── jmbackground.jpg
```

**Steps to add property images:**

1. **Create folder** for the property in `/public/properties/`:
   - Use the property's `slug` as the folder name
   - Example: `/public/properties/luxury-apartment-szczecin/`

2. **Add images** to the property folder:
   - Name them descriptively: `image-1.jpg`, `image-2.jpg`, `living-room.jpg`, etc.
   - Recommended: Number them in order you want them displayed

3. **Update `content.ts`**:
```typescript
{
  slug: "luxury-apartment-szczecin",
  // ... other fields ...
  images: ["image-1.jpg", "image-2.jpg", "image-3.jpg"],
  // Path is auto-generated: /properties/{slug}/{filename}
}
```

**Benefits of this structure:**
- ✅ Easy to manage - each property has its own folder
- ✅ Clean organization - no mixing of images
- ✅ Simple paths in content.ts - just filenames
- ✅ Easy to backup/delete entire property with all images

**Image recommendations:**
- Format: JPG (photos), PNG (if transparency needed)
- Size: 1920x1080px or larger
- Optimize before uploading (under 500KB each)
- Use consistent aspect ratios (16:9 recommended)

#### Replace Logo
1. Replace `/public/logo.png` with your logo
2. Recommended: Square or horizontal format
3. Transparent background (PNG format)
4. Minimum 500x500px for quality

#### Replace Hero Background
1. Replace `/public/jmbackground.jpg`
2. Recommended: 1920x1080px or larger
3. High quality, well-lit image
4. Keep important content away from top/bottom edges

### 🔄 Property Filtering System

The properties page has three filter options:
- **All Properties** - Shows everything
- **Short-Term Rentals** - Only `category: "short-term-rental"`
- **For Sale** - Only `category: "for-sale"`

**How it works:**
1. Service cards link to filtered views (e.g., `/properties?category=for-sale`)
2. Featured Properties section shows only short-term rentals
3. Filter selection updates URL (persists on refresh)
4. "View All Properties" from homepage shows short-term rentals filter

### 📱 Mobile Navigation

Mobile menu appears automatically on small screens:
- Hamburger icon toggles menu
- Same navigation items as desktop
- Menu closes on selection

**No configuration needed** - fully automatic!

## 🔧 Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Create production build
npm start        # Run production build
npm run lint     # Run ESLint
```

### Environment Setup

No environment variables required for basic functionality. The contact form uses `mailto:` links.

## 📱 Responsive Design

- **Mobile**: Optimized layout with hamburger menu
- **Tablet**: Responsive grid layouts
- **Desktop**: Full-featured layout with all elements

## 🎨 Customization

### Theme Colors

Edit brand colors in `src/app/globals.css` (lines 6-20):

```css
/* Primary Brand Gold - Buttons, headings, icons, borders */
--gold: #D4AF37;

/* Light Gold - Button hover states, highlights */
--gold-light: #F4E4B0;

/* Dark Gold - Gradients, shadows */
--gold-dark: #B8941E;

/* Background & Text */
--background: #000000;  /* Black background */
--foreground: #ffffff;  /* White text */
```

**Where colors are used:**
- `--gold`: Navigation links, service icons, CTA buttons, section titles, borders
- `--gold-light`: Button hover effects, gradient accents
- `--gold-dark`: Service card gradients, darker accents
- `--background`: Main sections, cards, navigation
- `--foreground`: All primary text content

**Pro tip:** Keep contrast high for accessibility. Test with different screen brightness.

### Images

Replace files in `/public/`:
- `logo.png` - Company logo
- `jmbackground.jpg` - Hero background image

### Content

Edit `src/app/content.ts` - all text in one file:
- Company information
- Services descriptions
- Testimonials
- Contact details

## 🚀 Deployment

### Recent Improvements

**Latest Updates:**

1. **Image Organization System** ✅
   - Properties now have dedicated image folders: `/public/properties/{slug}/`
   - Simplified image paths in `content.ts` - just list filenames
   - Auto-generated full paths via utility functions
   - See "Managing Images" section above for details

2. **Enhanced Image Quality** ✅
   - Increased quality to 95% (from default 75%)
   - Property detail pages use `object-contain` for full image display
   - Property cards use `object-cover` for consistent thumbnails
   - Responsive image sizing for optimal loading

3. **Improved Navigation UX** ✅
   - Back button moved to left side (standard UX pattern)
   - Uses browser history (`router.back()`) - intelligent navigation
   - Filter changes don't pollute browser history (`router.replace()`)
   - Navigation persists scroll position

4. **Better Carousel Indicators** ✅
   - Property detail pages: indicators below image (more visible)
   - Property cards: indicators on image (space-efficient)
   - Configurable via `indicatorsOutside` prop
   - Gold color scheme for better visibility

5. **Categorized Amenities** ✅
   - Amenities organized by category (General, Kitchen, Bathroom, etc.)
   - Professional text-only format (no emojis)
   - Easy to scan and understand
   - Flexible category structure

6. **Guest Capacity (Pax)** ✅
   - Added `maxGuests` field to properties
   - Displayed as "👥 2 Guests" on property details
   - Important info for booking decisions

7. **For-Sale Property Support** ✅
   - Complete support for properties for sale
   - Different pricing display (total price, no "per night")
   - Status badge shows "For Sale" instead of "Available/Booked"
   - CTA button says "Request Information"
   - Example villa property added (hidden by default)

8. **Property Visibility Control** ✅
   - Added `published` flag to each property
   - Set `published: false` to hide from listings (draft mode)
   - Set `published: true` to show publicly
   - Useful for preparing listings before launch

9. **Featured Properties System** ✅
   - Added `featured` flag to highlight specific properties
   - Homepage Featured section shows up to 2 featured properties
   - Can feature both rentals AND for-sale properties
   - Independent from `published` flag

10. **Status Badges on Cards** ✅
   - Property cards now show status in top-left corner
   - Rentals: "Available" (green) or "Booked" (red)
   - Sales: "For Sale" (blue)
   - Consistent with property detail pages

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or connect your GitHub repository to [Vercel](https://vercel.com) for automatic deployments.

### Other Platforms

The site can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- Render

## 🧩 Component Architecture

### Reusable Components (`src/app/components.tsx`)

All UI components are defined here for reusability:

#### `ImageCarousel`
Displays multiple property images with navigation.
- **Props**: 
  - `images[]` - Array of image paths
  - `altPrefix` - Alt text prefix for images
  - `showIndicators` - Show/hide navigation dots (default: true)
  - `indicatorsOutside` - Place indicators below image (default: false)
  - `className` - Container styling
  - `imageClassName` - Image styling (object-cover/contain)
  - `buttonSize` - 'sm' or 'lg' for arrow buttons
- **Features**: 
  - Arrow navigation with keyboard support
  - Dot indicators (inside or outside image)
  - High-quality image rendering (95%)
  - Responsive sizing
  - Smooth transitions
- **Used in**: Property cards, property detail pages
- **Example**:
```typescript
<ImageCarousel 
  images={["img1.jpg", "img2.jpg"]}
  altPrefix="Property Name"
  indicatorsOutside={true}  // For detail pages
  buttonSize="lg"
/>
```

#### `ServiceCard`
Displays service information with icon and CTA.
- **Props**: `icon`, `title`, `description`, `ctaText`, `ctaLink`
- **Features**: Hover effects, gradient animation
- **Used in**: Services section

#### `PropertyCard`
Displays property listing preview.
- **Props**: All property fields (name, price, features, images, etc.)
- **Features**: Image carousel, feature tags, responsive grid
- **Used in**: Homepage, properties listing page

#### `TestimonialCard`
Displays client testimonial.
- **Props**: `name`, `text`
- **Features**: Quote styling, hover effects
- **Used in**: Testimonials section

#### `SimpleFooter`
Minimal footer for property pages.
- **Props**: None (pulls from `siteInfo`)
- **Features**: Logo, copyright, responsive
- **Used in**: Properties pages (listing + detail)

### Page Structure

```
src/app/
├── page.tsx                    # Homepage (main landing)
├── properties/
│   ├── page.tsx               # Properties listing (with filters)
│   └── [slug]/
│       └── page.tsx           # Individual property details
├── components.tsx             # All reusable components
├── content.ts                 # All website content/data
├── layout.tsx                 # App wrapper, metadata
└── globals.css                # Theme colors, global styles
```

## 🐛 Troubleshooting

### Images Not Displaying
1. **Check slug matches folder name** ⚠️ Most common issue!
   - Property slug in `content.ts`: `"hayat-sky-tower-sale"`
   - Folder name: `/public/properties/hayat-sky-tower-sale/` (must match exactly!)
2. Check image files exist in `/public/properties/{slug}/` folder
3. Verify image filenames in `content.ts` match actual filenames
4. Check `showImages: true` (not `false`)
5. Image names are case-sensitive (`Image-1.jpg` ≠ `image-1.jpg`)
6. Supported formats: JPG, PNG, WebP, GIF

### Property Page Shows "404 Not Found"
1. **Check slug format** - must be lowercase with hyphens, no spaces
2. Verify property exists in `properties` array in `content.ts`
3. Check slug is unique (no duplicates)
4. Restart dev server after adding new properties

### Property Showing Logo Instead of Images
1. Check `showImages: true` (not `false`)
2. Verify folder name matches slug exactly
3. Check images exist in correct folder: `/public/properties/{slug}/`
4. Verify image filenames in `content.ts` match actual files
5. Check browser console for image loading errors

### Links Not Working
1. Internal sections must start with `#` (e.g., `#contact`)
2. Internal pages start with `/` (e.g., `/properties`)
3. External links need full URL with `https://`
4. Check for typos in section IDs

### Property Not Appearing
1. Verify `category` field is set correctly
2. Check property is in `properties` array in `content.ts`
3. Ensure `available: true` if you want it shown
4. Check filter selection on properties page

### Filter Not Working
1. Check URL parameter format: `?category=short-term-rental`
2. Verify property `category` matches filter value
3. Clear browser cache and refresh
4. Check browser console for errors

### Mobile Menu Not Working
1. Should auto-appear on screens < 768px
2. Check browser console for errors
3. Try clearing cache and hard refresh
4. Verify JavaScript is enabled

### Contact Form Not Sending
1. Current setup uses `mailto:` - requires email client
2. User's email client must be configured
3. Consider integrating a form service (FormSpree, EmailJS)
4. Check `siteInfo.email` is correct

## ✅ Code Quality Checklist

Before deploying changes:

- [ ] All content in `content.ts` is spell-checked
- [ ] All images optimized (under 500KB each)
- [ ] All links tested (internal and external)
- [ ] Mobile responsiveness checked
- [ ] Property filters work correctly
- [ ] Contact information is up-to-date
- [ ] Logo and branding assets updated
- [ ] Run `npm run build` successfully
- [ ] No console errors in browser
- [ ] Tested on multiple browsers

## 🔐 Best Practices

### Content Management
- Keep all text in `content.ts` - never hardcode in JSX
- Use descriptive IDs and slugs (URL-friendly)
- Keep descriptions concise and clear
- Update copyright year annually
- Use utility functions (`getPropertyImages`) instead of manual paths

### Images
- Organize in `/public/properties/{slug}/` folders
- Optimize before uploading (use TinyPNG, ImageOptim)
- Use descriptive filenames: `image-1.jpg`, `bedroom.jpg`, etc.
- Keep consistent naming within each property folder
- In `content.ts`, list only filenames (paths auto-generated)
- Maintain consistent aspect ratios per section
- Test on retina/high-DPI displays

### Performance
- Limit property images to 3-5 per listing
- Compress images to under 500KB
- Use Next.js Image component (already implemented)
- Test load time on slower connections

### SEO
- Update page titles in `layout.tsx`
- Add descriptive alt text to images
- Keep URLs clean and descriptive
- Use proper heading hierarchy (H1, H2, H3)

## 📄 License

Copyright © 2023 J&M PRESTIGE PROPERTY CORP. All rights reserved.

## 🤝 Support

For questions or issues, contact:
- Email: jmprestigepropertycorp@gmail.com
- Phone (PH): +63 967 097 2465
- Phone (PL): +48 662 993 676

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
