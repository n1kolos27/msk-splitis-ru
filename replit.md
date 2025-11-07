# Air Conditioning Company Website - msk.splitis.ru

## Overview
This project is a production-ready static website for "ИП Лагуто Иван Иванович", an air conditioning sales and installation company operating in Moscow and Moscow Oblast. The website, `msk.splitis.ru`, is built using Eleventy (11ty) and features multiple SEO-optimized landing pages to showcase services, products, and brands. Its primary purpose is to provide a fast, secure, and easily maintainable online presence for the business, enhancing its market potential and customer reach.

## Recent Changes

### Floor-Ceiling AC Selection Guide Image Fixed (November 7, 2025 - Latest)
Replaced irrelevant image in "How to Choose" section on napolno-potolochnye.html WITHOUT any text:

**Problem Identified:**
- `selection-guide.jpg` image showed people working in office (NOT relevant to floor-ceiling AC selection)
- User reported: "napolno-potolochnye.html выше как выбрать не соответствует!"
- Image context mismatch: Section about choosing floor-ceiling AC showed office workers instead of AC unit

**Solution Implemented:**
- Generated NEW contextually relevant image WITHOUT any text:
  - `selection-guide.jpg + .webp`: Floor-ceiling AC unit installed on high ceiling in large modern office space (228KB JPG, 105KB WebP)
- Shows actual floor-ceiling AC installation result in commercial interior
- Demonstrates placement and scale appropriate for selection guide context
- Zero text, labels, signs, numbers, logos, or people - pure professional photography
- Image contextually matches "How to Choose" section content

**Technical Details:**
- AI-generated image with strong negative prompts preventing text/people
- Converted from PNG to optimized JPG (quality 90) and WebP (quality 85)
- Replaced existing files in assets/images/catalog/napolno-potolochnye/ directory
- Site rebuilt: 655 files copied, 43 HTML files generated in 4.89 seconds
- Workflow restarted successfully, new image loading correctly

**Impact:**
- ✅ Image now contextually relevant to floor-ceiling AC selection
- ✅ Shows actual AC unit installation (not office workers)
- ✅ Demonstrates product placement in real commercial setting
- ✅ Maintains project's strict "no text on images" policy
- ✅ Improves SEO relevance for TOP-1 ranking goal

### Blog Page Popular Articles Images Added (November 7, 2025)
Created and deployed 6 missing images for Popular Articles section on blog.html WITHOUT any text:

**Problem Identified:**
- ALL 6 popular article images were MISSING (404 errors)
- `kak-vybrat-kondicioner.jpg` - did not exist
- `rejting-kondicionerov.jpg` - did not exist
- `obsluzhivanie.jpg` - did not exist
- `invertornyj.jpg` - did not exist
- `ekonomiya.jpg` - did not exist
- `ofis.jpg` - did not exist
- User reported: "blog.html, раздел популярные статьи, не отображаются изображения"
- Critical UX issue: Popular articles section showing broken images

**Solution Implemented:**
- Generated 6 NEW contextually relevant images WITHOUT any text for Popular Articles:
  - `kak-vybrat-kondicioner.jpg + .webp`: Modern AC in apartment for "How to choose AC" article (136KB JPG, 47KB WebP)
  - `rejting-kondicionerov.jpg + .webp`: Three premium AC units for "Best AC 2024 rating" article (78KB JPG, 16KB WebP)
  - `obsluzhivanie.jpg + .webp`: Clean AC after maintenance for "AC maintenance guide" article (86KB JPG, 16KB WebP)
  - `invertornyj.jpg + .webp`: Inverter AC technology in modern interior for "Inverter AC" article (164KB JPG, 64KB WebP)
  - `ekonomiya.jpg + .webp`: Energy-efficient AC in bright apartment for "Energy saving" article (177KB JPG, 64KB WebP)
  - `ofis.jpg + .webp`: Office cassette AC installation for "Office AC selection" article (227KB JPG, 98KB WebP)
