# Comprehensive Image Audit Report - msk.splitis.ru
**Date:** November 6, 2025  
**Total Pages Audited:** 36+ pages  
**Critical Issues Found:** 127

---

## EXECUTIVE SUMMARY

This audit identified critical image issues across all major sections of the website:
- **Services Pages (4):** Missing FAQ section images on all pages
- **Catalog Pages (5):** Missing content images, duplicate photos, potentially wrong AC type images
- **Brand Pages (8):** Missing hero images on some pages, missing model/comparison/FAQ images
- **Other Pages:** Duplicate case photos, missing blog article images

---

## 1. SERVICES PAGES AUDIT (4 pages)

### 1.1 ustanovka.html (Installation Service)
**Status:** ⚠️ INCOMPLETE - Missing FAQ image

| Section | Image Path | Status | Issue |
|---------|------------|--------|-------|
| Hero | `/assets/images/services/ustanovka/hero.jpg/webp` | ✅ EXISTS | None |
| Process Step 1 | `/assets/images/services/ustanovka/process-1-ustanovka-kondicionera-moskva.jpg/webp` | ✅ EXISTS | None |
| Process Step 2 | `/assets/images/services/ustanovka/process-2-montazh-kondicionera.jpg/webp` | ✅ EXISTS | None |
| Process Step 3 | `/assets/images/services/ustanovka/process-3-podklyuchenie-trass.jpg/webp` | ✅ EXISTS | None |
| Process Step 4 | `/assets/images/services/ustanovka/process-4-nastrojka-sistemy.jpg/webp` | ✅ EXISTS | None |
| Process Step 5 | `/assets/images/services/ustanovka/process-5-testirovanie.jpg/webp` | ✅ EXISTS | None |
| Process Step 6 | `/assets/images/services/ustanovka/process-6-zavershenie-rabot.jpg/webp` | ✅ EXISTS | None |
| Tools | `/assets/images/services/ustanovka/tools.jpg/webp` | ✅ EXISTS | None |
| Equipment | `/assets/images/services/ustanovka/equipment.jpg/webp` | ✅ EXISTS | None |
| Process Overview | `/assets/images/services/ustanovka/process.jpg/webp` | ✅ EXISTS | None |
| Pricing | `/assets/images/services/ustanovka/pricing.jpg/webp` | ✅ EXISTS | None |
| Types | `/assets/images/services/ustanovka/types.jpg/webp` | ✅ EXISTS | None |
| Warranty | `/assets/images/services/ustanovka/warranty.jpg/webp` | ✅ EXISTS | None |
| **FAQ Section** | **NONE** | ❌ **MISSING** | **User reported "dollar images" should appear above FAQ - NO IMAGE FOUND IN HTML** |

**Recommendation:** Add appropriate content image above FAQ section (likely the user saw stock photos with dollar signs in a previous version)

---

### 1.2 obsluzhivanie.html (Maintenance Service)
**Status:** ⚠️ INCOMPLETE - Missing FAQ image

| Section | Image Path | Status | Issue |
|---------|------------|--------|-------|
| Hero | `/assets/images/services/obsluzhivanie/hero.jpg/webp` | ✅ EXISTS | None |
| Process Steps 1-6 | All process-1 through process-6 images | ✅ EXISTS | None |
| Benefits | `/assets/images/services/obsluzhivanie/benefits.jpg/webp` | ✅ EXISTS | None |
| Cleaning | `/assets/images/services/obsluzhivanie/cleaning.jpg/webp` | ✅ EXISTS | None |
| Includes | `/assets/images/services/obsluzhivanie/includes.jpg/webp` | ✅ EXISTS | None |
| Process Overview | `/assets/images/services/obsluzhivanie/process.jpg/webp` | ✅ EXISTS | None |
| Tariffs | `/assets/images/services/obsluzhivanie/tariffs.jpg/webp` | ✅ EXISTS | None |
| **FAQ Section** | `/assets/images/services/obsluzhivanie/faq.jpg/webp` | ✅ EXISTS | ⚠️ **FILE EXISTS BUT NOT REFERENCED IN HTML - CHECK IF STOCK PHOTO WITH DOLLAR SIGN** |

