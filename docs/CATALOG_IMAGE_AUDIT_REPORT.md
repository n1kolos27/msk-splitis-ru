# CATALOG PAGES IMAGE AUDIT REPORT
**Date:** November 6, 2025  
**Pages Audited:** kassetnye.html, kanalnye.html, multisplit.html  
**Audit Type:** Image content verification, duplicate detection, AC type validation

---

## EXECUTIVE SUMMARY

**CRITICAL ISSUES FOUND:** 11 problematic images across 3 pages  
**DUPLICATE IMAGES:** 3 instances of duplicated content  
**WRONG AC TYPE:** 9 product images showing incorrect equipment  
**BREADCRUMB ERROR:** 1 page with wrong navigation label

---

## DETAILED FINDINGS BY PAGE

### 1. KASSETNYE.HTML (Cassette AC Units)

**PAGE URL:** /katalog/bytovye/kassetnye.html  
**EXPECTED CONTENT:** Cassette-type air conditioners (ceiling-mounted units with decorative panels)

#### Images Inventory:
1. `/assets/images/catalog/kassetnye/hero.jpg` - Hero section background
2. `/assets/images/catalog/kassetnye/benefits.jpg` - Benefits section illustration
3. `/assets/images/catalog/kassetnye/models.jpg` - Models showcase section
4. `/assets/images/catalog/kassetnye/description.jpg` - Description section illustration
5. `/assets/images/catalog/kassetnye/comparison.jpg` - Comparison table illustration
6. `/assets/images/catalog/kassetnye/applications.jpg` - Applications section illustration
7. `/assets/images/catalog/kassetnye/selection-guide.jpg` - Selection guide illustration
8. `/assets/images/products/daikin-ftxs25k.jpg` - Product card (Daikin)
9. `/assets/images/products/mitsubishi-msz-ln25.jpg` - Product card (Mitsubishi)
10. `/assets/images/products/lg-s12eq3.jpg` - Product card (LG)

#### Issues Found:

**ISSUE #1: Wrong Product Images (HIGH PRIORITY)**
- **Images:** daikin-ftxs25k.jpg, mitsubishi-msz-ln25.jpg, lg-s12eq3.jpg
- **Location:** Product cards section (lines 490, 510, 529)
- **Problem:** These are WALL-MOUNTED unit model numbers, not cassette units
  - FTXS25K = Daikin wall-mounted model
  - MSZ-LN25 = Mitsubishi Electric wall-mounted model
  - S12EQ3 = LG wall-mounted model
- **Impact:** Misleads customers - shows wrong equipment type
- **Recommendation:** Generate new product images showing actual cassette units:
  - **Image 1:** Cassette AC with 4-way airflow, ceiling-mounted panel visible
  - **Image 2:** Premium cassette unit showing decorative ceiling panel integration
  - **Image 3:** Compact cassette unit for smaller spaces
  - All images should show the characteristic square ceiling panel (600x600mm or 1200x600mm)

**ISSUE #2: Duplicate Image with Kanalnye Page (MEDIUM PRIORITY)**
- **Image:** comparison.jpg
- **Hash:** 35d164cd2e7c973b0e78511b946780db
- **Problem:** Identical file used on kassetnye AND kanalnye pages
- **Impact:** Same comparison graphic appears on two different AC type pages
- **Recommendation:** Create unique comparison.jpg for kassetnye showing cassette-specific features

**ISSUE #3: Duplicate Image Used as Description (MEDIUM PRIORITY)**
- **Image:** description.jpg
- **Hash:** 35d164cd2e7c973b0e78511b946780db (same as comparison.jpg and kanalnye/comparison.jpg!)
- **Problem:** This image is identical to the comparison image
- **Impact:** Same graphic appears twice on the page (description and comparison sections)
- **Recommendation:** Create new description.jpg showing cassette AC installation process or ceiling integration

**ISSUE #4: Potential English Text on PNG Files (INVESTIGATION NEEDED)**
- **Images:** *.png files in kassetnye/ directory (4 files)
- **Problem:** PNG files exist but aren't used in HTML; may contain English text
- **Files:** applications.png, benefits.png, comparison.png, models.png
- **Recommendation:** Review PNG files for English text; if clean, convert to JPG for use

---

### 2. KANALNYE.HTML (Ducted/Channel AC Units)

**PAGE URL:** /katalog/bytovye/kanalnye.html  
**EXPECTED CONTENT:** Ducted air conditioners (concealed units with air ducts and vents)

