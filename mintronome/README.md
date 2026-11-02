# Mintronome web pages

Mintronome: Practice Metronome (`com.jdgrid.mintronome`) — iPhone and Android, not launched
yet. Source project: `~/orca/metronome`.

## URL structure

- Support: `/mintronome/support/{en|ko}/`
- Privacy: `/mintronome/privacy/{en|ko}/`

There is no product page; the stores' marketing URL is the site root. Each section root is
a language router. **English is the base language**, so the language pickers list English
first. The app's own colors live in `/mintronome/assets/theme.css`.

## Store consoles

| Field | Value |
| --- | --- |
| Privacy policy URL (App Store, Play, AdMob messages) | `https://apps.jdgrid.com/mintronome/privacy/` |
| Support URL | `https://apps.jdgrid.com/mintronome/support/` |
| Contact email | `mintronome@jdgrid.com` |

## Generated from the app repo

These pages are generated, not hand-edited. The source is `store/privacy-policy.md` and
`store/support-content.md` in the app repo; `tool/build_public_pages.py --final` there writes
the pages and an add-only patch, and checks the text against the source. The app also bundles
the same policy text for offline reading, so change the policy there first, regenerate, and
replace both languages here in the same pass.

Policy effective 2 November 2026 (published before launch).
