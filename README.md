# Mangata & Gallo Jewelry Website UI

A responsive luxury jewelry e-commerce interface built with semantic HTML, modular CSS, and vanilla JavaScript. The project presents a polished storefront experience with data-driven product content, interactive navigation, product-detail views, and a persistent client-side shopping bag.

[View the live website](https://can-k-portfolio.netlify.app/)

![Mangata & Gallo jewelry collection](media/promo-banner.jpg)

## Highlights

- Responsive storefront designed for desktop, tablet, and mobile screens
- Separate home and product-detail pages
- Product cards, promotional posters, collection reels, and an automated slideshow generated from JavaScript data
- Desktop mega menu and dedicated mobile navigation with nested category content
- Dynamic product selection and page rendering without a frontend framework
- Shopping bag with item quantities, removal controls, calculated totals, and persistent browser storage
- Horizontal product reels with button, pointer-drag, touch, and scroll interactions
- Collapsible product information for shipping, returns, and payment options
- Responsive background video and optimized lazy-loaded imagery
- Contact form that prepares a prefilled message in the visitor's default email client
- Semantic landmarks, accessible navigation labels, button states, and reduced-motion support
- SEO metadata, canonical URL, Open Graph tags, Twitter card metadata, and favicon assets
- Modular CSS architecture with Stylelint configuration

## Tech stack

### Frontend

- HTML5
- CSS3
- JavaScript (ES6+)

### Browser APIs and platform features

- DOM API
- Local Storage API
- Native HTML form validation
- Pointer and touch events
- CSS custom properties
- Responsive media queries
- `prefers-reduced-motion`
- Open Graph and Twitter card metadata

### Development tooling

- Stylelint
- Stylelint Config Standard
- PurgeCSS

## Project structure

```text
home.html               Main storefront, navigation, promotional content, contact form, and footer
product.html            Product-detail page and shopping-bag interface
database.js             Product, navigation, promotion, and product-detail data
article-renderer.js      Data-driven rendering for navigation, posters, reels, slideshows, products, and cart items
navbar.js                Desktop mega-menu and mobile-menu interactions
shopping-cart.js         Shopping-bag panel open, close, and outside-click behavior
reel.js                  Product-reel navigation, dragging, touch, and scroll-state logic
dynamic-header.js        Scroll-responsive quick-menu behavior
*.css                    Component-based layout, styling, responsiveness, and interaction states
media/                   Product photography, logos, video, favicons, and promotional assets
.stylelintrc.json        CSS linting configuration
package.json             Development-tool dependencies and project metadata
LICENSE                  Copyright and usage terms
```

## Run locally

The website is static and does not require a framework or production build process.

Clone the repository and enter the project directory:

```bash
git clone https://github.com/RestartGamer/mangata-gallo-vanilla.git
cd mangata-gallo-vanilla
```

Install the development dependencies:

```bash
npm install
```

Serve the project through a local HTTP server.

Using Python:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000/home.html
```

Using the VS Code Live Server extension is also suitable for local development.

## Quality checks

Run Stylelint across the component stylesheets:

```bash
npx stylelint "*.css"
```

The current repository includes CSS linting tooling but does not yet include an automated JavaScript or browser test suite.

## Implementation details

### Data-driven interface

The storefront content is stored as JavaScript objects in `database.js`. Products, navigation categories, promotional banners, posters, reels, slideshows, and product-detail information are rendered into matching elements through `article-renderer.js`.

This keeps the content definitions separate from most of the rendering logic and allows multiple interface sections to reuse the same product data.

### Product navigation

Selecting a product stores its identifier in `localStorage` and opens `product.html`. The product page reads that identifier and generates the selected product's imagery, title, description, price, actions, promotional content, and collapsible information panels.

### Shopping bag

The shopping bag is implemented entirely in the browser. Product identifiers are stored in `localStorage`, allowing the bag to persist between page loads.

Users can:

- Add products from a product-detail page
- Open the bag from desktop or mobile quick menus
- Increase or decrease quantities
- Remove products
- View the calculated total price

Repeated product identifiers represent quantity. The rendering logic groups matching items, updates the stored values, and recalculates the total after cart changes.

### Navigation

The desktop navigation uses category-based mega menus with dynamically assigned product links and imagery. The mobile version provides a dedicated full-screen menu with nested category panels, return controls, and synchronized open/close button states.

The quick-menu area also adjusts in response to page scrolling.

### Product reels and slideshow

Product reels support multiple interaction methods:

- Previous and next controls
- Position indicators
- Pointer dragging
- Touch interaction
- Native horizontal scrolling

The promotional slideshow rotates through dynamically rendered slides and synchronizes its image and text transitions.

### Responsive design

The styling is divided into component-specific stylesheets for the navbar, quick menu, promotional banners, posters, reels, slideshow, product page, shopping bag, contact form, footer, and other interface areas.

Media queries adapt the layout at several viewport widths, including desktop, tablet, mobile, and narrow-mobile breakpoints.

### Accessibility

The project includes:

- Semantic `header`, `nav`, `main`, `section`, `article`, and `footer` landmarks
- Accessible labels for primary and mobile navigation
- Button elements for menu and interactive controls
- `aria-expanded` and `aria-controls` states on menu and collapsible controls
- Alternative text for product imagery
- Associated labels for contact-form fields
- Native required-field and email validation
- Decorative video and SVG content hidden from assistive technologies where appropriate
- A reduced-motion stylesheet rule for users who prefer less animation

### Contact flow

Submitting the contact form collects the entered name, email address, and message, URL-encodes the content, and opens a prefilled email draft through a `mailto:` URL.

This is suitable for a static portfolio demonstration but depends on the visitor having a configured email application. A production store would normally use a form service, serverless function, or backend API.

### SEO and sharing

The home page includes:

- A descriptive page title and meta description
- Canonical URL and search-engine indexing directives
- Open Graph title, description, URL, and preview-image metadata
- Twitter summary-card metadata
- Favicons and an Apple touch icon
- Google Fonts preconnection and font loading

## Project scope

This project is a frontend portfolio demonstration rather than a production e-commerce platform.

The following features are simulated or presentational:

- Checkout completion
- Payment processing
- User authentication
- Account management
- Favourites and gift actions
- Inventory validation
- Order creation and persistence
- Server-side product storage

Product and cart data are stored locally in JavaScript and browser storage. No customer, payment, or order information is transmitted to a backend.

## Deployment

The project can be deployed to any static hosting platform, including Netlify, GitHub Pages, Vercel, or Cloudflare Pages.

Because the entry page is named `home.html`, configure the deployed site's landing route to serve that file or rename it to `index.html` before deployment.

No build command is required. Publish the repository root.

Before deploying a fork, review and update:

- Canonical and social-sharing URLs
- Social preview image URLs
- Contact-form recipient address
- Brand and footer links
- Product copy and pricing

## Possible next steps

- Rename `home.html` to `index.html` for conventional static-host entry behavior
- Add the referenced web app manifest or remove the unused manifest link
- Replace `localStorage` product routing with URL parameters for shareable product links
- Add an API and database for products, users, carts, and orders
- Implement secure authentication and payment processing
- Replace the `mailto:` contact flow with a serverless or API-backed form
- Add JavaScript unit tests and browser-based end-to-end tests
- Add automated accessibility, HTML, CSS, and broken-link checks
- Optimize and convert large photography and video assets for faster delivery
- Add empty, loading, success, and error states for future asynchronous flows

## License

Copyright © 2025. All rights reserved.

The repository's [license file](LICENSE) states that the work may not be copied, modified, distributed, or used without explicit permission from the copyright holder.
