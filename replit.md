# Air Conditioning Company Website - msk.splitis.ru

## Overview
This project is a production-ready static website for "ИП Лагуто Иван Иванович," an air conditioning sales and installation company in Moscow and Moscow Oblast. The website, `msk.splitis.ru`, built with Eleventy (11ty) v3.1.2, features multiple SEO-optimized landing pages for services, products, and brands. Its primary purpose is to provide a fast, secure, and easily maintainable online presence, enhancing market potential and customer reach. The business vision is to achieve TOP-1 ranking on search engines and significantly increase customer engagement and sales.

## User Preferences
I prefer simple language and clear, direct instructions. I want iterative development with frequent, small updates rather than large, infrequent changes. Please ask for confirmation before implementing any major architectural changes or significant code refactoring. I expect detailed explanations for complex solutions or decisions. Do not make changes to files outside the `src/` and `assets/` directories, with the exception of Eleventy configuration files. Focus on delivering high-quality, production-ready code with strong emphasis on performance and SEO.

## System Architecture

### UI/UX Decisions
The website implements a modern, mobile-first responsive design supporting dark/light themes, glass morphism effects, and smooth animations. Accessibility (WCAG 2.1 Level AA) is a core design principle. Images are designed to be text-free for broader appeal and SEO relevance, utilizing professional technical illustrations or photography. Header and footer components are optimized for conversion and SEO, featuring prominent CTAs, trust indicators, and semantic HTML5.

### Technical Implementations
The site is built with Eleventy 3.1.2, Node.js, HTML5, CSS3, and vanilla JavaScript. It uses static site generation for fast page loads, enhanced SEO, and improved security. Images are heavily optimized using `<picture>` tags with WebP sources and JPG fallbacks, alongside lazy loading for performance. Critical mobile menu bugs, such as scroll lock, have been addressed for an improved user experience.

### Feature Specifications
Key features include:
- **SEO Optimization**: Unique meta titles/descriptions, Schema.org structured data (Organization, LocalBusiness, Product, FAQ, BreadcrumbList), semantic HTML5, automatic sitemap.xml generation, and breadcrumb navigation.
- **Performance**: Minified HTML/CSS/JS, lazy loading, optimized asset delivery, and fast server response times.
- **Content Management**: Over 36 pages covering services (installation, maintenance, repair, refilling), a comprehensive product catalog (wall-mounted, multi-split, ducted, cassette), dedicated brand pages (Daikin, Mitsubishi, LG, Samsung, Panasonic, Gree, Haier, Electrolux), and a blog with 8 articles.
- **Analytics**: Yandex Metrika (ID: 105124660) and Google Tag Manager (GTM-P2LFJL3G) integrated.
- **Forms**: Contact forms with Resend API integration for email delivery.

### System Design Choices
The project utilizes Eleventy for static site generation, ensuring maintainability, speed, and cost-effectiveness. The folder structure (`src/pages`, `src/_includes`, `src/_data`, `assets/`) is designed for modularity and easy content management. 

