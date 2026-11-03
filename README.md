# jdgrid apps

Localized product, support, and privacy pages for jdgrid apps.

Live: <https://apps.jdgrid.com>

## Apps

- [Saegeun](saegeun/README.md) — iPhone and Android, in the Korean, US and Japanese App Stores; its English and Japanese names are Hushabye and すやログ
- [Monggle](monggle/README.md)
- [Trance](trance/README.md)
- [Harmonica](harmonica/README.md) — Android; base language is English, so its language pickers lead with English
- [Write, Meow!](write-meow/README.md) — iPhone and Android, on Google Play since 2026-11-04 and in App Store review; base language is English
- [Sobok](sobok/README.md) — iPhone and Android, not launched yet; base language is Korean, and the only app with a fourth language (Traditional Chinese)
- [Mintronome](mintronome/README.md) — iPhone and Android, not launched yet; support and privacy pages only, in English and Korean
- [DailyStamp](dailystamp/README.md) — iPhone only, not launched yet; support and privacy pages only, in English and Korean

Each app uses explicit `ko`, `en`, and `ja` URLs (Sobok adds `zh-Hant`). The section roots detect the saved or browser language and redirect to the corresponding localized page. An app with any other set of languages lists them in `data-locales` on every page and in `appLocales` in the checker — without it the router assumes `ko`, `en`, `ja` and sends a Japanese browser to a page that does not exist.

Run `node scripts/check-pages.mjs` after editing pages or assets. It validates local targets, canonical URLs, hreflang metadata, and language switchers across every app.
