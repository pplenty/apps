# DailyStamp web pages

DailyStamp (`kr.yusik.dailystamp`, App Store app ID `6825806881`) — iPhone only, not launched
yet. Source project: `~/IdeaProjects/daily-timestamp`.

## URL structure

- Support: `/dailystamp/support/{en|ko}/`
- Privacy: `/dailystamp/privacy/{en|ko}/`

There is no product page, and the App Store marketing URL is left empty. Each section root is
a language router. **English is the base language**, so the language pickers list English
first. The app's own colors live in `/dailystamp/assets/theme.css`.

Every page carries `data-locales="en,ko"`. Without it the shared router assumes `ko`, `en`,
`ja` and sends a Japanese browser to `/ja/`, which does not exist — the store listing has a
Japanese localization that links here.

## App Store

| Field | Value |
| --- | --- |
| Privacy policy URL (every listing language) | `https://apps.jdgrid.com/dailystamp/privacy/` |
| Support URL (every listing language) | `https://apps.jdgrid.com/dailystamp/support/` |
| Contact email | `dailystamp@jdgrid.com` |

The listing has eight languages (en-US, vi, es-MX, id, ja, th, pt-BR, ko); visitors in a
language other than English or Korean land on the English pages.
