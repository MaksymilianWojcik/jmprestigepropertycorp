# Cloudinary Image Hosting Guide

## Overview

This project uses [Cloudinary](https://cloudinary.com) for hosting property images. This solves GitHub file size limitations and provides better image optimization and delivery.

**Cloudinary Account:**
- Cloud Name: `du85wguro`
- Console: https://console.cloudinary.com/

## Why Cloudinary?

✅ **No GitHub Size Limits** - Upload large, high-quality images  
✅ **Automatic Optimization** - Images are automatically optimized for web  
✅ **Global CDN** - Fast image delivery worldwide  
✅ **Easy Management** - Upload and organize images via web interface  
✅ **Version Control Friendly** - No large files in git repository  

---

## How It Works

### The Connection

```
┌─────────────────────────────────────────────────────────────────┐
│ content.ts                                                      │
├─────────────────────────────────────────────────────────────────┤
│ {                                                               │
│   cloudinaryFolder: "optb15n",  ← Cloudinary folder name       │
│   images: ["op_tb15n1.jpeg", "op_tb15n2.jpeg"]                 │
│ }                                                               │
└────────────┬────────────────────────────────────────────────────┘
             │
             ├─ Generates URL
             │
             ▼
  https://res.cloudinary.com/du85wguro/image/upload/optb15n/op_tb15n1.jpeg
  └─────────┬─────────┘ └─────┬─────┘ └───┬───┘ └──┬──┘ └────┬────┘
      Cloudinary      Cloud Name  Path  Folder  Filename
```

### URL Structure

Every Cloudinary image URL follows this pattern:
```
https://res.cloudinary.com/{CLOUD_NAME}/image/upload/{FOLDER}/{FILENAME}
```

**Example:**
- Cloud Name: `du85wguro`
- Folder: `optb15n`
- Filename: `op_tb15n1.jpeg`
- Full URL: `https://res.cloudinary.com/du85wguro/image/upload/optb15n/op_tb15n1.jpeg`

---

## Adding Property Images to Cloudinary

### Step 1: Access Cloudinary

1. Go to: https://console.cloudinary.com/
2. Log in to your account
3. Navigate to **Media Library** in the left sidebar

### Step 2: Create a Folder for Your Property

1. Click the **"New Folder"** button
2. Name the folder using a simple, descriptive name:
   - Use lowercase letters
   - Use hyphens or underscores (not spaces)
   - Keep it short and recognizable
   - Examples: `hayat-tower`, `reef-resort`, `tambuli-spa`

**⚠️ Important:** Remember this folder name - you'll need it in `content.ts`!

### Step 3: Upload Images

1. Open the folder you just created
2. Click **"Upload"** button
3. Select all images for this property
4. Wait for upload to complete

**Naming recommendations:**
- Use descriptive names: `living-room.jpg`, `bedroom.jpg`, `exterior.jpg`
- Or use numbers: `1.jpg`, `2.jpg`, `3.jpg`
- Keep names consistent and simple

### Step 4: Update content.ts

Add the property to `src/app/content.ts`:

```typescript
{
  id: 8,
  slug: "your-property-slug",
  name: "Property Name",
  // ... other fields ...
  
  // ⚠️ CRITICAL: This must match your Cloudinary folder name!
  cloudinaryFolder: "hayat-tower", // The folder name from Step 2
  
  // List the filenames (same as uploaded to Cloudinary)
  images: ["1.jpg", "2.jpg", "3.jpg", "living-room.jpg"],
  
  showImages: true, // Set to true to display images
  // ... rest of fields
}
```

### Step 5: Test

1. Save the file
2. Run `npm run dev`
3. Navigate to your property page
4. Images should load from Cloudinary!

---

## Configuration

### Cloudinary Settings

The Cloudinary configuration is at the top of `src/app/content.ts`:

```typescript
// Cloudinary configuration
export const CLOUDINARY_CLOUD_NAME = "du85wguro";
export const CLOUDINARY_BASE_URL = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload`;
```

**Don't change these values unless you're switching Cloudinary accounts!**

### Next.js Image Configuration

Cloudinary is configured as an allowed image host in `next.config.ts`:

```typescript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'res.cloudinary.com',
      pathname: '/**',
    },
  ],
},
```

**This configuration is required for Next.js to load images from Cloudinary.**

If you add images from other CDNs or domains, you'll need to add them to `remotePatterns` as well.

---

## Property Configuration Fields

### `cloudinaryFolder` (string)

The name of the folder in Cloudinary where this property's images are stored.

- **Empty string (`""`)**: Property doesn't use Cloudinary (will show logo)
- **Folder name**: Must exactly match the folder name in Cloudinary
- **Case sensitive**: `"optb15n"` ≠ `"OPTB15n"`

**Examples:**
```typescript
// Property using Cloudinary
cloudinaryFolder: "optb15n",
showImages: true,

// Property not using Cloudinary yet
cloudinaryFolder: "",
showImages: false, // Show logo instead
```

### `images` (array of strings)

List of image filenames in the Cloudinary folder.

```typescript
// Just the filenames - paths are auto-generated!
images: ["1.jpg", "2.jpg", "3.jpg"]