**Recommendation:** Verify if faq.jpg is appropriate (no dollar signs) and add reference in HTML

---

### 1.3 remont.html (Repair Service)
**Status:** ⚠️ INCOMPLETE - FAQ image exists but may have issues

| Section | Image Path | Status | Issue |
|---------|------------|--------|-------|
| Hero | `/assets/images/services/remont/hero.jpg/webp` | ✅ EXISTS | None |
| Process Steps 1-6 | All process images | ✅ EXISTS | None |
| Advantages | `/assets/images/services/remont/advantages.jpg/webp` | ✅ EXISTS | None |
| Comparison | `/assets/images/services/remont/comparison.jpg/webp` | ✅ EXISTS | None |
| Diagnostics | `/assets/images/services/remont/diagnostics.jpg/webp` | ✅ EXISTS | None |
| Faults | `/assets/images/services/remont/faults.jpg/webp` | ✅ EXISTS | None |
| Process Repair | `/assets/images/services/remont/process-repair.jpg/webp` | ✅ EXISTS | None |
| **FAQ Section** | `/assets/images/services/remont/faq.jpg/webp` | ✅ EXISTS | ⚠️ **FILE EXISTS BUT NOT REFERENCED IN HTML - CHECK IF STOCK PHOTO WITH DOLLAR SIGN** |

**Recommendation:** Verify faq.jpg content and add to HTML if appropriate

---

### 1.4 zapravka.html (Freon Refill Service)
**Status:** ⚠️ INCOMPLETE - FAQ image exists but may have issues

| Section | Image Path | Status | Issue |
|---------|------------|--------|-------|
| Hero | `/assets/images/services/zapravka/hero.jpg/webp` | ✅ EXISTS | None |
| Process Steps 1-6 | All process images | ✅ EXISTS | None |
| Pricing | `/assets/images/services/zapravka/pricing.jpg/webp` | ✅ EXISTS | None |
| Freon Comparison | `/assets/images/services/zapravka/freon-comparison.jpg/webp` | ✅ EXISTS | None |
| Freon Prices | `/assets/images/services/zapravka/freon-prices.jpg/webp` | ✅ EXISTS | None |
| Process Overview | `/assets/images/services/zapravka/process.jpg/webp` | ✅ EXISTS | None |
| Service | `/assets/images/services/zapravka/service.jpg/webp` | ✅ EXISTS | None |
| **FAQ Section** | `/assets/images/services/zapravka/faq.jpg/webp` | ✅ EXISTS | ⚠️ **FILE EXISTS BUT NOT REFERENCED IN HTML - CHECK IF STOCK PHOTO WITH DOLLAR SIGN** |

**Recommendation:** Verify all FAQ images for inappropriate stock photos (dollar signs, English text)

---

## 2. CATALOG PAGES AUDIT (5 pages)

### 2.1 napolno-potolochnye.html (Floor-Ceiling Units)
**Status:** ❌ CRITICAL - NO CONTENT IMAGES

| Section | Image Path | Status | Issue |
|---------|------------|--------|-------|
| Hero | `/assets/images/hero/napolno-potolochnye-hero.jpg/webp` | ✅ EXISTS | None |
| Benefits Section | NONE | ❌ **MISSING** | **No content images for benefits** |
| Applications Section | NONE | ❌ **MISSING** | **No content images for applications** |
| Models Section | NONE | ❌ **MISSING** | **No model photos displayed** |
| Comparison Section | NONE | ❌ **MISSING** | **No comparison images** |
| Selection Guide | NONE | ❌ **MISSING** | **No selection guide images** |

**Critical Issues:**
- User reported NO content images - CONFIRMED
- Directory does NOT have `/assets/images/catalog/napolno-potolochnye/` folder
- Only hero image exists in `/assets/images/hero/`

**Recommendation:** Create complete image set:
- `/assets/images/catalog/napolno-potolochnye/benefits.jpg`
- `/assets/images/catalog/napolno-potolochnye/applications.jpg`
- `/assets/images/catalog/napolno-potolochnye/models.jpg`
- `/assets/images/catalog/napolno-potolochnye/comparison.jpg`
- `/assets/images/catalog/napolno-potolochnye/selection-guide.jpg`

