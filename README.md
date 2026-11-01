# jdgrid apps

Localized product, support, and privacy pages for jdgrid apps.

Live: <https://apps.jdgrid.com>

## Apps

- [Saegeun](saegeun/README.md)
- [Monggle](monggle/README.md)
- [Trance](trance/README.md)
- [Harmonica](harmonica/README.md) — Android; base language is English, so its language pickers lead with English
- [Write, Meow!](write-meow/README.md) — iPhone and Android, not launched yet; base language is English
- [Sobok](sobok/README.md) — iPhone and Android, not launched yet; base language is Korean, and the only app with a fourth language (Traditional Chinese)

Each app uses explicit `ko`, `en`, and `ja` URLs (Sobok adds `zh-Hant`). The section roots detect the saved or browser language and redirect to the corresponding localized page. An app with other languages lists them in `data-locales` on its pages and in `appLocales` in the checker.

Run `node scripts/check-pages.mjs` after editing pages or assets. It validates local targets, canonical URLs, hreflang metadata, and language switchers across every app.
