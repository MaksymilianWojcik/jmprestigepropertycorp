# Content Management Guide

This guide explains how to update text and content on the J&M Prestige website. **No coding experience required!**

## Quick Start

All website content is stored in one easy-to-edit file:
**`src/app/content.ts`**

Simply open this file and edit the text between the quotes. Save the file, and your changes will appear on the website.

---

## How to Update Different Sections

### 1. Company Information

Located at the top of `content.ts`:

```typescript
export const siteInfo = {
  companyName: "J&M PRESTIGE",           // Company name
  companySubtitle: "PROPERTY CORP",      // Subtitle
  email: "jmprestigepropertycorp@gmail.com",  // Contact email
  phones: {
    philippines: "+63 967 097 2465",     // Philippines phone
    poland: "+48 662 993 676",           // Poland phone
  },
  address: {
    street: "Swarozyca 15A",             // Street address
    city: "71-601 Szczecin, Poland",     // City and postal code
  },
  foundedYear: 2023,                     // Company founding year
};
```

**What to edit:** Change any text between the quotes to update company information.

---

### 2. Homepage Buttons

```typescript
export const heroSection = {
  ctaButtons: [
    { text: "Explore Services", href: "#services" },    // First button
    { text: "Contact Us", href: "#contact" },           // Second button
  ],
};
```

**What to edit:** Change the button text. Don't change the `href` values unless you know what you're doing.

---

### 3. Services Section

Each service has 4 parts: icon, title, description, and button text.

```typescript
{
  id: "buy-sell",                        // Internal ID (don't change)
  icon: "🏡",                            // Emoji icon
  title: "Buy & Sell",                   // Service name
  description: "Expert guidance...",     // Service description
  ctaText: "View Property Listings",     // Button text
}
```

**To add a new service:** Copy an entire service block (from `{` to `}`) and paste it at the end of the list. Update all the fields.

**To remove a service:** Delete the entire service block including the commas.

---

### 4. About Section

```typescript
export const aboutSection = {
  heading: "Why Choose J&M Prestige",
  description: "With years of excellence...",
  features: [
    {
      title: "Expert Knowledge",               // Feature title
      description: "Deep understanding...",    // Feature description
    },
    // Add more features here...
  ],
};
```

**To add a new feature:** Copy a feature block and paste it inside the `features` array.

---

### 5. Testimonials

```typescript
{
  id: 1,                                 // Must be unique number
  name: "Isandro M.",                    // Client name
  text: "Working with J&M Prestige...",  // Testimonial text
}
```

**To add a testimonial:** Copy a testimonial block, change the `id` to a new number, and update the name and text.

**To remove a testimonial:** Delete the entire testimonial block.

---

### 6. Properties (Rentals & Sales)

Each property has many fields. The most important one is the **`slug`**.

#### ⚠️ Understanding the `slug` Field

The `slug` is like a property's ID card - it's used for 3 things:

1. **Website URL**: Creates the property page address
   - Example: `slug: "hayat-sky-tower-sale"` → Website shows at `/properties/hayat-sky-tower-sale`

2. **Image Folder**: Tells where to find property photos
   - The system looks for photos in `/public/properties/{slug}/`
   - Example: `slug: "hayat-sky-tower-sale"` → Photos go in `/public/properties/hayat-sky-tower-sale/`

3. **Property Finder**: Helps the system load the correct property when someone clicks on it

#### Slug Rules:
- Must be unique (no two properties can use the same slug)
- Use lowercase letters and hyphens (not spaces)
- Example: `"modern-apartment-cebu"` ✅
- Not: `"Modern Apartment Cebu"` ❌ (has spaces and capitals)

#### Property Example:

```typescript
{
  id: 5,                                    // Unique number
  slug: "hayat-sky-tower-sale",            // ⚠️ MATCHES folder name below!
  name: "Hayat Sky Tower Studio - For Sale", // Display name
  location: "Cebu City, Philippines",
  category: "for-sale",                    // or "short-term-rental"
  price: "₱3,200,000",
  priceUnit: "",                           // Empty for sale, "per night" for rent
  description: "Short description...",
  features: ["Furnished", "Balcony"],
  images: ["1.jpg", "2.jpg", "3.jpg"],    // Just filenames!
  showImages: true,                        // false = show logo, true = show photos
  published: true,                         // false = hide, true = show
  featured: false,                         // true = show on homepage
}
```

#### How Images Work:

**Folder structure:**
```
public/
  properties/
    hayat-sky-tower-sale/        ← Folder name MUST match slug!
      1.jpg
      2.jpg
      3.jpg
```

