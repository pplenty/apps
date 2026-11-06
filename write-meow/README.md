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

Live in both stores: Google Play since 2026-11-04, the App Store since 2026-11-05.

Each product page's hero carries the App Store badge and then the Google Play badge, both
in the page's language, and the footer carries the Apple and Google trademark lines. The
pages are light, so the App Store badge is the black one
(`/assets/badges/app-store-black-{en-us|ja-jp|ko-kr}.svg`, Apple's official badges, the same
files as `saegeun/`); dark pages such as `trance/` use the white one. The trust panel links
to Google Play.

Nothing outside `/write-meow/` links here yet.

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
