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

## Stores

The app (`com.pplenty.babylog`) is live on Google Play and in the Korean, US and Japanese
App Store storefronts, under a different name in each:

| Page | Name | App Store link |
| --- | --- | --- |
| `/saegeun/ko/` | 새근새근 | `https://apps.apple.com/kr/app/id6789875279` |
| `/saegeun/en/` | Hushabye | `https://apps.apple.com/us/app/id6789875279` |
| `/saegeun/ja/` | すやログ | `https://apps.apple.com/jp/app/id6789875279` |

Each page names the app the way the store and the home screen do in that language
(`CFBundleDisplayName` and `app_name` in the app repo), so a visitor recognizes the app they
installed. "Saegeun" survives only as the internal name: the `[Saegeun]` tag in mail
subjects and the parenthesized name next to the policy date. The invite landing uses the
storefront-free `https://apps.apple.com/app/id6789875279`, which opens in the visitor's own
storefront. The Google Play link is `https://play.google.com/store/apps/details?id=com.pplenty.babylog`.

## Adding a locale

1. Add the locale to `supportedLocales` in `assets/locale.js`.
2. Add matching directories under both `support/` and `privacy/`.
3. Add the locale to both landing pages, every language switcher, and every `hreflang` group.
4. Add an appropriate font fallback to `assets/site.css` if needed.