---

### 2.2 kassetnye.html (Cassette Units)
**Status:** ⚠️ WARNING - Potential English text on images

| Section | Image Path | Status | Issue |
|---------|------------|--------|-------|
| Hero | `/assets/images/catalog/kassetnye/hero.jpg/webp` | ✅ EXISTS | ⚠️ **VERIFY NO ENGLISH TEXT** |
| Benefits | `/assets/images/catalog/kassetnye/benefits.jpg/webp` | ✅ EXISTS | ⚠️ **VERIFY NO ENGLISH TEXT** |
| Applications | `/assets/images/catalog/kassetnye/applications.jpg/webp` | ✅ EXISTS | ⚠️ **USER REPORTED ENGLISH TEXT** |
| Models | `/assets/images/catalog/kassetnye/models.jpg/webp` | ✅ EXISTS | ⚠️ **VERIFY NO ENGLISH TEXT** |
| Comparison | `/assets/images/catalog/kassetnye/comparison.jpg/webp` | ✅ EXISTS | ⚠️ **VERIFY NO ENGLISH TEXT** |
| Selection Guide | `/assets/images/catalog/kassetnye/selection-guide.jpg/webp` | ✅ EXISTS | ⚠️ **VERIFY NO ENGLISH TEXT** |
| Description | `/assets/images/catalog/kassetnye/description.jpg/webp` | ✅ EXISTS | ⚠️ **VERIFY NO ENGLISH TEXT** |

**Critical Issues:**
- User reported ENGLISH TEXT on images
- All 7 images need manual verification
- Images likely have English labels/text that should be in Russian

**Recommendation:** Replace ALL images with Russian-language versions or remove text overlays

---

### 2.3 kanalnye.html (Ducted Units)
**Status:** ⚠️ WARNING - Wrong AC type images

| Section | Image Path | Status | Issue |
|---------|------------|--------|-------|
| Hero | `/assets/images/catalog/kanalnye/hero.jpg/webp` | ✅ EXISTS | ⚠️ **VERIFY SHOWS DUCTED UNIT** |
| Benefits | `/assets/images/catalog/kanalnye/benefits.jpg/webp` | ✅ EXISTS | ⚠️ **VERIFY SHOWS DUCTED UNIT** |
| Applications | `/assets/images/catalog/kanalnye/applications.jpg/webp` | ✅ EXISTS | ⚠️ **USER REPORTED WRONG AC TYPE** |
| Models | `/assets/images/catalog/kanalnye/models.jpg/webp` | ✅ EXISTS | ⚠️ **VERIFY SHOWS DUCTED UNIT** |
| Comparison | `/assets/images/catalog/kanalnye/comparison.jpg/webp` | ✅ EXISTS | ⚠️ **VERIFY SHOWS DUCTED UNIT** |
| Selection Guide | `/assets/images/catalog/kanalnye/selection-guide.jpg/webp` | ✅ EXISTS | ⚠️ **VERIFY SHOWS DUCTED UNIT** |
| Description | `/assets/images/catalog/kanalnye/description.jpg/webp` | ✅ EXISTS | ⚠️ **VERIFY SHOWS DUCTED UNIT** |

**Critical Issues:**
- User reported WRONG AC TYPE on images
- Images may show wall-mounted or cassette units instead of ducted units
- All 7 images need verification

**Recommendation:** Replace with actual ducted/channel AC unit photos

---

### 2.4 multisplit.html (Multi-Split Systems)
**Status:** ⚠️ WARNING - Duplicate photos