**In content.ts:**
```typescript
slug: "hayat-sky-tower-sale",    // Must match folder name
images: ["1.jpg", "2.jpg"],      // Just the filenames
showImages: true,                // Show the photos (not logo)
```

**The system automatically creates the full path:**
- From: `images: ["1.jpg"]`
- To: `/properties/hayat-sky-tower-sale/1.jpg`

#### Key Fields Explained:

- **`slug`** - URL and folder name (must match!)
- **`name`** - What users see as the property title
- **`category`** - Either `"short-term-rental"` or `"for-sale"`
- **`showImages`** - `true` shows photos, `false` shows logo
- **`published`** - `true` makes it visible, `false` hides it
- **`featured`** - `true` shows on homepage (max 2 properties)
- **`available`** - For rentals: `true` = available, `false` = booked

#### To Add a New Property:

1. **Choose a slug** (e.g., `"modern-studio-cebu"`)
2. **Create folder**: `/public/properties/modern-studio-cebu/`
3. **Add photos** to that folder (name them 1.jpg, 2.jpg, etc.)
4. **Copy** an existing property in `content.ts`
5. **Update all fields** (especially `slug`, `name`, `price`)
6. **Set** `images: ["1.jpg", "2.jpg"]` (just filenames)
7. **Set** `showImages: true` (to show photos)
8. **Set** `published: true` (to make visible)

---

### 7. Contact Form

```typescript
export const contactSection = {
  heading: "Let's Connect",
  description: "Ready to elevate...",
  formLabels: {
    name: "Full Name",           // Name field label
    email: "Email",              // Email field label
    message: "Message",          // Message field label
    submit: "Send Message",      // Submit button text
  },
  placeholders: {
    name: "Your name",           // Name field placeholder
    email: "your@email.com",     // Email field placeholder
    message: "Tell us about...", // Message field placeholder
  },
};
```

---

## File Structure

```
src/
  app/
    content.ts       ← ⭐ Edit THIS file for all text changes
    components.tsx   ← Don't touch (technical components)
    page.tsx         ← Don't touch (page layout)
    globals.css      ← Edit for color changes (see below)
```

## Changing Colors

Want to change the gold color to a different brand color?

Open `src/app/globals.css` and find this section (around line 6-20):

```css
--gold: #D4AF37;          /* Change this hex code */
--gold-light: #F4E4B0;    /* Light version */
--gold-dark: #B8941E;     /* Dark version */
```

**What each color affects:**
- `--gold`: Buttons, section titles, icons, navigation links
- `--gold-light`: Button hover effects
- `--gold-dark`: Subtle shadows and gradients

**Pro tip:** Use a color picker tool to find hex codes for your brand colors!

---

## Tips

✅ **DO:**
- Edit text between quotes `"like this"`
- Add or remove items from lists
- Change numbers (like phone numbers or years)
- Copy and paste existing blocks to add more items
- Make sure property `slug` matches the folder name in `/public/properties/`
- Use `showImages: false` when photos aren't ready yet

❌ **DON'T:**
- Delete commas or brackets `{ } [ ]`
- Change field names (like `companyName:` or `title:` or `slug:`)
- Remove the `export` keywords
- Edit `components.tsx` or `page.tsx` unless you're a developer
- Change a property's slug after it's published (breaks links)
- Use spaces or special characters in slugs

---

## Need Help?

If you break something:
1. Press `Ctrl+Z` (Windows) or `Cmd+Z` (Mac) to undo
2. Or copy the file from GitHub/backup
3. Contact your developer

---

## Common Mistakes

### Missing Comma
```typescript
// ❌ Wrong (missing comma after first item)
{ title: "Service 1" }
{ title: "Service 2" }

// ✅ Correct
{ title: "Service 1" },
{ title: "Service 2" }
```

### Missing Quote
```typescript
// ❌ Wrong
name: John Smith

// ✅ Correct
name: "John Smith"
```

### Slug Doesn't Match Folder
```typescript
// ❌ Wrong - folder and slug don't match!
// Folder: /public/properties/hayat-tower/
slug: "hayat-sky-tower-sale"  // System can't find images!

// ✅ Correct - they match!
// Folder: /public/properties/hayat-sky-tower-sale/
slug: "hayat-sky-tower-sale"
```

### Slug with Spaces
```typescript
// ❌ Wrong
slug: "Hayat Sky Tower Sale"  // Has spaces and capitals!

// ✅ Correct
slug: "hayat-sky-tower-sale"  // Lowercase with hyphens
```

---

That's it! Just edit `src/app/content.ts` and your changes will appear on the website. 🎉
