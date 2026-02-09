# Formspree Contact Form Setup Guide

## Overview

Your contact form is now configured to use Formspree, a professional form handling service that will send emails directly to `jmprestigepropertycorp@gmail.com`.

## ⚡ Quick Setup (5 minutes)

### Step 1: Create Formspree Account

1. Go to **https://formspree.io/**
2. Click **"Get Started"** or **"Sign Up"**
3. Sign up with any email (can use your Gmail)
4. Verify your email

### Step 2: Create a New Form

1. After logging in, click **"+ New Form"**
2. Enter form details:
   - **Name**: `J&M Prestige Contact Form` (or any name)
   - **Email**: `jmprestigepropertycorp@gmail.com` (where submissions go)
3. Click **"Create Form"**

### Step 3: Get Your Form Endpoint

After creating the form, you'll see:

```
Form Endpoint: https://formspree.io/f/YOUR_FORM_ID
```

**Copy this entire URL!** It will look like:
- `https://formspree.io/f/manyabcd` 
- or similar

### Step 4: Update Your Website

1. Open `src/app/content.ts`
2. Find this line (around line 604):

```typescript
formspreeEndpoint: "YOUR_FORMSPREE_ENDPOINT_HERE",
```

3. Replace with your actual endpoint:

```typescript
formspreeEndpoint: "https://formspree.io/f/manyabcd",  // Your actual endpoint
```

4. Save the file

### Step 5: Test the Form

1. Make sure your dev server is running (`npm run dev`)
2. Go to http://localhost:3000/#contact
3. Fill out the form and submit
4. You should see a green success message
5. Check `jmprestigepropertycorp@gmail.com` for the email!

---

## What Happens When Someone Submits

1. **User fills form** on your website
2. **Form submits** to Formspree
3. **Formspree processes** the submission
4. **Email sent** to `jmprestigepropertycorp@gmail.com`
5. **User sees** success message on your website

---

## Email Format

You'll receive emails like this:

```
From: Formspree <noreply@formspree.io>
To: jmprestigepropertycorp@gmail.com
Subject: New submission from J&M Prestige Contact Form

name: John Smith
email: john@example.com
phone: +63 967 097 2465
message: I'm interested in the Reef Island Resort property. 
         Please call me to discuss further details.
```

The phone number is included so you can **call them back directly**!

---

## Features Included

✅ **Professional email delivery** - Reliable sending  
✅ **Spam protection** - Built-in filtering  
✅ **Success messages** - User sees confirmation  
✅ **Error handling** - Graceful failure messages  
✅ **Disabled state** - Prevents double-submission  
✅ **Form reset** - Clears after successful send  
✅ **Auto-dismiss** - Success message fades after 5 seconds  

---

## Form States

The form has 4 states:

### 1. Idle (Default)
- Form is ready to use
- Button says "Send Message"
- All fields enabled

### 2. Submitting
- Form is being sent
- Button says "Sending..."
- All fields disabled (prevents double-submit)
- Button grayed out

### 3. Success ✅
- Green message box appears
- "Thank you! Your message has been sent successfully..."
- Form clears automatically
- Message auto-dismisses after 5 seconds

### 4. Error ❌
- Red message box appears
- "Oops! There was a problem..."
- Form keeps data (user can try again)
- User can also email directly

---

## Formspree Dashboard Features

In your Formspree dashboard, you can:

- **View all submissions** - History of all contact form submissions
- **Export data** - Download as CSV
- **Email notifications** - Customize notification settings
- **Spam filtering** - Enable reCAPTCHA if needed
- **Multiple recipients** - Add more email addresses
- **Webhook integration** - Connect to other services

---

## Free Plan Limits

**Formspree Free Tier:**
- ✅ 50 submissions per month
- ✅ Unlimited forms
- ✅ Email notifications
- ✅ Spam filtering
- ✅ File uploads (if you add later)

**Paid Plans** (if you need more):
- Gold: 1,000 submissions/month - $10/month
- Platinum: 10,000 submissions/month - $40/month

For a real estate website, 50/month is usually plenty to start!

---

## Troubleshooting

### "YOUR_FORMSPREE_ENDPOINT_HERE" Error

**Problem:** You see an error about invalid endpoint.

**Solution:** You forgot to update `content.ts` with your actual Formspree endpoint. See Step 4 above.

### Form Submits But No Email

**Problem:** Success message shows but no email arrives.

**Solutions:**
1. Check spam/junk folder in Gmail
2. Verify email address in Formspree dashboard
3. Check Formspree dashboard → View submissions
4. Verify email is spelled correctly: `jmprestigepropertycorp@gmail.com`

### "Network Error" or Error Message

**Problem:** Red error message appears.

**Solutions:**
1. Check internet connection
2. Verify Formspree endpoint URL is correct
3. Check Formspree is not down (status.formspree.io)
4. Check browser console for specific errors

### Submissions Not Showing in Dashboard

**Problem:** Form submits successfully but not in Formspree dashboard.

**Solution:** Make sure you're logged into the correct Formspree account.

---

## Testing Checklist

Before going live, test:

- [ ] Sign up for Formspree account
- [ ] Create form in Formspree
- [ ] Copy endpoint to `content.ts`
- [ ] Submit test form on localhost
- [ ] Verify email received at `jmprestigepropertycorp@gmail.com`
- [ ] Test with invalid data (should show validation)
- [ ] Test error handling (temporarily use wrong endpoint)
- [ ] Test on mobile devices
- [ ] Check spam folder if email not visible

---

## Advanced Configuration (Optional)

### Add Email Subject Line

In Formspree dashboard:
1. Go to your form settings
2. Find "Email Subject" option
3. Set to: `New inquiry from J&M Prestige website`

### Add Auto-Reply

Configure an automatic confirmation email sent to the person who submitted:

1. In Formspree dashboard → Form Settings
2. Enable "Send confirmation email"
3. Customize the message

### Add File Upload

If you want users to attach documents:

1. Add file input to form
2. Formspree automatically handles attachments
3. Free plan allows up to 10MB per submission

---

## Current Configuration

**File:** `src/app/content.ts`
```typescript
export const contactSection = {
  formspreeEndpoint: "YOUR_FORMSPREE_ENDPOINT_HERE", // Update this!
  // ... rest of config
};
```

**File:** `src/app/page.tsx`
- ✅ Form handler implemented
- ✅ Success/error messages
- ✅ Loading states
- ✅ Disabled during submission
- ✅ Auto-reset on success

---

## Alternative: Keep mailto (Not Recommended)

If you prefer not to use Formspree, I can revert to `mailto:`, but be aware:

❌ Only works if user has email client configured  
❌ Poor user experience  
❌ No confirmation  
❌ Unreliable on mobile  
❌ Not professional  

**Recommendation:** Use Formspree for a professional real estate website.

---

## Support

- **Formspree Documentation**: https://help.formspree.io/
- **Formspree Status**: https://status.formspree.io/
- **Support**: support@formspree.io

---

## Summary

✅ Form configured to use Formspree  
✅ Professional email delivery  
✅ Success/error messages  
✅ Spam protection included  
✅ Free for 50 submissions/month  
⏳ **Just need to add your Formspree endpoint to `content.ts`**

Once you complete Step 4, your contact form will be fully functional! 🚀
