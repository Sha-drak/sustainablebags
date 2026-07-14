# Requirements Document

## Introduction

The Enactus Website is a social enterprise platform built with React + Vite for an Enactus project that transforms waste materials into sustainable school bags and lifestyle totes. The platform serves multiple audiences — students in need, schools and NGOs seeking to request bags, sponsors and corporate partners, and lifestyle consumers — and must communicate impact, sustainability, trust, and premium craftsmanship. The core brand message is: *"Transforming waste into opportunities, one bag at a time."*

The site combines storytelling, product showcase, a request portal (powered by Formspree), an interactive community map, and an impact dashboard into a cohesive, mobile-responsive experience animated with Framer Motion.

---

## Glossary

- **Website**: The full Enactus social enterprise platform built with React + Vite.
- **Navbar**: The sticky top navigation bar with transparent-to-white scroll behaviour.
- **HeroSlider**: The full-screen animated slider with 3–5 slides occupying the hero section.
- **ImpactStats**: The animated counter row displaying headline statistics (students, communities, waste).
- **ProductCard**: A reusable card component representing a single product (bag) in the showcase.
- **RequestSection**: The section containing the bag-request form connected to Formspree.
- **RequestForm**: The HTML form inside RequestSection submitted to the Formspree endpoint.
- **SchoolCard**: A reusable card displaying a supported school's name, location, student count, and year.
- **ImpactDashboard**: The full-width section displaying large animated impact numbers.
- **ImpactMap**: The interactive SVG/canvas map of Africa/Ghana marking supported schools and communities.
- **Timeline**: The visual storytelling sequence: Waste Collection → Material Processing → Bag Creation → Community Distribution.
- **Footer**: The dark premium footer containing the logo, mission statement, navigation links, and social media icons.
- **WhatsAppButton**: The floating action button (bottom-right) linking to a WhatsApp chat.
- **Formspree**: The third-party form-backend service at `https://formspree.io/f/mzdnpaej`.
- **Framer_Motion**: The React animation library used for all scroll-triggered and transition animations.
- **User**: Any visitor to the Website (school representative, sponsor, consumer, or general public).
- **School_Representative**: A user acting on behalf of a school or NGO to request bags.
- **Partner**: A company, NGO, or individual seeking to sponsor or collaborate with the project.

---

## Requirements

### Requirement 1: Navigation Bar

**User Story:** As a User, I want a clear and persistent navigation bar, so that I can access any section of the Website at any time.

#### Acceptance Criteria

1. THE Navbar SHALL display the following links in order: Home, Our Story, Products, Impact, Schools, Partner With Us.
2. THE Navbar SHALL display a "Request Bags" call-to-action button rendered as a filled button with a background colour (Deep Forest Green) and contrasting label text, visually distinguishing it from the plain text navigation links.
3. WHEN the page scroll position is at the top (0px), THE Navbar SHALL render with a transparent background.
4. WHEN the User scrolls the page beyond 0px from the top, THE Navbar SHALL transition to a white background with a box-shadow of at least 2px vertical offset and 4px blur within no more than 300ms.
5. THE Navbar SHALL remain fixed (sticky) at the top of the viewport during all scroll positions.
6. WHEN the viewport width is below 768px, THE Navbar SHALL collapse navigation links into a hamburger menu icon.
7. WHEN the User taps the hamburger menu icon on a mobile viewport, THE Navbar SHALL expand and display all navigation links in a dropdown or drawer.
8. WHEN the User taps the hamburger menu icon a second time while the menu is open, THE Navbar SHALL collapse the dropdown or drawer.
9. WHEN the User taps any navigation link while the mobile menu is open, THE Navbar SHALL close the dropdown or drawer.

---

### Requirement 2: Hero Slider

**User Story:** As a User, I want a compelling full-screen hero section with multiple slides, so that I immediately understand the project's mission, products, and call to action.

#### Acceptance Criteria

