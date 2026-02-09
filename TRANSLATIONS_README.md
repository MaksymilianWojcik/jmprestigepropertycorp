# Translation System Guide

This project now supports multiple languages: **English**, **Tagalog**, and **Polish**.

## Quick Overview

- **English (en)** - Default language
- **Tagalog (tl)** - Filipino/Tagalog language
- **Polish (pl)** - Polish language

## How It Works

### URL Structure

- English: `https://yoursite.com/` or `https://yoursite.com/en/`
- Tagalog: `https://yoursite.com/tl/`
- Polish: `https://yoursite.com/pl/`

The default language (English) doesn't show `/en/` in the URL for cleaner URLs.

### Language Switcher

A language switcher button is available in:
- Desktop navigation (top right)
- Mobile menu (below navigation items)

Users can switch between English, Tagalog, and Polish at any time.

## What's Translated

The following UI elements are translated:

- ✅ Navigation menu (Services, Properties, About, etc.)
- ✅ Hero section buttons
- ✅ Section headings (Services, Properties, Testimonials, Contact)
- ✅ Contact form labels and placeholders
- ✅ Property listing filters
- ✅ Property detail page buttons (Contact to Book, Request Information)
- ✅ Status messages (success/error)
- ✅ Footer text

## What's NOT Translated (Yet)

As requested, the following remain in their original language:

- Property names
- Property descriptions (short and long)
- Property amenities
- Service descriptions
- Testimonial text
- About section content

## How to Edit Translations

### 1. English Translations

Edit the file: `messages/en.json`

```json
{
  "nav": {
    "services": "Services",
    "properties": "Properties",
    ...
  }
}
```

### 2. Tagalog Translations

Edit the file: `messages/tl.json`

```json
{
  "nav": {
    "services": "Mga Serbisyo",
    "properties": "Mga Ari-arian",
    ...
  }
}
```

### 3. Polish Translations

Edit the file: `messages/pl.json`

```json
{
  "nav": {
    "services": "Usługi",
    "properties": "Nieruchomości",
    ...
  }
}
```

## Adding More Languages

To add a new language (e.g., Spanish):

1. Create a new translation file: `messages/es.json`
2. Update `src/i18n.ts`:
   ```typescript
   export const locales = ['en', 'tl', 'pl', 'es'] as const;
   
   export const localeNames: Record<Locale, string> = {
     en: 'English',
     tl: 'Tagalog',
     pl: 'Polski',
     es: 'Español'
   };
   ```
3. The middleware will automatically handle the new locale

## Technical Details

- **Framework**: next-intl (Next.js internationalization)
- **Routing**: Automatic locale detection and routing
- **Translation Files**: JSON format in `/messages/` directory
- **Client Components**: Use `useTranslations()` hook
- **Server Components**: Use `await getTranslations()` function

## Testing

Visit your site and:
1. Click the language switcher (🌐 button)
2. Select "Tagalog" or "Polski"
3. Navigate through different pages
4. All UI labels should be in the selected language
5. Switch back to English to verify the language switcher works in both directions

## Notes

- The language preference is stored in the URL
- Users can share links in specific languages
- Search engines can index both language versions
- The language switcher is accessible on all pages