#### Images Inventory:
1. `/assets/images/catalog/kanalnye/hero.jpg` - Hero section background
2. `/assets/images/catalog/kanalnye/benefits.jpg` - Benefits section illustration
3. `/assets/images/catalog/kanalnye/models.jpg` - Models showcase section
4. `/assets/images/catalog/kanalnye/description.jpg` - Description section illustration
5. `/assets/images/catalog/kanalnye/comparison.jpg` - Comparison table illustration
6. `/assets/images/catalog/kanalnye/applications.jpg` - Applications section illustration
7. `/assets/images/catalog/kanalnye/selection-guide.jpg` - Selection guide illustration
8. `/assets/images/products/daikin-ftxs25k.jpg` - Product card (Daikin)
9. `/assets/images/products/mitsubishi-msz-ln25.jpg` - Product card (Mitsubishi)
10. `/assets/images/products/lg-s12eq3.jpg` - Product card (LG)

#### Issues Found:

**ISSUE #5: Wrong Product Images (HIGH PRIORITY)**
- **Images:** daikin-ftxs25k.jpg, mitsubishi-msz-ln25.jpg, lg-s12eq3.jpg
- **Location:** Product cards section (lines 488, 508, 527)
- **Problem:** Same wall-mounted units as kassetnye page - NOT ducted units
- **Impact:** Shows completely wrong AC type to customers
- **Recommendation:** Generate new product images showing actual ducted units:
  - **Image 1:** Ducted AC concealed in ceiling with visible air ducts
  - **Image 2:** Ducted system with multiple ceiling vents/grilles
  - **Image 3:** Commercial ducted installation showing distribution network
  - Images should emphasize hidden installation and vent grilles

**ISSUE #6: Critical Duplicate - Description IS Comparison (HIGH PRIORITY)**
- **Images:** description.jpg AND comparison.jpg
- **Hash:** BOTH files have hash 35d164cd2e7c973b0e78511b946780db
- **Problem:** The description.jpg file IS IDENTICAL to comparison.jpg (and also identical to kassetnye/comparison.jpg!)
- **Impact:** Same image appears in two sections on this page, and shared with kassetnye page
- **Recommendation:** 
  - Create NEW description.jpg showing ducted AC system architecture
  - Create NEW comparison.jpg unique to ducted systems
  - Ensure images show appropriate ducted AC characteristics (ductwork, vents, concealed installation)

**ISSUE #7: PNG Files Present (INVESTIGATION NEEDED)**
- **Files:** 5 PNG files exist (applications.png, benefits.png, comparison.png, description.png, models.png, selection-guide.png)
- **Problem:** May contain English text; not currently used
- **Recommendation:** Audit PNG files for English text

---

### 3. MULTISPLIT.HTML (Multi-Split Systems)

**PAGE URL:** /katalog/bytovye/multisplit.html  
**EXPECTED CONTENT:** Multi-split systems (one outdoor unit, multiple indoor units)

#### Images Inventory:
1. `/assets/images/catalog/multisplit/hero.jpg` - Hero section background
2. `/assets/images/catalog/multisplit/benefits.jpg` - Benefits section illustration
3. `/assets/images/catalog/multisplit/models.jpg` - Models showcase section
4. `/assets/images/catalog/multisplit/description.jpg` - Description section illustration
5. `/assets/images/catalog/multisplit/comparison.jpg` - Comparison table illustration
6. `/assets/images/catalog/multisplit/applications.jpg` - Applications section illustration
7. `/assets/images/catalog/multisplit/selection-guide.jpg` - Selection guide illustration
8. `/assets/images/products/daikin-ftxs25k.jpg` - Product card (Daikin)
9. `/assets/images/products/mitsubishi-msz-ln25.jpg` - Product card (Mitsubishi)
10. `/assets/images/products/lg-s12eq3.jpg` - Product card (LG)

#### Issues Found:

**ISSUE #8: Wrong Breadcrumb Text (MEDIUM PRIORITY)**
- **Location:** Line 376
- **Problem:** Breadcrumb shows "Настенные кондиционеры" (Wall-mounted AC) instead of "Мульти-сплит системы"
- **Impact:** Navigation confusion for users
- **Recommendation:** Fix breadcrumb text to "Мульти-сплит системы"