1. THE HeroSlider SHALL display a minimum of 3 and a maximum of 5 slides in sequence.
2. THE HeroSlider SHALL include the following slides in order:
   - Slide 1 — Headline: "Turning Waste Into Opportunities", CTAs: "Request Bags" and "Discover Our Impact"
   - Slide 2 — Headline: "Waste Today. Opportunity Tomorrow.", CTAs: "Explore Our Process" and "Become a Partner"
   - Slide 3 — Headline: "Sustainable Bags Designed With Purpose", CTAs: "Shop Tote Bags" and "Customize a Bag"
   - Slide 4 — Headline: "Help Equip The Next Generation", CTAs: "Submit A Request" and "View Supported Schools"
3. WHEN a slide transition occurs, THE HeroSlider SHALL animate between slides using either a crossfade (opacity transition) or a horizontal slide (translateX transition) lasting exactly 600ms — not both simultaneously — and the transition SHALL complete within 800ms of being triggered.
4. THE HeroSlider SHALL auto-advance to the next slide every 5 seconds when the User has not hovered over, clicked, touched, or keyboard-focused the slider.
5. WHEN the User clicks or taps a navigation dot or arrow control, THE HeroSlider SHALL immediately begin the transition to the selected slide, reset the 5-second auto-advance timer, and SHALL wrap around (last slide advances to first; first slide goes back to last).
6. THE HeroSlider SHALL display clickable navigation dots below or overlaid on the slide area, with the active slide's dot visually distinct from inactive dots (e.g., filled vs. outlined or different colour), indicating the current slide index out of total slides.
7. THE HeroSlider SHALL display a statistics bar beneath the slides containing: "500+ Students Supported", "10+ Communities Reached", "1000kg+ Waste Repurposed".
8. WHEN rendered on a viewport width below 768px, THE HeroSlider SHALL stack headline and CTA elements vertically, and all text within the slide SHALL render at a minimum font size of 16px.

---

### Requirement 3: The Problem Section

**User Story:** As a User, I want to understand the social and environmental problem being addressed, so that I appreciate the purpose and urgency of the project.

#### Acceptance Criteria

1. THE Website SHALL display a "The Problem" section with a two-column layout of equal width (50/50) on viewports 768px and wider.
2. THE Website SHALL display in the left column a large typographic statement: "Many students lack access to basic learning essentials".
3. THE Website SHALL display in the right column a narrative paragraph describing waste accumulation, educational challenges, and lack of resources in target communities.
4. WHEN the Problem section enters the User's viewport during scroll, THE Website SHALL trigger a fade-up entrance animation via Framer_Motion for both columns (opacity 0→1, translateY 20px→0) over 400ms, playing exactly once per page load.
5. WHEN rendered on a viewport width below 768px, THE Website SHALL stack the two columns vertically, left column first.

---

### Requirement 4: Our Solution Section

**User Story:** As a User, I want to see how the project addresses the problem, so that I understand the value and approach of the initiative.

#### Acceptance Criteria

1. THE Website SHALL display an "Our Solution" section containing exactly 3 solution cards.
2. THE Website SHALL display the following cards in order: "♻️ Recycling Innovation", "🎒 Educational Support", "🌍 Community Impact".
3. THE Website SHALL render each solution card with an emoji icon, a title, and a supporting description of no more than 200 characters.
4. WHEN at least 50% of the Solution section is within the User's viewport during scroll, THE Website SHALL animate each card with a staggered fade-up entrance via Framer_Motion — first card at 0ms delay, each subsequent card at 150ms additional delay — starting from opacity 0 and translateY 20px.
5. THE Website SHALL play the Solution section entrance animation exactly once per page load, even if the User scrolls past and returns to the section.

---

### Requirement 5: Product Showcase Section

**User Story:** As a User, I want to browse the bag products, so that I can understand what is available and take action to request or purchase.

#### Acceptance Criteria

