import { existsSync, readFileSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const siteRoot = join(repositoryRoot, "saegeun");
const sections = ["support", "privacy"];
const locales = ["ko", "en", "ja"];
const errors = [];
let checkedPages = 0;

function pagePath(section, locale) {
  return join(siteRoot, section, locale, "index.html");
}

function report(message) {
  errors.push(message);
}

function checkLocalTargets(file, html) {
  const attributes = html.matchAll(/\b(?:href|src)="([^"]+)"/g);

  for (const match of attributes) {
    const value = match[1];
    if (/^(?:[a-z]+:|#)/i.test(value)) continue;

    const pathname = value.split(/[?#]/, 1)[0];
    let target = resolve(dirname(file), pathname);

    if (pathname.endsWith("/") || (existsSync(target) && statSync(target).isDirectory())) {
      target = join(target, "index.html");
    }

    if (!existsSync(target)) {
      report(`${file}: missing local target ${value}`);
    }
  }
}

for (const section of sections) {
  const landingPage = join(siteRoot, section, "index.html");
  const landingHtml = readFileSync(landingPage, "utf8");
  checkedPages += 1;
  checkLocalTargets(landingPage, landingHtml);

  if (!landingHtml.includes("data-language-router")) {
    report(`${landingPage}: missing language router`);
  }

  for (const locale of locales) {
    const file = pagePath(section, locale);
    const html = readFileSync(file, "utf8");
    checkedPages += 1;
    const canonical = `https://apps.jdgrid.com/saegeun/${section}/${locale}/`;

    checkLocalTargets(file, html);

    if (!html.includes(`<html lang="${locale}">`)) {
      report(`${file}: expected html lang=${locale}`);
    }

    if (!html.includes(`<link rel="canonical" href="${canonical}">`)) {
      report(`${file}: incorrect canonical URL`);
    }

    for (const alternateLocale of locales) {
      const alternate = `hreflang="${alternateLocale}" href="https://apps.jdgrid.com/saegeun/${section}/${alternateLocale}/"`;
      if (!html.includes(alternate)) {
        report(`${file}: missing hreflang=${alternateLocale}`);
      }
    }

    if (!html.includes(`data-locale="${locale}" lang="${locale}" aria-current="page"`)) {
      report(`${file}: current language is not marked in the switcher`);
    }
  }
}

const productLanding = join(siteRoot, "index.html");
const productLandingHtml = readFileSync(productLanding, "utf8");
checkedPages += 1;
checkLocalTargets(productLanding, productLandingHtml);

if (!productLandingHtml.includes("data-language-router")) {
  report(`${productLanding}: missing language router`);
}

for (const locale of locales) {
  const file = join(siteRoot, locale, "index.html");
  const html = readFileSync(file, "utf8");
  const canonical = `https://apps.jdgrid.com/saegeun/${locale}/`;
  checkedPages += 1;

  checkLocalTargets(file, html);

  if (!html.includes(`<html lang="${locale}">`)) {
    report(`${file}: expected html lang=${locale}`);
  }

  if (!html.includes(`<link rel="canonical" href="${canonical}">`)) {
    report(`${file}: incorrect canonical URL`);
  }

  for (const alternateLocale of locales) {
    const alternate = `hreflang="${alternateLocale}" href="https://apps.jdgrid.com/saegeun/${alternateLocale}/"`;
    if (!html.includes(alternate)) {
      report(`${file}: missing hreflang=${alternateLocale}`);
    }
  }

  if (!html.includes(`data-locale="${locale}" lang="${locale}" aria-current="page"`)) {
    report(`${file}: current language is not marked in the switcher`);
  }
}

const localeScript = join(siteRoot, "assets", "locale.js");
const localeSource = readFileSync(localeScript, "utf8");

for (const locale of locales) {
  if (!localeSource.includes(`"${locale}"`)) {
    report(`${localeScript}: missing supported locale ${locale}`);
  }
}

if (errors.length > 0) {
  for (const error of errors) console.error(error);
  process.exitCode = 1;
} else {
  console.log(`Checked ${checkedPages} pages: all links and locale metadata are valid.`);
}