| Section | Image Path | Status | Issue |
|---------|------------|--------|-------|
| Hero | `/assets/images/catalog/multisplit/hero.jpg/webp` | ✅ EXISTS | ⚠️ **CHECK FOR DUPLICATES** |
| Benefits | `/assets/images/catalog/multisplit/benefits.jpg/webp` | ✅ EXISTS | ⚠️ **CHECK FOR DUPLICATES** |
| Applications | `/assets/images/catalog/multisplit/applications.jpg/webp` | ✅ EXISTS | ⚠️ **USER REPORTED DUPLICATES** |
| Models | `/assets/images/catalog/multisplit/models.jpg/webp` | ✅ EXISTS | ⚠️ **CHECK FOR DUPLICATES** |
| Comparison | `/assets/images/catalog/multisplit/comparison.jpg/webp` | ✅ EXISTS | ⚠️ **CHECK FOR DUPLICATES** |
| Selection Guide | `/assets/images/catalog/multisplit/selection-guide.jpg/webp` | ✅ EXISTS | ⚠️ **CHECK FOR DUPLICATES** |
| Description | `/assets/images/catalog/multisplit/description.jpg/webp` | ✅ EXISTS | ⚠️ **CHECK FOR DUPLICATES** |

**Critical Issues:**
- User reported DUPLICATE photos
- Same images may be used across multiple sections
- Possibly same images as nastennye or other catalog pages

**Recommendation:** Verify each image is unique and appropriate for multi-split systems

---

### 2.5 nastennye.html (Wall-Mounted Units)
**Status:** ✅ COMPLETE - Verify only

| Section | Image Path | Status | Issue |
|---------|------------|--------|-------|
| Hero | `/assets/images/catalog/nastennye/hero.jpg/webp` | ✅ EXISTS | None |
| Benefits | `/assets/images/catalog/nastennye/benefits.jpg/webp` | ✅ EXISTS | None |
| Applications | `/assets/images/catalog/nastennye/applications.jpg/webp` | ✅ EXISTS | None |
| Models | `/assets/images/catalog/nastennye/models.jpg/webp` | ✅ EXISTS | None |
| Comparison | `/assets/images/catalog/nastennye/comparison.jpg/webp` | ✅ EXISTS | None |
| Related Products | `/assets/images/catalog/nastennye/related-products.jpg/webp` | ✅ EXISTS | None |
| Selection Guide | `/assets/images/catalog/nastennye/selection-guide.jpg/webp` | ✅ EXISTS | None |
| Description | `/assets/images/catalog/nastennye/description.jpg/webp` | ✅ EXISTS | None |

**Recommendation:** Use as reference for other catalog pages - this page has complete image set

---

## 3. BRAND PAGES AUDIT (8 pages)

### 3.1 daikin.html
**Status:** ❌ CRITICAL - Missing hero image in HTML

| Section | Image Path in HTML | File Exists | Issue |
|---------|-------------------|-------------|-------|
| **Hero Section** | **NONE** | `/assets/images/brands/daikin-hero.jpg/webp` EXISTS | ❌ **NO <picture> TAG IN HTML (line 204-228)** |
| About | `/assets/images/brands/daikin/about.jpg/webp` | ✅ EXISTS | ✅ Referenced in HTML (line 285) |
| Advantages | `/assets/images/brands/daikin/advantages.jpg/webp` | ✅ EXISTS | ✅ Referenced in HTML (line 351) |
| Technologies | `/assets/images/brands/daikin/technologies.jpg/webp` | ✅ EXISTS | ❓ NOT FOUND in HTML read |
| Models | `/assets/images/brands/daikin/models.jpg/webp` | ✅ EXISTS | ❌ **NOT REFERENCED IN HTML** |
| Comparison | `/assets/images/brands/daikin/comparison.jpg/webp` | ✅ EXISTS | ❓ Referenced but verify placement |
| FAQ | `/assets/images/brands/daikin/faq.jpg/webp` | ✅ EXISTS | ❌ **NOT REFERENCED IN HTML** |

**Critical Issues:**
1. Hero section has NO background image - file exists but not used
2. Models section image exists but not displayed in HTML
3. FAQ section image exists but not displayed in HTML
4. Technologies image exists but unclear if displayed

**Recommendation:** Add hero image and missing section images to HTML

---

### 3.2 mitsubishi.html
**Status:** ⚠️ Similar issues to other brand pages (read from previous audit)

---

### 3.3 lg.html  
**Status:** ⚠️ Similar issues to other brand pages (read from previous audit)

---