1. THE Website SHALL display a "Products" section containing two categories: "Community School Bags" and "Lifestyle Tote Collection".
2. EACH category SHALL display between 2 and 6 ProductCards.
3. EACH ProductCard SHALL display a product image, product name, a short description of no more than 100 characters, and a category-appropriate CTA button.
4. THE ProductCard for the "Community School Bags" category SHALL display a "Request Bags" CTA button.
5. THE ProductCard for the "Lifestyle Tote Collection" category SHALL display a "Shop Collection" CTA button.
6. WHEN the User clicks a "Request Bags" CTA on a ProductCard, THE Website SHALL scroll the User to the RequestSection.
7. WHEN the User clicks a "Shop Collection" CTA on a ProductCard, THE Website SHALL navigate the User to the tote bag purchase or inquiry channel.
8. WHEN the Products section enters the User's viewport, THE Website SHALL animate ProductCards with a staggered fade-up entrance via Framer_Motion using a 150ms delay between each card, consistent with the fade-up parameters defined in Requirement 15.

---

### Requirement 6: Customization Experience Section

**User Story:** As a School_Representative, I want to see the customization options for bags, so that I can request bags branded with my school's identity.

#### Acceptance Criteria

1. THE Website SHALL display a "Customization Experience" section featuring a labeled side-by-side two-column visual comparison: left column labeled "Before" showing a plain recycled bag, right column labeled "After" showing a customized school bag.
2. THE Website SHALL display the following customization features as labeled icon-and-text items: school branding, logos, colors, and community identity.
3. THE Website SHALL display a "Customize Your Order" CTA button in the Customization section.
4. WHEN the User clicks the "Customize Your Order" CTA button, THE Website SHALL scroll the User to the RequestSection.
5. WHEN the Customization section enters the User's viewport, THE Website SHALL animate the before/after visual with a left-to-right image reveal animation via Framer_Motion lasting no more than 800ms.

---

### Requirement 7: Request Portal Section

**User Story:** As a School_Representative, I want to submit a bag request online, so that my school can receive sustainable bags without a lengthy offline process.

#### Acceptance Criteria

1. THE RequestSection SHALL display a form with the following fields: Organization/School Name (required), Contact Person Name (required), Email Address (required, must match standard email format), Phone Number (required, must contain 7–15 digits), Location/Region (required), Number of Bags Requested (required, must be an integer between 1 and 10,000), and Message/Additional Details (optional).
2. WHEN the User submits the RequestForm with all required fields completed and valid, THE RequestSection SHALL submit the form data via HTTP POST to `https://formspree.io/f/mzdnpaej`.
3. WHEN the Formspree submission returns a successful response (HTTP 200), THE RequestSection SHALL replace the form with a confirmation message indicating that the request has been received and the team will be in touch.
4. IF the Formspree submission returns an error response (non-200 HTTP status), THEN THE RequestSection SHALL display an error message advising the User to try again or contact the team via WhatsApp, without clearing the form fields.
5. WHEN the User attempts to submit the RequestForm with one or more required fields empty or invalid, THE RequestSection SHALL display an inline error indication adjacent to each invalid field without submitting the form.
6. THE RequestSection SHALL display a 4-step process flow: "Submit Request" → "Team Reviews" → "Production Begins" → "Community Receives Bags".
7. WHILE the RequestForm submission is in progress, THE RequestSection SHALL display a loading indicator and disable the submit button to prevent duplicate submissions.
8. WHEN the Formspree submission returns a successful response (HTTP 200), THE RequestSection SHALL clear all form fields after displaying the confirmation message.

---

### Requirement 8: Supported Schools Section

**User Story:** As a User, I want to see which schools have been supported, so that I can verify the project's credibility and community reach.

#### Acceptance Criteria

1. THE Website SHALL display a "Supported Schools" section containing at least 1 SchoolCard.
2. THE Website SHALL render each SchoolCard displaying: School Name, Location, number of Students Supported, and Year Supported.
3. THE Website SHALL include a SchoolCard for "Asempanaye Basic School" with location "Western Region", "120 Students", and year "2026".
4. WHEN the Supported Schools section enters the User's viewport (at least 50% visible), THE Website SHALL animate SchoolCards with a staggered fade-up entrance via Framer_Motion with a 150ms delay between each card, playing exactly once per page load.

---

### Requirement 9: Impact Dashboard Section

**User Story:** As a User, I want to see high-level impact statistics, so that I trust the scale and legitimacy of the initiative.

#### Acceptance Criteria

