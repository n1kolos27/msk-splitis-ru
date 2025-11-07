# Air Conditioning Company Website - msk.splitis.ru

## Project Overview
This is a production-ready static website for an air conditioning sales and installation company (ИП Лагуто Иван Иванович) serving Moscow and Moscow Oblast. The site is built with Eleventy (11ty) static site generator and features multiple landing pages optimized for SEO.

**Domain:** msk.splitis.ru  
**Company:** ИП Лагуто Иван Иванович  
**Technology Stack:** Eleventy 3.x, Node.js, HTML5, CSS3, vanilla JavaScript

## Recent Changes

### Brand Pages Image Fixes (November 7, 2025 - Final)
Fixed remaining image issues on all 8 brand pages based on user feedback:

**Problems Fixed:**
1. **Duplicate models.jpg** - Image appeared twice on each brand page (before and after product cards)
2. **Missing related-brands.jpg** - Section "Похожие бренды кондиционеров" had no images (HTML referenced non-existent files)

**Solution Implemented:**

**Duplicate Removal:**
- Removed duplicate models.jpg from all 8 brand pages (daikin, mitsubishi, lg, samsung, panasonic, haier, gree, electrolux)
- Each page now shows models.jpg only ONCE (before "Популярные модели" section)
- Eliminated visual repetition and improved page flow

**Related Brands Images:**
- Generated 8 NEW related-brands images WITHOUT text (CRITICAL requirement)
- Created 16 files total (8 JPG + 8 WebP) in assets/images/brands/{brand}/
- Professional multi-brand showcase photography, 16:9 aspect ratio, clean backgrounds
- All 8 brands now have complete image sets: about, advantages, technologies, comparison, models, faq, related-brands (14 files per brand)

**Verification:**
- Site rebuilt successfully: 643 files (includes 16 new related-brands files)
- All 8 brand pages screenshot-verified: no duplicate images, all sections complete
- Each brand directory contains 14 images (7 JPG + 7 WebP)
- Workflow running without errors

### Brand Product Image Remediation (November 7, 2025)
Eliminated cross-brand image pollution across all 8 brand pages by generating unique brand-specific product images:

**Problem Identified:**
- User screenshots revealed critical issue: brand pages displaying wrong/duplicate products
- Samsung, Panasonic, Haier, Electrolux pages all showed same lg-s12eq3.jpg placeholder
- Cross-brand contamination compromised brand authenticity and user experience

**Solution Implemented:**
- Generated 21 NEW brand-specific product images WITHOUT text (CRITICAL requirement)
- Created 42 files total (21 JPG + 21 WebP) in assets/images/products/
- Professional AC unit photography style, 4:3 aspect ratio, clean backgrounds

**New Product Images by Brand:**
- Mitsubishi: mitsubishi-msz-fh25ve, mitsubishi-msz-ap35vg, mitsubishi-msz-hr25vf
- Samsung: samsung-ar09, samsung-ar12, samsung-ar07
- Panasonic: panasonic-cs-tz25tkew, panasonic-cs-tz35tkew, panasonic-cs-tz20tkew
- Haier: haier-as09ns4era, haier-as12ns4era, haier-as07ns4era
- Gree: gree-gwh09qb, gree-gwh12qb, gree-gwh07qb
- Electrolux: electrolux-eacs-09hpr, electrolux-eacs-12hpr, electrolux-eacs-07hpr
- Daikin: daikin-ftxs25k (existing), daikin-ftxm35n (new), daikin-fvxm50f (new)
- LG: lg-s12eq3 (existing), lg-artcool-gallery (existing), lg-p12ep (new)

**HTML Updates:**
- Updated 7 brand pages (Mitsubishi, Samsung, Panasonic, Haier, Gree, Electrolux, LG)
- Daikin page was already correct, no changes needed
- Replaced all product card images with brand-specific files
- Maintained consistent `<picture>` tag structure (WebP source + JPG fallback)

**Verification:**
- Site rebuilt successfully: 627 files in 7.90 seconds
- All 8 brand pages screenshot-verified: each shows correct brand products
- No cross-brand contamination remaining (lg-s12eq3.jpg only on LG page)
- Workflow running without errors

### Comprehensive Image Remediation (November 6, 2025)
Completed systematic image audit and remediation across all 36+ pages through 5 parallel workstreams:

**Workstream A - Brand Hero Integration (5 pages):**
- Added hero images to daikin, mitsubishi, lg, samsung, panasonic brand pages
- All using existing hero files with proper `<picture>` tags, 0.2 opacity overlay
- WebP/JPG fallbacks, Russian alt text, proper z-index layering