// NOT full URLs! This is wrong:
images: ["https://res.cloudinary.com/..."] // ❌ Don't do this!
```

### `showImages` (boolean)

Controls whether to display images or fallback logo.

```typescript
showImages: true,  // Display Cloudinary images
showImages: false, // Display logo (even if cloudinaryFolder is set)
```

---

## Current Property Status

### Using Cloudinary ✅

**One Pacific Residence (id: 2)**
- Folder: `optb15n`
- Images: 6 photos
- Status: Live and displaying

### Not Using Cloudinary Yet ⏳

All other properties (ids: 1, 3, 4, 5, 6, 7):
- `cloudinaryFolder: ""`
- `showImages: false`
- Currently showing logo

**To add images for these properties:**
1. Upload images to Cloudinary in new folders
2. Update `cloudinaryFolder` field with folder name
3. Update `images` array with filenames
4. Set `showImages: true`

---

## Folder Naming Best Practices

### Good Folder Names ✅
- `onepacific-tb15n`
- `hayat-tower-sale`
- `reef-resort-11f`
- `tambuli-spa-3f`

### Bad Folder Names ❌
- `One Pacific TB 15N` (has spaces and capitals)
- `Hayat Tower - For Sale!!` (special characters)
- `property-123` (not descriptive)

**Rules:**
- Lowercase only
- Use hyphens or underscores
- No spaces or special characters
- Descriptive but concise

---

## Troubleshooting

### Images Not Loading

**1. Check Cloudinary folder exists**
- Go to Cloudinary Media Library
- Verify folder name matches `cloudinaryFolder` field exactly

**2. Check image filenames match**
- Filenames in `content.ts` must match exactly (case-sensitive)
- Check for typos: `image1.jpg` vs `image-1.jpg`

**3. Verify showImages is true**
```typescript
showImages: true, // Not false!
```

**4. Check browser console**
- Open browser DevTools (F12)
- Look for 404 errors on image URLs
- Copy the URL and check if it works directly

**5. Test Cloudinary URL manually**
Build the URL manually and test in browser:
```
https://res.cloudinary.com/du85wguro/image/upload/FOLDER/FILENAME
```

### Cloudinary Folder Not Found

If you get a 404 error, the folder might not exist or have the wrong name.

**Solution:**
1. Go to Cloudinary Media Library
2. Find your folder
3. Click the folder and check the URL or breadcrumb for exact name
4. Update `cloudinaryFolder` in `content.ts` to match exactly

### Images Showing Logo

If `showImages: true` but still showing logo, check:

1. `cloudinaryFolder` is not empty (`""`)
2. `images` array is not empty
3. Folder exists in Cloudinary
4. At least one image file exists in the folder

---

## Migration Checklist

When moving a property from local images to Cloudinary:

- [ ] Create folder in Cloudinary Media Library
- [ ] Upload all property images to the folder
- [ ] Note the exact folder name (case-sensitive)
- [ ] Update `content.ts`:
  - [ ] Set `cloudinaryFolder: "folder-name"`
  - [ ] Update `images: ["file1.jpg", "file2.jpg"]`
  - [ ] Set `showImages: true`
- [ ] Test in browser
- [ ] Delete old images from `/public/properties/` (optional)

---

## Tips & Best Practices

### Image Upload Tips
- **Upload in batches** - Select multiple files at once
- **Rename before upload** - Easier than renaming in Cloudinary
- **Consistent naming** - Use 1.jpg, 2.jpg or descriptive names
- **Check file size** - Cloudinary free tier has limits (check your plan)

### Organization Tips
- **One folder per property** - Don't mix properties
- **Descriptive folder names** - Easier to find later
- **Keep filenames simple** - Avoid special characters
- **Document what you upload** - Note folder names somewhere

### Performance Tips
- **Optimize before upload** - Cloudinary will optimize, but starting smaller helps
- **Use JPG for photos** - PNG for graphics/logos only
- **Reasonable sizes** - 1920px wide is usually enough
- **Delete unused images** - Keep Cloudinary storage clean

---

## Switching Back to Local Images

If you want to use local images instead of Cloudinary for a property:

1. Add images to `/public/properties/{slug}/`
2. In `content.ts`:
```typescript
cloudinaryFolder: "", // Empty string = use local
images: ["1.jpg", "2.jpg"],
showImages: true,
```

3. Update the `getPropertyImagePath` function to handle local paths (requires code change)

---

## FAQ

**Q: Can I use both Cloudinary and local images?**  
A: Not for the same property. Each property uses either Cloudinary OR local images, determined by the `cloudinaryFolder` field.

**Q: What happens if I delete a Cloudinary folder?**  
A: Images will fail to load. The property will show the logo as fallback.

**Q: Can I rename a Cloudinary folder?**  
A: Yes, but you must update `cloudinaryFolder` in `content.ts` to match.

**Q: Is Cloudinary free?**  
A: Cloudinary has a free tier with limits. Check your account dashboard for usage.

**Q: Can I use different cloud names?**  
A: Yes, but update `CLOUDINARY_CLOUD_NAME` in `content.ts` and all folder references.

**Q: What if I want to use a different CDN?**  
A: You'll need to modify the `getPropertyImagePath` function in `content.ts`.

---

## Support

- Cloudinary Documentation: https://cloudinary.com/documentation
- Cloudinary Support: https://support.cloudinary.com
- Project Issues: Contact your developer

---

## Summary

✅ Upload images to Cloudinary Media Library  
✅ Create folders with simple, descriptive names  
✅ Update `cloudinaryFolder` field in `content.ts`  
✅ List filenames in `images` array  
✅ Set `showImages: true`  
✅ Test and deploy!