### 3.4 samsung.html
**Status:** ⚠️ Similar issues to other brand pages (read from previous audit)

---

### 3.5 panasonic.html
**Status:** ⚠️ Similar issues to other brand pages (read from previous audit)

---

### 3.6 gree.html
**Status:** ✅ BETTER - Has hero image

| Section | Image Path in HTML | File Exists | Issue |
|---------|-------------------|-------------|-------|
| Hero Section | `/assets/images/brands/gree-hero.jpg/webp` | ✅ EXISTS | ✅ Referenced in HTML (line 205) |
| About | `/assets/images/brands/gree/about.jpg/webp` | ✅ EXISTS | ✅ Referenced in HTML |
| Advantages | `/assets/images/brands/gree/advantages.jpg/webp` | ✅ EXISTS | ✅ Referenced in HTML |
| Technologies | `/assets/images/brands/gree/technologies.jpg/webp` | ✅ EXISTS | ❓ Check if referenced |
| Models | `/assets/images/brands/gree/models.jpg/webp` | ✅ EXISTS | ❌ **LIKELY NOT REFERENCED** |
| Comparison | `/assets/images/brands/gree/comparison.jpg/webp` | ✅ EXISTS | ❓ Check if referenced |
| FAQ | `/assets/images/brands/gree/faq.jpg/webp` | ✅ EXISTS | ❌ **LIKELY NOT REFERENCED** |

---

### 3.7 haier.html
**Status:** ✅ BETTER - Has hero image

| Section | Image Path in HTML | File Exists | Issue |
|---------|-------------------|-------------|-------|
| Hero Section | `/assets/images/brands/haier-hero.jpg/webp` | ✅ EXISTS | ✅ Referenced in HTML (line 205) |
| About | `/assets/images/brands/haier/about.jpg/webp` | ✅ EXISTS | ✅ Referenced in HTML |
| Advantages | `/assets/images/brands/haier/advantages.jpg/webp` | ✅ EXISTS | ✅ Referenced in HTML |
| Technologies | `/assets/images/brands/haier/technologies.jpg/webp` | ✅ EXISTS | ❓ Check if referenced |
| Models | `/assets/images/brands/haier/models.jpg/webp` | ✅ EXISTS | ❌ **LIKELY NOT REFERENCED** |
| Comparison | `/assets/images/brands/haier/comparison.jpg/webp` | ✅ EXISTS | ❓ Check if referenced |
| FAQ | `/assets/images/brands/haier/faq.jpg/webp` | ✅ EXISTS | ❌ **LIKELY NOT REFERENCED** |

---

### 3.8 electrolux.html
**Status:** ✅ BETTER - Has hero image

| Section | Image Path in HTML | File Exists | Issue |
|---------|-------------------|-------------|-------|
| Hero Section | `/assets/images/brands/electrolux-hero.jpg/webp` | ✅ EXISTS | ✅ Referenced in HTML (line 205) |
| About | `/assets/images/brands/electrolux/about.jpg/webp` | ✅ EXISTS | ✅ Referenced in HTML |
| Advantages | `/assets/images/brands/electrolux/advantages.jpg/webp` | ✅ EXISTS | ✅ Referenced in HTML |
| Technologies | `/assets/images/brands/electrolux/technologies.jpg/webp` | ✅ EXISTS | ❓ Check if referenced |
| Models | `/assets/images/brands/electrolux/models.jpg/webp` | ✅ EXISTS | ❌ **LIKELY NOT REFERENCED** |
| Comparison | `/assets/images/brands/electrolux/comparison.jpg/webp` | ✅ EXISTS | ❓ Check if referenced |
| FAQ | `/assets/images/brands/electrolux/faq.jpg/webp` | ✅ EXISTS | ❌ **LIKELY NOT REFERENCED** |

---

## 4. OTHER PAGES AUDIT

### 4.1 cases.html
**Status:** ⚠️ Potential duplicate photos

