# Air Conditioning Company Website - msk.splitis.ru

## Overview
This project is a production-ready static website for "ИП Лагуто Иван Иванович," an air conditioning sales and installation company in Moscow and Moscow Oblast. The website, `msk.splitis.ru`, built with Eleventy (11ty), features multiple SEO-optimized landing pages for services, products, and brands. Its primary purpose is to provide a fast, secure, and easily maintainable online presence, enhancing market potential and customer reach. The business vision is to achieve TOP-1 ranking on search engines and significantly increase customer engagement and sales.

## Recent Changes

### Cassette AC Comparison Image Fixed (November 7, 2025 - Latest)
Replaced comparison image with EXTENSIVE TEXT on kassetnye.html with text-free version:

**Problem Identified:**
- `comparison.jpg` on kassetnye.html showed complex table with EXTENSIVE text and data
- Text content: "Cassette Air Conditioner Model Comparison & Performance", tables with BTU/h, EER, noise levels, dimensions, features, percentages, statistics, charts, graphs
- User reported: "kassetnye.html, такая же история!" (same problem as other pages)
- Critical violation of "БЕЗ ТЕКСТА!" (NO TEXT!) requirement

**Solution Implemented:**
- Generated NEW comparison image WITHOUT any text:
  - `comparison.jpg + .webp`: Cassette AC units displayed for visual comparison (94KB JPG, 45KB WebP)
- Shows multiple cassette ceiling AC models side by side for visual comparison
- Zero text, labels, numbers, charts, graphs, tables, or statistics - pure visual product comparison
- Professional product photography on clean background

**Technical Details:**
- AI-generated images with strong negative prompts preventing ALL text/data
- Converted to optimized JPG (quality 90) and WebP (quality 85)
- Replaced files in assets/images/catalog/kassetnye/ directory
- Site rebuilt: 655 files copied, 43 HTML files generated
- Workflow restarted successfully

**Impact:**
- ✅ Image now completely text-free (БЕЗ ТЕКСТА!)
- ✅ Visual product comparison still effective
- ✅ Maintains project's strict "no text on images" policy
- ✅ Improved user experience with clean imagery

### Floor-Ceiling AC Comparison Image Fixed (November 7, 2025)
Replaced comparison image with TEXT on napolno-potolochnye.html with text-free version showing 4 AC system types (cassette, outdoor condenser, portable, rooftop) visually side by side (104KB JPG, 49KB WebP). Zero text labels.

### Blog Page Popular Articles Images Added (November 7, 2025)
Created 6 missing images for blog.html Popular Articles section WITHOUT text: kak-vybrat-kondicioner, rejting-kondicionerov, obsluzhivanie, invertornyj, ekonomiya, ofis (all with .jpg + .webp formats, optimized with <picture> tags).

### Cases Page Images Complete Replacement (November 7, 2025)
Replaced ALL 6 case study images on cases.html with contextually relevant installation RESULTS in real interiors. Each image matches case description (Daikin in apartment, Mitsubishi in office, LG in bedroom, cassette in office ceiling, multi-split in cottage, premium installation). Zero text, people, or processes.

## User Preferences
I prefer simple language and clear, direct instructions. I want iterative development with frequent, small updates rather than large, infrequent changes. Please ask for confirmation before implementing any major architectural changes or significant code refactoring. I expect detailed explanations for complex solutions or decisions. Do not make changes to files outside the `src/` and `assets/` directories, with the exception of Eleventy configuration files. Focus on delivering high-quality, production-ready code with strong emphasis on performance and SEO.

## System Architecture

### UI/UX Decisions
The website implements a modern, mobile-first responsive design supporting dark/light themes, glass morphism effects, and smooth animations. Accessibility (WCAG 2.1 Level AA) is a core design principle. Images are designed to be text-free for broader appeal and SEO relevance, utilizing professional technical illustrations or photography.

### Technical Implementations
The site is built with Eleventy 3.x, Node.js, HTML5, CSS3, and vanilla JavaScript. It uses static site generation for fast page loads, enhanced SEO, and improved security. Images are heavily optimized using `<picture>` tags with WebP sources and JPG fallbacks, alongside lazy loading for performance.

### Feature Specifications
Key features include:
- **SEO Optimization**: Unique meta titles/descriptions, Schema.org structured data (Organization, LocalBusiness, Product, FAQ), semantic HTML5, automatic sitemap.xml, and breadcrumb navigation.
- **Performance**: Minified HTML/CSS/JS, lazy loading, optimized asset delivery, and fast server response times.
- **Content Management**: Over 36 pages covering services (installation, maintenance, repair, refilling), a comprehensive product catalog (wall-mounted, multi-split, ducted, cassette), dedicated brand pages, and a blog.

### System Design Choices
The project utilizes Eleventy for static site generation, ensuring maintainability, speed, and cost-effectiveness. The folder structure (`src/pages`, `src/_includes`, `src/_data`, `assets/`) is designed for modularity and easy content management. Development and production workflows are streamlined for Replit Autoscale deployment, binding to `0.0.0.0:5000`. E2E testing with Playwright is integrated to maintain code quality. The `server.js` handles static file serving, security headers (CSP, HSTS, X-Frame-Options), cache control, and 404 pages.

## External Dependencies
- **Resend API**: Used for handling email delivery from the contact form.
- **Node.js**: Runtime environment for Eleventy and the server.
- **npm**: Package manager for project dependencies.
- **Playwright**: Used for End-to-End testing.