- Updated HTML to use <picture> tags with WebP sources for all 6 images
- Zero text, labels, signs, numbers, logos, or people - pure professional photography
- Each image contextually matches its article topic

**Technical Details:**
- AI-generated images with strong negative prompts preventing text/people/processes
- Converted from PNG to optimized JPG (quality 90) and WebP (quality 85)
- Created files in assets/images/blog/ directory
- Updated blog.html with proper <picture> tags for WebP optimization
- Site rebuilt: 655 files copied, 43 HTML files generated in 4.94 seconds
- Workflow restarted successfully, new images loading correctly

**Impact:**
- ✅ ALL 6 popular article images now display correctly
- ✅ Fixed critical UX issue with broken images
- ✅ Images contextually relevant to article topics
- ✅ WebP optimization reduces page load time
- ✅ Maintains project's strict "no text on images" policy
- ✅ Improves SEO with relevant imagery for blog articles

### Cases Page Images Complete Replacement (November 7, 2025)
Replaced ALL 6 case study images on cases.html page with contextually relevant images showing actual installation results WITHOUT any text:

**Problem Identified:**
- ALL 6 case images were NOT contextually relevant to the case descriptions
- `case-1.jpg`: Showed technician working with socket (not installed Daikin in apartment)
- `case-2.jpg`: Studio photo of AC unit on gray background (not Mitsubishi in office)
- `case-3.jpg`: Technician servicing/cleaning AC (not installed LG in apartment)
- `case-4.jpg`: Industrial rooftop ventilation (not cassette AC in office ceiling)
- `case-5.jpg`: Studio photo of outdoor unit (not multi-split in cottage)
- `case-6.jpg`: Duplicate of case-3, technician servicing (not installation result)
- Critical for SEO: Cases page shows PROCESSES/PRODUCTS instead of RESULTS
- User goal: Achieve TOP-1 ranking - requires relevant case study imagery

**Solution Implemented:**
- Generated 6 NEW contextually relevant images WITHOUT any text showing installation RESULTS:
  - `case-1.jpg + case-1.webp`: Daikin installed in modern apartment living room (203KB JPG, 79KB WebP)
  - `case-2.jpg + case-2.webp`: Mitsubishi Electric installed in upscale office (153KB JPG, 44KB WebP)
  - `case-3.jpg + case-3.webp`: LG installed in apartment bedroom (216KB JPG, 96KB WebP)
  - `case-4.jpg + case-4.webp`: Cassette AC unit in office suspended ceiling (175KB JPG, 65KB WebP)
  - `case-5.jpg + case-5.webp`: Multi-split system in luxury cottage (337KB JPG, 179KB WebP)
  - `case-6.jpg + case-6.webp`: Premium installation result for hero background (206KB JPG, 86KB WebP)
- All images show completed installations in real interiors (not processes or studio shots)
- Zero text, labels, signs, numbers, logos, or people - pure professional photography
- Each image contextually matches its case description for SEO relevance

**Technical Details:**
- AI-generated images with strong negative prompts preventing text/people/processes
- Converted from PNG to optimized JPG (quality 90) and WebP (quality 85)
- Replaced all 6 existing files in assets/images/cases/ directory
- Site rebuilt: 643 files copied, 43 HTML files generated in 4.79 seconds
- Workflow restarted successfully, new images loading correctly

**Impact:**
- ✅ ALL case images now contextually relevant to case descriptions
- ✅ Shows actual installation RESULTS (not processes/products)
- ✅ Improves SEO relevance for TOP-1 ranking goal
- ✅ Maintains project's strict "no text on images" policy
- ✅ Professional completed installations in real environments

### Service Images Relevance Update (November 7, 2025)
Replaced pricing/tariff section images with contextually relevant premium quality images WITHOUT any text:

**Problem Identified:**
- Images for pricing sections were not contextually relevant to their placement
- `ustanovka/pricing.jpg`: Alt text promised "прайс-лист и цены" but showed only a technician working
- User feedback: First replacement image looked "unfinished" (open louvers showing internals)
- `obsluzhivanie/tariffs.jpg`: Alt text promised "тарифы на обслуживание" but showed only maintenance work
- Created user confusion - expected pricing visuals, got generic service photos