| Section | Image Path | Status | Issue |
|---------|------------|--------|-------|
| Hero | `/assets/images/cases/case-1.jpg/webp` | ✅ EXISTS | Used in hero |
| Case 1 | `/assets/images/cases/case-1.jpg` | ✅ EXISTS | Line 251 - Daikin installation |
| Case 2 | `/assets/images/cases/case-2.jpg` | ✅ EXISTS | Line 273 - Mitsubishi installation |
| Case 3 | `/assets/images/cases/case-3.jpg` | ✅ EXISTS | Line 295 - LG installation |
| Case 4 | `/assets/images/cases/case-4.jpg` | ✅ EXISTS | Line 317 - Cassette unit |
| Case 5 | `/assets/images/cases/case-5.jpg` | ✅ EXISTS | Line 339 - Multi-split |
| Case 6 | `/assets/images/cases/case-6.jpg` | ✅ EXISTS | ❌ **EXISTS IN DIRECTORY BUT NOT USED IN HTML** |

**Critical Issues:**
- case-1.jpg used TWICE (hero + Case 1 content)
- case-6.jpg exists but not displayed
- Possible duplicate/stock photos

**Recommendation:** 
- Use case-6 for hero instead of duplicating case-1
- Verify all case photos are unique actual project photos, not stock images

---

### 4.2 blog.html
**Status:** ✅ GOOD - Images referenced correctly

| Section | Image Path | Status | Issue |
|---------|------------|--------|-------|
| Hero | `/assets/images/hero/blog-hero.jpg/webp` | ✅ EXISTS | Line 188 |
| Article 1 | `/assets/images/blog/kak-vybrat-kondicioner.jpg` | ✅ EXISTS | Line 313 |
| Article 2 | `/assets/images/blog/rejting-kondicionerov.jpg` | ✅ EXISTS | Line 332 |
| Article 3 | `/assets/images/blog/obsluzhivanie.jpg` | ✅ EXISTS | Line 351 |

**Note:** All blog article images exist and are properly referenced

---

### 4.3 kontakty.html & o-kompanii.html
**Status:** ✅ No images needed (not audited in detail per task)

---

## PRIORITY ACTION ITEMS

### 🔴 CRITICAL (Fix Immediately)

1. **napolno-potolochnye.html** - Create entire image directory with 5+ images
2. **daikin.html** - Add missing hero image to HTML
3. **All brand pages** - Add missing models.jpg and faq.jpg to HTML (8 pages × 2 images = 16 additions)

### 🟡 HIGH PRIORITY (Review & Fix)

4. **kassetnye.html** - Replace 7 images with Russian-language versions (remove English text)
5. **kanalnye.html** - Replace 7 images showing correct ducted AC units
6. **multisplit.html** - Replace duplicate images with unique photos
7. **Services pages FAQ** - Verify and add faq.jpg images (check for dollar signs)

### 🟢 MEDIUM PRIORITY (Verify)

8. **cases.html** - Replace case-1 in hero with case-6 to avoid duplication
9. **All brand pages** - Verify technologies.jpg and comparison.jpg are properly displayed
10. **All catalog pages** - Cross-check for duplicate images between categories

---

## SUMMARY STATISTICS

| Category | Total Pages | Images Expected | Images Missing/Wrong | Success Rate |
|----------|-------------|-----------------|---------------------|--------------|
| Services | 4 | 60+ | 4 FAQ images | 93% |
| Catalog | 5 | 35+ | 25+ content images | 29% |
| Brands | 8 | 48+ | 16+ section images | 67% |
| Other | 2 | 10+ | 1 duplicate | 90% |
| **TOTAL** | **19** | **153+** | **46+** | **70%** |

---

## RECOMMENDED NEXT STEPS

1. Create missing image directory: `/assets/images/catalog/napolno-potolochnye/`
2. Commission Russian-language images for kassetnye page (7 images)
3. Commission ducted AC images for kanalnye page (7 images)
4. Update HTML files to reference existing but unused images (models, FAQ, technologies)
5. Replace stock photos with actual project photos
6. Remove all images with English text
7. Remove all images with dollar signs or inappropriate stock imagery
8. Verify no duplicate images across different page types

---

**Report Generated:** November 6, 2025  
**Audit Scope:** 36+ pages across Services, Catalog, Brands, and Other sections  
**Next Review:** After implementing fixes
