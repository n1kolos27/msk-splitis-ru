# Air Conditioning Company Website - msk.splitis.ru

## Overview
This project is a production-ready static website for "ИП Лагуто Иван Иванович," an air conditioning sales and installation company in Moscow and Moscow Oblast. The website, `msk.splitis.ru`, built with Eleventy (11ty), features multiple SEO-optimized landing pages for services, products, and brands. Its primary purpose is to provide a fast, secure, and easily maintainable online presence, enhancing market potential and customer reach. The business vision is to achieve TOP-1 ranking on search engines and significantly increase customer engagement and sales.

## User Preferences
I prefer simple language and clear, direct instructions. I want iterative development with frequent, small updates rather than large, infrequent changes. Please ask for confirmation before implementing any major architectural changes or significant code refactoring. I expect detailed explanations for complex solutions or decisions. Do not make changes to files outside the `src/` and `assets/` directories, with the exception of Eleventy configuration files. Focus on delivering high-quality, production-ready code with strong emphasis on performance and SEO.

## System Architecture

### UI/UX Decisions
The website implements a modern, mobile-first responsive design supporting dark/light themes, glass morphism effects, and smooth animations. Accessibility (WCAG 2.1 Level AA) is a core design principle. Images are designed to be text-free for broader appeal and SEO relevance, utilizing professional technical illustrations or photography. Header and footer components are optimized for conversion and SEO, featuring prominent CTAs, trust indicators, and semantic HTML5.

### Technical Implementations
The site is built with Eleventy 3.x, Node.js, HTML5, CSS3, and vanilla JavaScript. It uses static site generation for fast page loads, enhanced SEO, and improved security. Images are heavily optimized using `<picture>` tags with WebP sources and JPG fallbacks, alongside lazy loading for performance. Critical mobile menu bugs, such as scroll lock, have been addressed for an improved user experience.

### Feature Specifications
Key features include:
- **SEO Optimization**: Unique meta titles/descriptions, Schema.org structured data (Organization, LocalBusiness, Product, FAQ), semantic HTML5, automatic sitemap.xml, and breadcrumb navigation.
- **Performance**: Minified HTML/CSS/JS, lazy loading, optimized asset delivery, and fast server response times.
- **Content Management**: Over 36 pages covering services (installation, maintenance, repair, refilling), a comprehensive product catalog (wall-mounted, multi-split, ducted, cassette), dedicated brand pages, and a blog.

### System Design Choices
The project utilizes Eleventy for static site generation, ensuring maintainability, speed, and cost-effectiveness. The folder structure (`src/pages`, `src/_includes`, `src/_data`, `assets/`) is designed for modularity and easy content management. Development and production workflows are streamlined for Replit Autoscale deployment, binding to `0.0.0.0:5000`. E2E testing with Playwright is integrated to maintain code quality. The `server.js` handles static file serving, security headers (CSP, HSTS, X-Frame-Options), cache control, and 404 pages.

**⚠️ IMPORTANT - Eleventy Template Files:**
- Eleventy uses templates from `_includes/` directory in project root
- Always edit header/footer in `_includes/header.html` and `_includes/footer.html`
- Duplicate files in `src/_includes/` and `components/` have been removed (November 9, 2025)
- After editing templates, rebuild with `npx @11ty/eleventy` and restart frontend workflow

## External Dependencies
- **Resend API**: Used for handling email delivery from the contact form.
- **Node.js**: Runtime environment for Eleventy and the server.
- **npm**: Package manager for project dependencies.
- **Playwright**: Used for End-to-End testing.