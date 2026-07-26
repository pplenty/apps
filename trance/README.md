# Trance web pages

## URL structure

- Product: `/trance/{ko|en|ja}/`
- Support: `/trance/support/{ko|en|ja}/`
- Privacy: `/trance/privacy/{ko|en|ja}/`

Each section root is a language router. Shared layout and routing live in `/assets`; Trance colors and app assets live in `/trance/assets`.

## App Store

- App ID: `6788048067`
- Live since 2026-07-27 in the Korean, US, and Japanese storefronts

Each product page links to the storefront that matches its language, so the visitor lands on a page written in the language they are already reading:

| Page | Store link |
| --- | --- |
| `/trance/ko/` | `https://apps.apple.com/kr/app/id6788048067` |
| `/trance/en/` | `https://apps.apple.com/us/app/id6788048067` |
| `/trance/ja/` | `https://apps.apple.com/jp/app/id6788048067` |

The short `/{country}/app/id{id}` form is used on purpose — it never breaks when the App Store title changes, unlike the slug form Apple copies to the clipboard.

Each page carries the badge in its own locale (`/assets/badges/app-store-white-{ko-kr|en-us|ja-jp}.svg`, downloaded from Apple's badge service) plus the Apple trademark line in the footer, as Apple's identity guidelines require. The white badge is used because the Trance pages are dark; a light-themed app should use a black badge instead.

## Asset sources

The app icon and screenshots were exported from the Trance app project. Localized screenshots are stored under `assets/media/{ko|en|ja}` and resized to 516 px wide WebP files for the web.
