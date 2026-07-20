# Monggle web pages

## URL structure

- Product: `/monggle/{ko|en|ja}/`
- Support: `/monggle/support/{ko|en|ja}/`
- Privacy: `/monggle/privacy/{ko|en|ja}/`

Each section root is a language router. Shared layout and routing live in `/assets`; Monggle colors and app assets live in `/monggle/assets`.

## App Store

- App ID: `6790905167`
- Status checked on 2026-07-20: not returned by App Store lookup in Korea, the United States, or Japan

Keep the coming-soon CTA until the public listing resolves. When it does, replace the status element in all three product pages with a localized App Store link.

## Asset sources

The app icon and screenshots were exported from the Monggle app project. Localized screenshots are stored under `assets/media/{ko|en|ja}` and resized to 516 px wide WebP files for the web.
