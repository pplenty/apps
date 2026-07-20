# Trance web pages

## URL structure

- Product: `/trance/{ko|en|ja}/`
- Support: `/trance/support/{ko|en|ja}/`
- Privacy: `/trance/privacy/{ko|en|ja}/`

Each section root is a language router. Shared layout and routing live in `/assets`; Trance colors and app assets live in `/trance/assets`.

## App Store

- App ID: `6788048067`
- Status checked on 2026-07-20: not returned by App Store lookup in Korea, the United States, or Japan

Keep the coming-soon CTA until the public listing resolves. When it does, replace the status element in all three product pages with a localized App Store link.

## Asset sources

The app icon and screenshots were exported from the Trance app project. Localized screenshots are stored under `assets/media/{ko|en|ja}` and resized to 516 px wide WebP files for the web.
