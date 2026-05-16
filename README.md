# Blocks.expert

> Structured Creativity for Every Mind.

A modern architectural wellness company disguised as a structured creativity platform. Content and resources for neurodivergent individuals, families, occupational therapists, and educators.

## Stack

- Plain HTML5, CSS3, vanilla JavaScript (ES6+)
- No frameworks, no build step
- Google Fonts (Nunito + Inter)
- Hosted on Netlify, version-controlled in GitHub
- Sandbox at `/sandbox/` uses Three.js (loaded via import map from unpkg)

## Structure

```
blocks-expert/
├── index.html                     # Homepage with falling-B animation
├── about.html                     # Mission, audience, values
├── 404.html                       # Not-found page
├── articles/
│   ├── index.html                 # All articles with filter/search
│   ├── template.html              # Article template (boilerplate)
│   └── _example-article.html      # Example: sensory-aware storage
├── pillars/
│   ├── play.html
│   ├── learn.html
│   ├── organize.html
│   ├── focus.html
│   └── grow.html
├── sandbox/                       # Three.js block-building sandbox (separate)
├── assets/
│   ├── css/
│   │   ├── tokens.css             # Brand colors, fonts, spacing, transitions
│   │   └── style.css              # All site styles
│   ├── js/
│   │   └── main.js                # Header/footer injection, falling-B, forms, filters
│   └── images/                    # Logo, OG card (add these)
├── netlify.toml                   # Netlify config
├── robots.txt
└── sitemap.xml
```

## Brand

**Tagline:** Structured Creativity for Every Mind.

**Five content modes:** Play, Learn, Organize, Focus, Grow.

**Palette:**

| Token              | Hex       | Use                          |
| ------------------ | --------- | ---------------------------- |
| Blueprint Navy     | `#123B68` | Primary text, structural     |
| Calm Teal          | `#8CCFC4` | Grow, calm accents           |
| Warm Coral         | `#F68B74` | Play, primary CTA            |
| Golden Yellow      | `#F4BE52` | Learn, highlights            |
| Gentle Lavender    | `#9C87C8` | Focus, soft accents          |
| Warm Cream         | `#F7F4ED` | Default background           |
| Graphite Ink       | `#1E2A36` | Body copy, contrast          |

**Fonts:** Nunito (display, 600/700) + Inter (UI, 400/500/600).

## Editorial direction

- Cover the full building-toy spectrum: magnetic tiles, wooden blocks, plastic systems, sensory blocks, etc. Keep references to specific brands minimal.
- Prioritize neurodivergent adult contributors and OT advisors before scaling editorial volume.
- AI-generated content has a credibility ceiling. Use it for structure and first drafts; require human review for voice and accuracy.

## Deployment

1. Push this repo to GitHub
2. Connect the repo to Netlify (Site → Add new site → Import from Git)
3. Build command: leave blank (no build step)
4. Publish directory: `.` (root)
5. Point DNS for blocks.expert at Netlify (Domain settings → Add custom domain)
6. Netlify auto-provisions SSL via Let's Encrypt

Pushes to `main` auto-deploy. PRs get preview URLs.

## Adding a new article

1. Copy `articles/template.html` to `articles/your-slug.html`
2. Update the `<title>`, meta description, Open Graph tags, canonical URL, and JSON-LD schema
3. Replace the tag (`tag-organize`) and body content
4. Add an entry to `sitemap.xml`
5. Add a preview card to `articles/index.html` (in the appropriate position) and to the relevant pillar page
6. Commit and push

## Adding a new pillar page

Already have all five. To modify content, edit the corresponding file in `/pillars/`. To add a sixth mode (don't):
- Add CSS class `.pillar-newmode` and `.tag-newmode` in `style.css`
- Update header and footer nav in `main.js`
- Update homepage modes grid
- Add to sitemap

## Newsletter integration

Currently the newsletter form simulates submission with a setTimeout. To wire it up:
- Replace the `setTimeout` block in `main.js` `initNewsletterForm()` with a `fetch()` to your provider's API (Mailchimp, Buttondown, ConvertKit, etc.)
- Add the API key as a Netlify environment variable
- Move the fetch behind a serverless function (Netlify Functions) so the key isn't exposed client-side

## Accessibility

- All pages have skip-to-content links
- Color contrast meets WCAG AA against Warm Cream background
- Forms have proper labels (visible or screen-reader-only)
- All interactive elements keyboard-navigable with visible focus styles
- `prefers-reduced-motion` respected — falling-B animation disabled, transitions minimized
- Mobile menu closes on Esc and click-outside
- Touch targets minimum 44×44px

## Known TODOs

- Add `/assets/images/og-default.png` (1200×630, social share card)
- Add `/assets/images/logo.png` (used in JSON-LD)
- Deploy sandbox at `/sandbox/` and debug color-picker issue in production
- Wire newsletter to real provider
- Lock down social media handles in footer
- Recruit autistic adult / OT contributor before scaling content