**Workstream B - Brand Section Images (8 pages, 16 images):**
- Added models.jpg and faq.jpg to all 8 brand pages (daikin, mitsubishi, lg, samsung, panasonic, gree, haier, electrolux)
- Positioned before relevant sections with lazy loading
- Border-radius 8px, box-shadow, responsive sizing

**Workstream C - Services FAQ Images (3 pages):**
- Verified and repositioned FAQ images for obsluzhivanie, remont, zapravka
- Moved images from after FAQ sections to before FAQ items (correct position)
- All images verified clean (no dollar signs, English text, or stock photos)
- Created audit report: docs/FAQ_IMAGES_AUDIT_REPORT.md

**Workstream D - Catalog Image Audit (3 pages):**
- Comprehensive audit of kassetnye, kanalnye, multisplit pages
- Found 11 critical issues: wrong AC type (9 images), duplicates (MD5 verified), English text
- Detailed specifications for 14 replacement images documented
- Created audit report: docs/CATALOG_IMAGE_AUDIT_REPORT.md

**Workstream E - napolno-potolochnye Implementation (5 new images):**
- Generated 5 professional AI images WITHOUT text: benefits, applications, models, comparison, selection-guide
- Created directory: assets/images/catalog/napolno-potolochnye/
- 10 files total (5 JPG + 5 WebP), aspect ratio 16:9 (1200x675px)
- Full HTML integration with responsive `<picture>` tags

**Workstream F - Catalog Remediation Sprint (14 new images):**
- Generated 14 replacement images WITHOUT text for kassetnye, kanalnye, multisplit pages
- 9 product images: cassette (Daikin, Mitsubishi, LG), ducted (Daikin, Mitsubishi, LG), multisplit (Daikin, Mitsubishi, LG)
- 5 section images: kanalnye/description, kanalnye/comparison, kassetnye/description, kassetnye/comparison, multisplit/description
- Created directory: assets/images/products/ (18 files: 9 JPG + 9 WebP)
- Updated 5 section images in catalog directories (10 files: 5 JPG + 5 WebP)
- Updated HTML: kassetnye.html, kanalnye.html, multisplit.html (18 path replacements)
- Fixed breadcrumb error on multisplit.html: "Настенные кондиционеры" → "Мульти-сплит системы"
- All duplicates resolved, all AC types now correct (cassette/ducted/multisplit instead of wall-mounted)

**Additional Fixes:**
- cases.html: Replaced duplicate case-1.jpg hero with case-6.jpg
- All 10 hero pages from initial implementation verified and working

**Documentation:**
- IMAGE_AUDIT_REPORT.md: Main audit report (127 issues across 36 pages)
- docs/CATALOG_IMAGE_AUDIT_REPORT.md: Detailed catalog remediation plan (16KB)
- docs/FAQ_IMAGES_AUDIT_REPORT.md: Services FAQ audit results (6.9KB)

**Technical Quality:**
- Consistent `<picture>` structure across all pages
- WebP source + JPG fallback for all images
- Russian alt text for accessibility and SEO
- Lazy loading (loading="lazy") for performance
- Proper styling: border-radius, box-shadow, responsive width

**Verification:**
- Site rebuilt successfully (42 files in 5.37 seconds)
- Workflow restarted without errors
- All images loading without 404 errors
- Architect review confirmed quality and consistency

## Project Structure
```
├── src/                       # Source files for Eleventy
│   ├── pages/                 # Page templates (HTML/Nunjucks)
│   │   ├── index.html         # Main page
│   │   ├── blog/              # Blog articles
│   │   ├── brands/            # Brand pages (Daikin, Mitsubishi, etc.)
│   │   ├── katalog/           # Product catalog
│   │   └── uslugi/            # Services pages
│   ├── _includes/             # Reusable templates
│   │   ├── header.html        # Site header
│   │   ├── footer.html        # Site footer
│   │   └── page.html          # Base page layout
│   └── _data/                 # Global data files
│       ├── site.json          # Site metadata
│       ├── contacts.json      # Contact information
│       └── navigation.json    # Navigation structure
├── assets/                    # Static assets
│   ├── css/                   # Stylesheets
│   ├── js/                    # JavaScript files
│   └── images/                # Image files
├── _site/                     # Built site (generated, not in git)
├── server.js                  # Development/production server
└── .eleventy.js               # Eleventy configuration
```

## Development Setup

### Prerequisites
- Node.js 20.x (already installed on Replit)
- npm (comes with Node.js)

### Installation
Dependencies are already installed. If you need to reinstall:
```bash
npm install
```

