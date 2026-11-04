# Sobok web pages

Sobok (`소복소복`) — a private diary for iPhone and Android: one tap on a feeling, or long
writing, photos and notes on books and movies. Source project: `~/orca/private-diary`.

## URL structure

- Product: `/sobok/{en|de|vi|es|id|ja|zh-Hans|zh-Hant|th|pt-BR|fr|ko}/`
- Support: `/sobok/support/{en|de|vi|es|id|ja|zh-Hans|zh-Hant|th|pt-BR|fr|ko}/`
- Privacy: `/sobok/privacy/{en|de|vi|es|id|ja|zh-Hans|zh-Hant|th|pt-BR|fr|ko}/`

Each section root is a language router. **English is the base language** (since
2026-11-04, as in the stores): the pickers lead with English and follow the stores' order.
Every page names its twelve in `data-locales`. Sobok has both Chinese scripts, so
`product-locale.js` picks Chinese by script and region, not list order: `zh-TW`, `zh-HK`,
`zh-MO` and `zh-Hant-*` go to `zh-Hant`, every other Chinese browser to `zh-Hans`.
Portuguese is written for Brazil (`pt-BR`) and also serves `pt-PT`.

## Before launch

Neither store has the app yet, so the product pages say "coming soon" instead of showing
badges, as Write, Meow! does. When the app goes live, replace both `coming-soon` spans on
each product page with the badges in `/assets/badges/` — in the generator below, not here.

## Store fields

| Field | Value |
| --- | --- |
| App Store support URL | `https://apps.jdgrid.com/sobok/support/<lang>/` per listing language |
| App Store marketing URL | `https://apps.jdgrid.com/sobok/<lang>/` per listing language |
| App Store privacy policy URL | `https://apps.jdgrid.com/sobok/privacy/<lang>/` per listing language |
| Play privacy policy URL | `https://apps.jdgrid.com/sobok/privacy/en/` |
| Play website | `https://apps.jdgrid.com/sobok/` |
| Contact email | `sobok@jdgrid.com` |

`<lang>` is `ko`, `en`, `ja` or `zh-Hant` for the ko, en-US, ja and zh-Hant listings.

## Generated from the app repo

Every page and every media file under `/sobok/` except this README and
`assets/theme.css` comes from the app repo. Change the source there, not here, and rebuild:

```bash
python3 ~/orca/private-diary/tool/build_site_pages.py ~/IdeaProjects/apps
```

- Support and privacy copy each language's `<section>` of `docs/support/index.html` and
  `docs/privacy/index.html` without retyping. The privacy date comes from the same file.
- The product copy is the `PRODUCT` table in the script, drawn from the store text in
  `store/ios-app-info.md`. Screenshot alt text and the gallery heading are the store
  screenshot captions in `store/screenshots/gen_shots.py`.
- `assets/media/app-icon.png` is `assets/brand/app_icon.png` at 192 px, and
  `assets/media/<lang>/*.webp` are the raw store captures in `store/screenshots/raw/<lang>/`
  (1320×2868) at 516 px wide.

Run it with `--check` to compare only.

`assets/theme.css` carries the app's colours from `lib/core/app_colors.dart`: paper and warm
surface for the page, teal for text accents, deep teal for the dark panel, and coral and
yellow for the background blobs.
