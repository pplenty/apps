# Saegeun web pages

Static support and privacy pages for Saegeun.

## URL structure

- `/saegeun/` selects a locale for the product landing page.
- `{ko,en,ja}/` contains localized product and download pages.
- `support/` and `privacy/` select a locale using the saved preference or browser language.
- `support/{ko,en,ja}/` contains localized support content.
- `privacy/{ko,en,ja}/` contains localized privacy content.
- `assets/site.css` contains all shared presentation rules.
- `assets/locale.js` contains locale detection and preference persistence.
- `assets/media/` contains the optimized app icon, official App Store badges, and web screenshots derived from the app project.

Use ISO 639-1 language codes in URLs and metadata (`ja`, not the country code `jp`).

## Updating content

1. Update the matching page in every locale.
2. Keep the `canonical` URL, `hreflang` links, language switcher, and cross-page link aligned.
3. Update the privacy policy date in every locale when its meaning changes.
4. Run `node scripts/check-pages.mjs` before publishing.

The iOS download URL is `https://apps.apple.com/kr/app/id6789875279`. The app is
currently distributed only through the Korean App Store; do not imply global or
Google Play availability until those releases are live.

## Adding a locale

1. Add the locale to `supportedLocales` in `assets/locale.js`.
2. Add matching directories under both `support/` and `privacy/`.
3. Add the locale to both landing pages, every language switcher, and every `hreflang` group.
4. Add an appropriate font fallback to `assets/site.css` if needed.
