# Harmonica web pages

Harmonica Tuner & Practice (`com.pplenty.harmonica`) — the first Android-only app in this
repo. Source project: `~/orca/record-harmonica`.

## URL structure

- Product: `/harmonica/{en|ja|ko}/`
- Support: `/harmonica/support/{en|ja|ko}/`
- Privacy: `/harmonica/privacy/{en|ja|ko}/`

Each section root is a language router. Shared layout and routing live in `/assets`;
Harmonica colors and app assets live in `/harmonica/assets`.

**English is the base language** — unlike the other apps here. Play Console's default
locale for this app is en-US, so the language pickers list English first and
`x-default` resolves to English when the browser language is none of the three.

## Play Console

| Field | Value |
| --- | --- |
| Privacy policy URL | `https://apps.jdgrid.com/harmonica/privacy/en/` |
| Website | `https://apps.jdgrid.com/harmonica/en/` |
| Contact email | `harmonica@jdgrid.com` |
| Account deletion URL | not applicable — the app has no accounts |

Publishing a track is blocked until the privacy policy URL is filled in, so these pages
must be live before the first submission. Register the English URLs; the language nav on
each page reaches the other two, and a visitor landing on `/harmonica/privacy/` is routed
by browser language.

## Kept in sync with the app repo

The privacy pages are the published form of `store/privacy-policy.md` in the app repo.
When the ad SDK, the billing library or the data-safety answers change there, change all
three pages here in the same pass — the app repo's rule that one language must never
drift from the others applies across this repo too.

**The analytics section is deliberately absent.** `store/privacy-policy.md` carries a
drafted "Analytics" section behind a `GA4 PENDING` comment; publishing it before Firebase
Analytics actually ships would describe collection that is not happening. Publish it here
in the same release that adds the SDK.

The support FAQ describes behaviour verified in the app: screen-off recording with a
foreground-service notification, call interruption saving and resuming a take, WAV in
app-specific storage excluded from device backup, two positions per note, bend judgement
only where bending is the only way, 430–450 Hz reference, C4/C3 naming, in-app language
switching, and purchase restore through the Google Play account. Menu labels quoted on
the pages match `res/values{,-ja,-ko}/strings.xml`.

## Store CTA

The pages currently say "Coming soon on Google Play" — the app has no Play Console
listing yet. When it publishes, replace the two `.coming-soon` elements on each product
page with a Google Play badge and a store link, the way `/trance` links to the App Store.
Badges must come from Google's own badge assets, and Google's brand guidelines require
the badge, not a styled text button.

## Asset sources

- `assets/media/app-icon.png` — rendered from the app's adaptive icon
  (`res/drawable/ic_launcher_foreground.xml` on `#2B2118`), 192 px.
- `assets/media/{en|ja|ko}/*.webp` — the Play screenshots in
  `store/screenshots/{en-US|ja-JP|ko-KR}/`, cropped to remove the 135 px Android
  navigation bar and resized to 516 px wide WebP. Re-run that crop when the screenshots
  are retaken; the device status bar is kept on purpose.