**ISSUE #9: Wrong Product Images (HIGH PRIORITY)**
- **Images:** daikin-ftxs25k.jpg, mitsubishi-msz-ln25.jpg, lg-s12eq3.jpg
- **Location:** Product cards section (lines 488, 508, 527)
- **Problem:** Same wall-mounted units - NOT multi-split systems
- **Impact:** Misleading - shows single units instead of multi-zone systems
- **Recommendation:** Generate new product images showing actual multi-split systems:
  - **Image 1:** Multi-split system diagram (1 outdoor + multiple indoor units connected)
  - **Image 2:** Multi-zone installation (showing 2-3 indoor units in different rooms)
  - **Image 3:** Outdoor unit with multiple connections highlighted
  - Images should emphasize the "one outdoor, multiple indoor" concept

**ISSUE #10: Duplicate Benefits and Description Images (HIGH PRIORITY)**
- **Images:** benefits.jpg AND description.jpg
- **Hash:** BOTH files have hash a21f3ec8ce55b49e08a5876177c427e2
- **Problem:** benefits.jpg and description.jpg are IDENTICAL files
- **Impact:** Same image appears twice on the page in different sections
- **Recommendation:**
  - Keep benefits.jpg as-is (or verify it's appropriate)
  - Create NEW description.jpg showing multi-split installation details
  - New description image should illustrate how one outdoor unit serves multiple rooms

**ISSUE #11: PNG Files Present (INVESTIGATION NEEDED)**
- **Files:** 4 PNG files (applications.png, benefits.png, models.png, selection-guide.png)
- **Problem:** May contain English text; not currently used
- **Recommendation:** Audit for English text

---

## SUMMARY OF ISSUES BY SEVERITY

### HIGH PRIORITY (Fix Immediately)
1. **Wrong Product Images** - All 3 pages use wall-mounted unit images (9 images total)
2. **Critical Duplicates:**
   - kanalnye: description.jpg = comparison.jpg (same image in 2 sections)
   - multisplit: benefits.jpg = description.jpg (same image in 2 sections)

### MEDIUM PRIORITY (Fix Soon)
3. **Cross-page Duplicates:**
   - kassetnye/comparison.jpg = kanalnye/comparison.jpg
   - kassetnye/description.jpg = kanalnye/comparison.jpg
4. **Breadcrumb Error** - multisplit shows wrong breadcrumb text

### INVESTIGATION NEEDED
5. **PNG Files** - Check for English text on unused PNG source files

---

## RECOMMENDED ACTIONS

### Immediate Actions (HIGH PRIORITY)

#### 1. Replace All Product Images (3 pages × 3 images = 9 replacements)

**For KASSETNYE.HTML:**
- Generate cassette-specific product images showing:
  - Ceiling-mounted square panels (600x600mm or 1200x600mm)
  - 4-way airflow direction
  - Integration with suspended ceilings
  - Decorative panel visible from below

**For KANALNYE.HTML:**
- Generate ducted-specific product images showing:
  - Concealed internal unit
  - Visible ductwork and air distribution
  - Ceiling vent grilles
  - Multi-room ducted configuration

**For MULTISPLIT.HTML:**
- Generate multi-split specific images showing:
  - One outdoor unit with multiple indoor units
  - Multi-zone installation diagram
  - Different indoor unit types connected to one outdoor unit
  - Emphasize the system architecture

#### 2. Fix Critical Duplicate Issues

**KANALNYE.HTML:**
- Create NEW `/assets/images/catalog/kanalnye/description.jpg`
  - Content: Show ducted system architecture, ductwork layout, air distribution
- Create NEW `/assets/images/catalog/kanalnye/comparison.jpg`  
  - Content: Comparison table specific to ducted systems vs other types

**MULTISPLIT.HTML:**
- Create NEW `/assets/images/catalog/multisplit/description.jpg`
  - Content: Multi-split installation process, showing one outdoor + multiple indoor units

### Secondary Actions (MEDIUM PRIORITY)

#### 3. Fix Cross-Page Duplicates

**KASSETNYE.HTML:**
- Create NEW `/assets/images/catalog/kassetnye/comparison.jpg`
  - Content: Comparison specific to cassette units
- Create NEW `/assets/images/catalog/kassetnye/description.jpg`
  - Content: Cassette AC ceiling integration and installation

#### 4. Fix Breadcrumb
- Edit multisplit.html line 376
- Change: "Настенные кондиционеры" → "Мульти-сплит системы"

### Investigation Actions

#### 5. Audit PNG Files for English Text
- Review all PNG files in kassetnye/, kanalnye/, multisplit/ directories
- If English text found: request Russian translations
- If clean: use PNG files as JPG replacements (better quality)

---

## IMAGE GENERATION SPECIFICATIONS

### General Requirements for ALL New Images:
- **Dimensions:** 1200×800px minimum for content images
- **Format:** JPG (optimized) + WebP version
- **Language:** All text must be in Russian
- **Style:** Professional, clean, modern
- **Branding:** Consistent with website design
- **Content:** Show realistic AC equipment, not stock photos

### Specific Content Requirements:

#### Cassette Units (KASSETNYE):
✓ Show ceiling-mounted square panel  
✓ Emphasize 4-way airflow  
✓ Integration with suspended ceiling  
✓ Decorative panel visible from below  
✓ Professional/commercial setting

#### Ducted Units (KANALNYE):
✓ Show concealed installation  
✓ Visible ductwork/air distribution  
✓ Ceiling vent grilles  
✓ Multi-room coverage diagram  
✓ Emphasize centralized system

#### Multi-Split Systems (MULTISPLIT):
✓ Show 1 outdoor + multiple indoor units  
✓ System architecture diagram  
✓ Different room zones  
✓ Emphasize space-saving (one outdoor unit)  
✓ Independent control per zone

---

## VERIFICATION CHECKLIST

Before marking this workstream complete, verify:

- [ ] All 9 product images replaced with correct AC types
- [ ] All duplicate image issues resolved (5 duplicates fixed)
- [ ] Breadcrumb error fixed on multisplit.html
- [ ] PNG files audited for English text
- [ ] All new images are in Russian
- [ ] All new images show correct AC type for each page
- [ ] WebP versions generated for all new JPG images
- [ ] Images optimized for web (<200KB each)

---

## REFERENCE: GOOD EXAMPLE

**Page:** nastennye.html (Wall-mounted AC)  
**Why it's good:** 
- Uses appropriate product images for wall-mounted units
- Has unique images (not duplicated with other pages)
- No duplicate images within the page itself
- Includes related-products.jpg section

**Use as template for:**
- Image variety per page
- Appropriate equipment type shown
- No duplicates

---

## FILES REQUIRING UPDATES

### New Images Needed (Priority Order):
1. `/assets/images/products/daikin-cassette-[model].jpg` - Cassette Daikin unit
2. `/assets/images/products/mitsubishi-cassette-[model].jpg` - Cassette Mitsubishi unit
3. `/assets/images/products/lg-cassette-[model].jpg` - Cassette LG unit
4. `/assets/images/products/daikin-ducted-[model].jpg` - Ducted Daikin unit
5. `/assets/images/products/mitsubishi-ducted-[model].jpg` - Ducted Mitsubishi unit
6. `/assets/images/products/lg-ducted-[model].jpg` - Ducted LG unit
7. `/assets/images/products/daikin-multisplit-[model].jpg` - Multi-split Daikin system
8. `/assets/images/products/mitsubishi-multisplit-[model].jpg` - Multi-split Mitsubishi system
9. `/assets/images/products/lg-multisplit-[model].jpg` - Multi-split LG system
10. `/assets/images/catalog/kanalnye/description.jpg` - NEW unique image
11. `/assets/images/catalog/kanalnye/comparison.jpg` - NEW unique image
12. `/assets/images/catalog/multisplit/description.jpg` - NEW unique image
13. `/assets/images/catalog/kassetnye/comparison.jpg` - NEW unique image
14. `/assets/images/catalog/kassetnye/description.jpg` - NEW unique image

### HTML Files Requiring Updates:
1. `src/pages/katalog/bytovye/kassetnye.html` - Update product image paths (lines 490, 510, 529)
2. `src/pages/katalog/bytovye/kanalnye.html` - Update product image paths (lines 488, 508, 527)
3. `src/pages/katalog/bytovye/multisplit.html` - Update product image paths (lines 488, 508, 527) + breadcrumb (line 376)

---

## ESTIMATED EFFORT

- **Image Generation:** 14 new images × 30 min = 7 hours
- **Image Optimization:** 14 images × 5 min = 1.2 hours  
- **HTML Updates:** 3 files × 15 min = 45 min
- **WebP Conversion:** 14 images × 3 min = 42 min
- **Testing/QA:** 1 hour

**Total Estimated Time:** ~10-11 hours

---

**Report Prepared By:** Replit Agent - Image Audit Task  
**Next Steps:** Generate replacement images according to specifications above
