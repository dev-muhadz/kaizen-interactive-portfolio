# Kaizen — Interactive Freelancer & Developer Portfolio

A premium, mobile-first portfolio template for freelancers and developers, built with pure HTML5, CSS3 and Vanilla JavaScript. Zero CSS/JS frameworks.

## Structure
```text
kaizen-interactive-portfolio/
├── index.html
├── README.md
├── css/styles.css
├── js/main.js
└── assets/
    ├── README.md
    └── resume-placeholder.txt
```

## Features
- Responsive hero and personal branding
- Dark/light mode with localStorage
- Mobile hamburger navigation
- Sticky scrolling header
- Skills and tech-stack grid
- Filterable Web Dev / UI / UX / Mobile projects
- Project lightbox/detail modal
- Experience timeline
- Testimonial slider
- Contact form validation + confirmation modal
- Zero framework dependencies
- Reduced-motion support

## Rebranding
Open `css/styles.css` and edit the variables at the top:
```css
:root{
  --bg:#080909;
  --surface:#101111;
  --text:#f4f4ee;
  --muted:#929791;
  --accent:#d7ff4f;
  --display:"Manrope",sans-serif;
  --mono:"DM Mono",monospace;
}
```
Change `--accent` for the primary brand color. Change `--display` and `--mono` for typography. The `html[data-theme=light]` rule contains the light-mode palette.

## Add projects
Duplicate a `.project` article in `index.html` and change its data attributes:
```html
<article class="project"
 data-category="web"
 data-title="My Project"
 data-type="Web Development"
 data-description="Short case-study description."
 data-image="commerce">
 ...
</article>
```
Available filters are `web`, `ui`, and `mobile`. Add another filter button with a matching `data-filter` value to create a new category.

## Add skills
Duplicate a `.skill` article and update the name, description and `--level` percentage:
```html
<div class="bar"><i style="--level:90%"></i></div>
<span>90%</span>
```

## Real project images
The demo uses CSS gradients to keep the template lightweight. Replace the `.image-*` backgrounds with optimized WebP/AVIF images for real portfolio projects.

## CV
Replace `assets/resume-placeholder.txt` with a real PDF and update the download link in `index.html`.

## Contact form
The contact form validates natively and shows a demo confirmation modal. Connect it to a backend, server endpoint or form service before production.

## Marketplace tips
- Use optimized WebP/AVIF screenshots.
- Replace every demo email, social link and project link.
- Add real project case studies and client testimonials.
- Keep the zero-dependency approach for excellent performance.
- Include desktop and mobile preview screenshots in your marketplace listing.
- Consider offering alternate accent-color presets as a bonus.

## License
Replace demo branding, content, links and assets before commercial deployment according to your chosen marketplace's licensing terms.