**Production Deployment:**
- **Hosting**: Timeweb Cloud (VPS)
- **Web Server**: Nginx with SSL (Let's Encrypt certificates)
- **Domain**: msk.splitis.ru (primary), with 301 redirects from splitis.ru and www.splitis.ru
- **SSL Rating**: A+ (SSL Labs)
- **Deployment**: Automated via GitHub Actions on push to `main` branch
- **Server Path**: `/var/www/msk.splitis.ru/_site`
- **Build Process**: `npm run build` generates static files in `_site/` directory

**⚠️ IMPORTANT - Eleventy Template Files:**
- Eleventy uses templates from `_includes/` directory in project root
- Always edit header/footer in `_includes/header.html` and `_includes/footer.html`
- Page template: `_includes/page.html` (includes Yandex Metrika and GTM)
- After editing templates, rebuild with `npm run build` and deploy via GitHub Actions

**⚠️ IMPORTANT - Sitemap Generation:**
- Sitemap is automatically generated in `.eleventy.js` after build
- Only HTML files are included (images, CSS, JS are excluded)
- Excluded directories: `components/`, `docs/`, `schemas/`, `assets/`, `_includes/`, `test-results/`, `playwright-report/`
- All URLs are normalized to prevent double slashes (`//`)

## Deployment Architecture

### GitHub Actions Workflow
- **Trigger**: Automatic on push to `main` branch
- **Workflow File**: `.github/workflows/deploy.yml`
- **Process**:
  1. Checkout code
  2. Setup Node.js 20
  3. Install dependencies (`npm ci`)
  4. Build project (`npm run build`)
  5. Deploy to server via SSH (SCP)
  6. Set permissions and reload Nginx

### Server Configuration
- **OS**: Linux (Timeweb Cloud)
- **Web Server**: Nginx
- **SSL**: Let's Encrypt (auto-renewal via Certbot)
- **Redirects**: 
  - `splitis.ru` → `https://msk.splitis.ru` (301)
  - `www.splitis.ru` → `https://msk.splitis.ru` (301)
  - `http://msk.splitis.ru` → `https://msk.splitis.ru` (301)
- **Security Headers**: CSP, HSTS, X-Frame-Options configured in Nginx

### Local Development
- **Build Command**: `npm run build`
- **Serve Command**: `npm run serve` (for local testing)
- **Watch Mode**: `npm run watch` (auto-rebuild on file changes)
- **Testing**: Playwright E2E tests available

## Project Structure

```
├── src/
│   ├── pages/          # HTML pages with front matter
│   ├── _includes/      # Templates (header.html, footer.html, page.html)
│   └── _data/          # Global data (site.json, contacts.json, navigation.json)
├── assets/
│   ├── css/            # Stylesheets (main.css + components)
│   ├── js/             # JavaScript modules
│   └── images/         # Optimized images (WebP + JPG)
├── _includes/          # Eleventy templates (root level)
├── _site/              # Generated static files (build output)
├── .eleventy.js        # Eleventy configuration
├── nginx.conf          # Nginx server configuration
├── .htaccess           # Apache fallback configuration
└── package.json        # Dependencies and scripts
```

## External Dependencies
- **Resend API**: Used for handling email delivery from the contact form.
- **Node.js**: Runtime environment for Eleventy and build process.
- **npm**: Package manager for project dependencies.
- **Playwright**: Used for End-to-End testing.
- **Eleventy (11ty)**: Static site generator (MIT License).
- **Nginx**: Web server for production hosting.
- **Let's Encrypt**: SSL certificate provider.

## SEO & Analytics

### Search Engine Optimization
- **Sitemap**: Auto-generated `sitemap.xml` with all pages
- **Robots.txt**: Configured to allow all crawlers
- **Schema.org**: JSON-LD structured data on all pages
- **Meta Tags**: Unique titles and descriptions for each page
- **Canonical URLs**: Proper canonical tags to prevent duplicate content
- **Open Graph**: Complete OG tags for social media sharing
- **Twitter Cards**: Configured for Twitter sharing

### Analytics Integration
- **Yandex Metrika**: ID 105124660 (tracking page views, clicks, goals)
- **Google Tag Manager**: Container GTM-P2LFJL3G (manages all tracking tags)

## Build & Deploy Process

1. **Local Development**:
   ```bash
   npm install          # Install dependencies
   npm run build        # Build static site
   npm run serve        # Serve locally for testing
   ```

2. **Production Deployment**:
   - Push changes to `main` branch on GitHub
   - GitHub Actions automatically:
     - Builds the project
     - Deploys to Timeweb Cloud server via SSH
     - Reloads Nginx

3. **Manual Deployment** (if needed):
   - SSH to server
   - Run `/usr/local/bin/deploy-msk-splitis.sh`

## Important Notes

- **Never commit sensitive data**: API keys, tokens, SSH keys are in `.gitignore`
- **Always test locally**: Run `npm run build` before pushing
- **Check sitemap**: Verify `_site/sitemap.xml` after build
- **SSL Certificates**: Auto-renewed by Certbot, no manual intervention needed
- **Domain Redirects**: All traffic from `splitis.ru` and `www.splitis.ru` redirects to `msk.splitis.ru`
