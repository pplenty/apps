# jdgrid apps

Localized product, support, and privacy pages for jdgrid apps.

Live: <https://apps.jdgrid.com>

## Apps

- [Saegeun](saegeun/README.md)
- [Monggle](monggle/README.md)
- [Trance](trance/README.md)

Each app uses explicit `ko`, `en`, and `ja` URLs. The section roots detect the saved or browser language and redirect to the corresponding localized page.

Run `node scripts/check-pages.mjs` after editing pages or assets. It validates local targets, canonical URLs, hreflang metadata, and language switchers across all three apps.
