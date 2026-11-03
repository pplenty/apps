# Write, Meow! web pages

Write, Meow! (`書くにゃ`, `글쓰기냥`) — a private daily writing app for iPhone and Android.
Source project: `~/orca/be-writer`.

## URL structure

- Product: `/write-meow/{en|ja|ko}/`
- Support: `/write-meow/support/{en|ja|ko}/`
- Privacy: `/write-meow/privacy/{en|ja|ko}/`

Each section root is a language router. Shared layout and routing live in `/assets`;
Write, Meow! colors and app assets live in `/write-meow/assets`.

**English is the base language**, as with Harmonica: the language pickers list English
first and `x-default` resolves to English.

## Store status

- **Google Play** — live since 2026-11-04. Each product page carries the Google Play
  badge in its own language, a "View on Google Play" link in the trust panel, and the
  Google Play trademark line in the footer, as `harmonica/` does.
- **App Store** — submitted 2026-11-02, not public yet. The hero still shows a "Coming
  soon to the App Store" pill beside the Play badge.

Nothing outside `/write-meow/` links here yet.

When the App Store listing resolves, replace the `coming-soon` span in each hero with the
App Store badge from `/assets/badges/` (white badge on dark pages, black on light — see
`trance/README.md`), placed before the Play badge, and add the Apple trademark line to the
footer next to the Google one:

| Page | App Store | Google Play |
| --- | --- | --- |
| `/write-meow/en/` | `https://apps.apple.com/us/app/id6829519991` | `…/details?id=com.jdgrid.writemeow&hl=en` |
| `/write-meow/ja/` | `https://apps.apple.com/jp/app/id6829519991` | `…/details?id=com.jdgrid.writemeow&hl=ja` |
| `/write-meow/ko/` | `https://apps.apple.com/kr/app/id6829519991` | `…/details?id=com.jdgrid.writemeow&hl=ko` |

## Store fields

| Field | Value |
| --- | --- |
| App Store support URL | `https://apps.jdgrid.com/write-meow/support/` |
| App Store marketing URL | `https://apps.jdgrid.com/write-meow/` |
| App Store privacy policy URL | `https://apps.jdgrid.com/write-meow/privacy/` |
| Play privacy policy URL | `https://apps.jdgrid.com/write-meow/privacy/en/` |
| Play website | `https://apps.jdgrid.com/write-meow/` |
| Contact email | `writemeow@jdgrid.com` |

## Kept in sync with the app repo

The privacy and support pages are generated from `store/privacy-policy.md` and
`store/support-content.md` in the app repo. Change the text there, not here, and rebuild:

```bash
python3 ~/orca/be-writer/tool/build_site_pages.py ~/IdeaProjects/apps
```

The script copies each language's code block without retyping, wraps the email address
in a `mailto:` link, and reads every page back to compare it with the source. Run it with
`--check` to compare only.

The product pages are hand-written. Their copy comes from the App Store subtitle and
description in `store/ios-app-info.md`; keep the three languages saying the same thing.

## Asset sources

- `assets/media/app-icon.png` — the iOS 1024 px app icon resized to 192 px.
- `assets/media/{en|ja|ko}/*.webp` — the unframed store captures in
  `store/screenshots/raw/{en|ja|ko}/` (1170×2532) resized to 516 px wide WebP. Re-run the
  resize when the screenshots are retaken.
- `assets/theme.css` — paper, ink and accent colors from the app's
  `lib/core/theme/app_colors.dart`. Text accents use the deep accent `#a14d31` because
  the app's main accent `#d97757` is too light for small text on paper.
