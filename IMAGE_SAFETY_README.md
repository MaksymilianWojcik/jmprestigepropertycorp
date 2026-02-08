# Image Safety Mechanism

## Overview

This project includes a robust image safety mechanism with explicit control over image display. You can now use the `showImages` flag to proactively control whether property images or the fallback logo is displayed.

## How It Works

### 1. The `showImages` Flag

Each property now has a `showImages` boolean flag that gives you explicit control:

```typescript
{
  id: 1,
  slug: "luxury-apartment-szczecin",
  name: "Luxury Apartment in Szczecin",
  // ... other property details ...
  images: ["image-1.jpg", "image-2.jpg", "image-3.jpg"],
  showImages: false, // Set to false to always show logo instead
  // ... rest of property config
}
```

**Options:**
- `showImages: true` - Display the property images from the images array
- `showImages: false` - Always display the company logo instead of property images
- Not set (undefined) - Defaults to `true`, will attempt to show images

### 2. Fallback System

The system uses a multi-layered approach:

1. **Check `showImages` flag**: If explicitly set to `false`, show logo immediately
2. **Check images array**: If empty or undefined, show logo
3. **Runtime error handling**: If images fail to load, remove them and fall back to logo
4. **Complete fallback**: If all images fail, show logo

### 3. Automatic Error Detection

The `ImageCarousel` component includes built-in runtime error handling:

- **Individual Image Errors**: If a specific image fails to load, it is automatically removed from the carousel
- **Complete Fallback**: If all images fail to load, the carousel displays the logo
- **Dynamic Updates**: The carousel indicators update automatically to reflect only valid images

## Usage

### Setting Up a New Property

When adding a new property to `content.ts`:

```typescript
{
  id: 8,
  slug: "new-property",
  name: "New Property Name",
  // ... property details ...
  images: ["photo1.jpg", "photo2.jpg", "photo3.jpg"],
  showImages: true, // or false if you want to show logo only
  // ... rest of config
}
```

### Common Scenarios

#### Property with Real Images Ready
```typescript
images: ["1.jpg", "2.jpg", "3.jpg"],
showImages: true, // Show the actual property images
```

#### Property Without Images (Coming Soon)
```typescript
images: [], // or ["placeholder.jpg"]
showImages: false, // Show logo until images are ready
```

#### Property You Want to Temporarily Hide Images
```typescript
images: ["old1.jpg", "old2.jpg"],
showImages: false, // Show logo while updating images
```

## Implementation Details

### Modified Files

1. **`src/app/content.ts`**
   - Added `FALLBACK_IMAGE` constant set to `/logo.png`
   - Updated `getPropertyImages()` function to check `showImages` flag
   - Added `showImages` flag to all properties

2. **`src/app/components.tsx`**
   - Updated `ImageCarousel` component with runtime error handling
   - Tracks valid images dynamically
   - Uses `onError` handler on the Next.js Image component
   - Automatically removes broken images from the carousel

### How the Logic Works

```typescript
export function getPropertyImages(property: { 
  slug: string; 
  images: string[]; 
  showImages?: boolean 
}): string[] {
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
```

## Benefits

✅ **Explicit Control**: Decide exactly when to show images vs logo  
✅ **No Broken Images**: Never display error placeholders to users  
✅ **Professional**: Always show company branding when needed  
✅ **Flexible**: Easy to toggle between images and logo  
✅ **Automatic Runtime Protection**: Even with `showImages: true`, broken images are caught  
✅ **SEO-Friendly**: Proper alt text and image handling

## Testing

To test the safety mechanism:

1. **Test with showImages: false**: Property should always show logo
2. **Test with showImages: true**: Property should show actual images
3. **Test Missing Images**: Remove an image file, it should be filtered out
4. **Test All Missing**: Remove all images, logo should display
5. **Test Empty Array**: Set `images: []` with `showImages: true`, should show logo

## Configuration

### Changing the Fallback Image

To use a different fallback image, edit `src/app/content.ts`:

```typescript
export const FALLBACK_IMAGE = "/your-fallback-image.png";
```

### Default Behavior

If `showImages` is not specified, it defaults to attempting to show images (equivalent to `true`).

### Quick Toggle for All Properties

To temporarily show logos for all properties (e.g., during maintenance):

1. Search for `showImages: true` in `content.ts`
2. Replace with `showImages: false`
3. All properties will now show logos

## Property Configuration Quick Reference

```typescript
// Show actual property images
showImages: true,
images: ["photo1.jpg", "photo2.jpg"],

// Show logo only (images not ready)
showImages: false,
images: [],

// Show logo only (planning to add images later)
showImages: false,
images: ["placeholder.jpg"],
```

## Notes

- The fallback logo (`/logo.png`) must exist in the `/public` directory
- Property images follow the path structure: `/public/properties/[slug]/[image-name]`
- The `showImages` flag is checked first, before any image loading attempts
- Runtime error handling provides an additional safety layer
- Setting `showImages: false` prevents any network requests for property images

## Support

If you encounter any issues:

1. Verify the fallback image exists at `/public/logo.png`
2. Check that the `showImages` flag is set correctly for each property
3. Ensure property images follow the correct path structure
4. Verify the `FALLBACK_IMAGE` constant in `content.ts` is correctly set
