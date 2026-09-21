# Shoaib Junaid Khan — Portfolio

A responsive personal developer portfolio built on the project's TanStack Start foundation with semantic React markup, Tailwind-powered design tokens, and lightweight browser interactions.

## Updating personal details

All editable profile details and URLs are centralized in `src/lib/portfolio-config.ts`. Replace values such as `YOUR_GITHUB_URL` with complete links beginning with `https://`.

## Replacing images

1. Add optimized WebP or JPG files to `src/assets/`.
2. Import the image near the top of `src/routes/index.tsx`.
3. Replace the relevant placeholder block with an `<img>` using descriptive alt text, explicit width/height, and `loading="lazy"` outside the first screen.
4. Suggested folders if the collection grows: `src/assets/profile/`, `src/assets/projects/`, and `src/assets/events/`.

## Adding the resume

Create `public/assets/resume/` and add the real PDF as `Shoaib-Junaid-Khan-Resume.pdf`. The configured Resume actions will then work without further changes.

## Adding social links

Replace each placeholder in `src/lib/portfolio-config.ts`. Missing links deliberately show a “Soon” state instead of opening broken pages.

## Adding future projects

Duplicate one of the project articles in `src/routes/index.tsx`, add its details to the central configuration, and keep status wording accurate: `Building`, `Exploring`, or `Planned` for unfinished work.

## Contact form

The form validates in the browser but intentionally does not send messages. Connect the submit handler to Formspree, EmailJS, or your own endpoint before removing the notice.

## Local development

```bash
bun install
bun run dev
```

## Production and deployment

```bash
bun run build
```

Publish through Lovable when ready, or deploy the generated TanStack Start application to a compatible hosting provider. Confirm that the resume, images, and all social/project URLs are real before publishing.