### Running the Development Server
The site is automatically served through the configured workflow:
- The workflow builds the site and runs `node server.js`
- Server runs on port 5000 at `0.0.0.0`
- Access the site through the Replit webview

### Building the Site
To rebuild the static site manually:
```bash
npm run build
```

This will:
1. Process all files in `src/pages/` through Eleventy
2. Generate optimized HTML in `_site/`
3. Minify HTML, CSS, and JavaScript
4. Generate sitemap.xml
5. Create minified versions of assets

### Available Scripts
- `npm run build` - Build the site for production
- `npm run serve` - Build and serve with live reload
- `npm run dev` - Development mode with watch
- `npm run server` - Start the Node.js server
- `npm test` - Run Playwright E2E tests

## Architecture

### Static Site Generation
The project uses Eleventy to generate static HTML from templates. This approach provides:
- Fast page loads
- SEO optimization
- Easy deployment
- Lower hosting costs
- Better security

### Server Configuration
The `server.js` file serves the built site and handles:
- Static file serving from `_site/` directory
- Security headers (CSP, HSTS, X-Frame-Options, etc.)
- API endpoint for contact form (`/api/contact`)
- Cache control headers
- 404 error pages

### Contact Form Integration
The site includes a contact form that uses Resend API for email delivery. To enable this functionality:
1. Add `RESEND_API_KEY` to secrets (currently optional for development)
2. Optionally set `CONTACT_EMAIL` for the recipient address

## Deployment

### Production Deployment
The site is configured for Replit Autoscale deployment:
- **Build command:** `npm run build`
- **Run command:** `node server.js`
- **Port:** 5000
- **Type:** Autoscale (stateless)

The deployment will:
1. Install dependencies
2. Build the Eleventy site
3. Start the Node.js server
4. Serve static files with proper caching and security headers

### Environment Variables
Optional environment variables:
- `RESEND_API_KEY` - API key for email functionality (optional)
- `CONTACT_EMAIL` - Recipient email for contact form (defaults to info@msk.splitis.ru)
- `NODE_ENV` - Set to "production" for production optimizations

## Key Features

### SEO Optimization
- Unique meta titles and descriptions for each page
- Schema.org structured data (Organization, LocalBusiness, Product, FAQ)
- Semantic HTML5 markup
- Automatic sitemap.xml generation
- Breadcrumb navigation

### Performance
- Minified HTML, CSS, and JavaScript
- Lazy loading images
- Optimized asset delivery
- Fast server response times
- Mobile-first responsive design

### Content Management
- 36+ pages covering:
  - Services (installation, maintenance, repair, refilling)
  - Product catalog (wall-mounted, multi-split, ducted, cassette)
  - Brand pages (Daikin, Mitsubishi, LG, Samsung, Panasonic, etc.)
  - Blog articles about air conditioning
  - Company information and reviews

### Design Features
- Modern CSS3 with custom properties
- Dark/light theme support
- Glass morphism effects
- Smooth animations
- Print-optimized styles
- Accessibility (WCAG 2.1 Level AA)

## Testing
The project includes Playwright E2E tests for:
- Navigation
- Forms
- Responsive design
- Accessibility
- Interactive elements

Run tests with: `npm test`

## Maintenance Notes

### Adding New Pages
1. Create an HTML file in `src/pages/` (or appropriate subdirectory)
2. Use Nunjucks template syntax
3. Include front matter if needed
4. Run `npm run build` to generate the page
5. New page will be automatically added to sitemap.xml

### Updating Styles
- Main styles: `assets/css/main.css`
- Component styles: `assets/css/components/`
- Utility classes: `assets/css/utilities/`
- Responsive breakpoints: `assets/css/responsive.css`

### Updating Global Data
Edit JSON files in `src/_data/`:
- `site.json` - Site name, domain, analytics IDs
- `contacts.json` - Phone numbers, email, address
- `navigation.json` - Main navigation structure

## Replit-Specific Configuration

### Workflow
The "frontend" workflow is configured to:
- Command: `node server.js`
- Port: 5000
- Output type: webview
- Auto-restart on code changes

### Host Configuration
The server is configured to bind to `0.0.0.0:5000` which is required for Replit's environment. The host setting allows Replit's proxy to properly route traffic to the application.

## License
All rights reserved © 2025 ИП Лагуто Иван Иванович  
Private project - unauthorized use prohibited.

## Contact
- Phone: +7 (499) 757-57-19
- Email: info@msk.splitis.ru
- Address: г. Мытищи, ул. Веры Волошиной, д. 19/16, офис 229
- Hours: Mon-Sun 09:00-21:00
