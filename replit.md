# Air Conditioning Company Website - msk.splitis.ru

## Overview
This project is a production-ready static website for "ИП Лагуто Иван Иванович", an air conditioning sales and installation company operating in Moscow and Moscow Oblast. The website, `msk.splitis.ru`, is built using Eleventy (11ty) and features multiple SEO-optimized landing pages to showcase services, products, and brands. Its primary purpose is to provide a fast, secure, and easily maintainable online presence for the business, enhancing its market potential and customer reach.

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