1. THE ImpactDashboard SHALL display the following 4 statistics: "10,000+ Bags Produced", "50+ Schools Supported", "5 Tons Waste Recycled", "20+ Communities Impacted".
2. WHEN at least 50% of the ImpactDashboard section is within the viewport, THE ImpactDashboard SHALL animate each statistic number counting up from 0 to its target value over a duration of 2 seconds.
3. THE ImpactDashboard counter animation SHALL trigger only once per page load, even if the User scrolls past and back to the section.
4. THE ImpactDashboard SHALL use a background colour that differs from both the immediately preceding and immediately following page sections.
5. WHEN the User has enabled `prefers-reduced-motion`, THE ImpactDashboard SHALL display each statistic at its final target value immediately, with no counting animation.

---

### Requirement 10: Partners & Sponsors Section

**User Story:** As a Partner, I want to understand how I can support the initiative, so that I can decide which partnership tier is right for my organisation.

#### Acceptance Criteria

1. THE Website SHALL display a "Partners & Sponsors" section containing 4 partnership category cards: Schools, NGOs, Companies, and Individuals.
2. EACH partnership card SHALL include a title, a description of no more than 150 characters describing the partnership type, and a "Partner With Us" CTA button.
3. WHEN the User clicks any "Partner With Us" CTA button, THE Website SHALL scroll the User to the RequestSection.

---

### Requirement 11: Interactive Impact Map

**User Story:** As a User, I want to see an interactive map showing where the project operates, so that I can understand the geographic reach of the initiative.

#### Acceptance Criteria

1. THE ImpactMap SHALL render a visual map with Ghana as the primary visible region, centered so the full territory of Ghana is visible within the map bounds.
2. THE ImpactMap SHALL display up to 50 markers, one per supported school or community.
3. WHEN the User hovers over or taps a map marker, THE ImpactMap SHALL display a tooltip containing the community or school name and the number of students supported at that location.
4. WHEN the User moves the mouse pointer away from a marker or taps outside a marker tooltip, THE ImpactMap SHALL dismiss the tooltip.
5. IF marker data is unavailable or fails to load, THEN THE ImpactMap SHALL display a fallback message indicating that impact location data is currently unavailable.
6. THE ImpactMap SHALL be responsive, render at a minimum height of 300px, and scale to fit the viewport width without horizontal overflow.

---

### Requirement 12: Storytelling Timeline Section

**User Story:** As a User, I want to follow the journey from waste to product, so that I understand the full circular economy process the project employs.

#### Acceptance Criteria

1. THE Timeline SHALL display exactly 4 steps in order: "Waste Collection", "Material Processing", "Bag Creation", "Community Distribution".
2. EACH Timeline step SHALL include a step number or icon, a title, and a supporting description of at least one sentence.
3. WHEN rendered on a viewport width of 768px or wider, THE Timeline SHALL arrange steps in a single horizontal row from left to right.
4. WHEN rendered on a viewport width below 768px, THE Timeline SHALL arrange steps in a single vertical column.
5. WHEN the Timeline section enters the User's viewport, THE Website SHALL animate each step sequentially via Framer_Motion with a left-to-right reveal on desktop and a top-to-bottom reveal on mobile, with a 200ms stagger between steps.

---

### Requirement 13: WhatsApp Floating Button

**User Story:** As a User, I want a quick way to contact the team via WhatsApp, so that I can get answers to questions without filling out a form.

#### Acceptance Criteria

1. THE WhatsAppButton SHALL be visible and fixed at the bottom-right corner of the viewport at all times across all pages.
2. THE WhatsAppButton SHALL contain the WhatsApp icon and a short label "Chat With Us".
3. WHEN the User clicks the WhatsAppButton, THE Website SHALL open the WhatsApp chat URL defined in the site configuration in a new browser tab.
4. THE WhatsAppButton SHALL not visually overlap any interactive element (buttons, links, form fields) on viewports 320px wide and above, using the device safe-area inset offset on mobile devices.
5. IF no WhatsApp chat URL is configured, THEN THE WhatsAppButton SHALL not be rendered.

---

### Requirement 14: Footer

