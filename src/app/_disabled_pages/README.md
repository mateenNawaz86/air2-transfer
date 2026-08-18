# Disabled Pages

This directory contains information about the pages that have been temporarily disabled.

## Disabled Routes

The following routes now show a 404 page instead of their original content:

- `/about` - About page
- `/booking` - Booking page  
- `/cities` - Cities page
- `/contact` - Contact page
- `/fleet` - Fleet page
- `/services` - Services page

## Original Content

The original page content has been replaced with `notFound()` calls but the files are preserved in their respective directories:

- `src/app/about/page.tsx`
- `src/app/booking/page.tsx`
- `src/app/cities/page.tsx`
- `src/app/contact/page.tsx`
- `src/app/fleet/page.tsx`
- `src/app/services/page.tsx`

## How to Re-enable

To re-enable any page, simply restore the original content in the respective `page.tsx` file and remove the `notFound()` call.

## Active Routes

- `/` - Homepage (still active)
- Any other route - Shows custom 404 page

## Custom 404 Page

A custom 404 page has been created at `src/app/not-found.tsx` with Jet2 branding and styling. 