**Solution Implemented:**
- Generated 2 NEW contextually relevant premium images WITHOUT any text:
  - `ustanovka/pricing.jpg + pricing.webp`: **Premium finished installation** - complete white AC unit with closed louvers in upscale modern interior, wide room shot showing elegant furniture and professional installation result (160KB JPG, 65KB WebP)
  - `obsluzhivanie/tariffs.jpg + tariffs.webp`: **Multiple premium AC units** after professional maintenance in upscale interior, showing spotlessly clean equipment and quality service results (131KB JPG, 40KB WebP)
- Images now show RESULTS of services (what customers get for their money)
- Updated alt text to accurately describe image content:
  - "Профессионально установленный кондиционер в современном интерьере - результат качественного монтажа в Москве"
  - "Чистый кондиционер после профессионального обслуживания - результат качественного сервиса в Москве"
- Zero text, labels, signs, numbers, or logos - pure professional photography

**Technical Details:**
- AI-generated images with strong negative prompts preventing text generation
- Converted from PNG to optimized JPG (quality 90) and WebP (quality 85)
- Replaced existing files in assets/images/services/ directories
- Site rebuilt: 643 files copied, 43 HTML files generated in 10.60 seconds
- Workflow restarted successfully, new images loading correctly

**Impact:**
- ✅ Images now contextually relevant to pricing/tariff sections
- ✅ Shows quality results customers get for their investment (premium finish)
- ✅ Alt text accurately describes image content (better SEO)
- ✅ Maintains project's strict "no text on images" policy
- ✅ Professional completed look (closed louvers, wide interior shot)

## User Preferences
I prefer simple language and clear, direct instructions. I want iterative development with frequent, small updates rather than large, infrequent changes. Please ask for confirmation before implementing any major architectural changes or significant code refactoring. I expect detailed explanations for complex solutions or decisions. Do not make changes to files outside the `src/` and `assets/` directories, with the exception of Eleventy configuration files. Focus on delivering high-quality, production-ready code with strong emphasis on performance and SEO.

## System Architecture

### UI/UX Decisions
The website implements a modern, mobile-first responsive design. It supports dark/light themes and incorporates glass morphism effects and smooth animations. Accessibility (WCAG 2.1 Level AA) is a core design principle, ensuring a broad user base can access the site.

### Technical Implementations
The site is built with Eleventy 3.x, Node.js, HTML5, CSS3, and vanilla JavaScript. It uses static site generation for fast page loads, enhanced SEO, and improved security. Images are heavily optimized using `<picture>` tags with WebP sources and JPG fallbacks, alongside lazy loading for performance.

### Feature Specifications
Key features include:
- **SEO Optimization**: Unique meta titles/descriptions, Schema.org structured data (Organization, LocalBusiness, Product, FAQ), semantic HTML5, automatic sitemap.xml, and breadcrumb navigation.
- **Performance**: Minified HTML/CSS/JS, lazy loading, optimized asset delivery, and fast server response times.
- **Content Management**: Over 36 pages covering services (installation, maintenance, repair, refilling), a comprehensive product catalog (wall-mounted, multi-split, ducted, cassette), dedicated brand pages, and a blog.
- **Server Configuration**: `server.js` handles static file serving, security headers (CSP, HSTS, X-Frame-Options), cache control, and 404 pages.

### System Design Choices
The project utilizes Eleventy for static site generation, ensuring maintainability, speed, and cost-effectiveness. The folder structure (`src/pages`, `src/_includes`, `src/_data`, `assets/`) is designed for modularity and easy content management. Development and production workflows are streamlined for Replit Autoscale deployment, binding to `0.0.0.0:5000`. E2E testing with Playwright is integrated to maintain code quality.

## External Dependencies
- **Resend API**: Used for handling email delivery from the contact form.
- **Node.js**: Runtime environment for Eleventy and the server.
- **npm**: Package manager for project dependencies.
- **Playwright**: Used for End-to-End testing.