**User Story:** As a User, I want a comprehensive footer, so that I can find contact information, navigation links, and social media channels easily.

#### Acceptance Criteria

1. THE Footer SHALL use the Charcoal Black colour token (`#1c1c1c` or equivalent as defined in Requirement 17) as its background colour.
2. THE Footer SHALL display the project logo and mission statement: "Transforming waste into opportunities, one bag at a time."
3. THE Footer SHALL display navigation links under two explicit groups: "Quick Links" (Home, Our Story, Products, Impact) and "Get Involved" (Schools, Partner With Us, Request Bags).
4. THE Footer SHALL display icons and working links for the following social media platforms: Facebook, Instagram, LinkedIn, and Twitter/X.
5. THE Footer SHALL display a copyright notice in the format: "© [current year] [Project Name]. All rights reserved."
6. THE Footer SHALL display a contact email address and/or phone number so Users can reach the team directly.

---

### Requirement 15: Animations and Visual Polish

**User Story:** As a User, I want smooth, purposeful animations, so that the website feels premium and engaging without being distracting.

#### Acceptance Criteria

1. THE Website SHALL use Framer_Motion as the sole animation library for all scroll-triggered and transition animations.
2. WHEN any section with a registered Framer_Motion scroll-triggered animation has at least 20% of its area within the User's viewport, THE Website SHALL trigger the entrance animation exactly once per page load.
3. THE Website SHALL apply a consistent fade-up animation (translateY: 40px → 0, opacity: 0 → 1, duration: 500ms, easing: ease-out) as the default entrance animation for all section content not otherwise specified.
4. WHEN the User has enabled `prefers-reduced-motion` (via the `prefers-reduced-motion: reduce` media query), THE Website SHALL set all Framer_Motion animation variants to have a duration of 0ms and a translateY of 0, effectively disabling motion while preserving any opacity transitions needed for content visibility.

---

### Requirement 16: Responsive Design and Performance

**User Story:** As a User on any device, I want the Website to load quickly and display correctly, so that I have a good experience regardless of my device or connection speed.

#### Acceptance Criteria

1. THE Website SHALL display without a horizontal scrollbar, without any overlapping or clipped interactive elements, and with all controls fully operable at viewport widths of 320px, 768px, and 1280px.
2. THE Website SHALL achieve a Lighthouse Performance score of 80 or above on a desktop audit with no throttling applied.
3. THE Website SHALL achieve a Lighthouse Performance score of 70 or above on a mobile audit simulating a slow 4G connection.
4. IF an image is not visible within the initial viewport on page load and is located more than 200px below the visible fold, THEN THE Website SHALL defer loading that image until the User scrolls within 200px of it.
5. THE Website SHALL use semantic HTML5 elements (`<nav>`, `<main>`, `<section>`, `<footer>`, `<article>`) throughout all page structures.
6. WHEN an image fails to load, THE Website SHALL display a non-empty `alt` attribute value that identifies the subject or purpose of the image for all `<img>` elements.

---

### Requirement 17: Brand and Visual Identity

**User Story:** As a User, I want the website to feel consistent and premium, so that the project appears trustworthy and credible to schools, NGOs, and sponsors.

#### Acceptance Criteria

1. THE Website SHALL apply the following colour tokens to the specified component properties — backgrounds, text colours, border colours, CTA button fills, icon fills, and link colours — consistently across all components: Deep Forest Green (`#1a4731` or equivalent), Charcoal Black (`#1c1c1c` or equivalent), Warm Sand/Beige (`#f5e6c8` or equivalent), Clean White (`#ffffff`), Gold/Amber accent (`#d4a017` or equivalent).
2. THE Website SHALL apply Playfair Display as the primary heading font for all h1–h6 elements, falling back to Libre Baskerville then DM Serif Display then a generic serif in that order.
3. THE Website SHALL apply Inter as the primary body font for all paragraphs, captions, labels, button text, and form input text, falling back to Manrope then Satoshi then a generic sans-serif in that order.
4. THE Website SHALL load all custom fonts such that body text and heading text are visible to the User immediately on first render, with no period during which text is invisible due to font loading.
