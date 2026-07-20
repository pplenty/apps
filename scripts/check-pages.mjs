import { existsSync, readFileSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const apps = ["saegeun", "monggle", "trance"];
const sections = ["", "support", "privacy"];
const locales = ["ko", "en", "ja"];
const errors = [];
let checkedPages = 0;

function report(message) {
  errors.push(message);
}

function checkLocalTargets(file, html) {
  for (const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    const value = match[1];
    if (/^(?:[a-z]+:|#)/i.test(value)) continue;

    const pathname = value.split(/[?#]/, 1)[0];
    let target = resolve(dirname(file), pathname);

    if (pathname.endsWith("/") || (existsSync(target) && statSync(target).isDirectory())) {
      target = join(target, "index.html");
    }

    if (!existsSync(target)) report(`${file}: missing local target ${value}`);
  }
}

function checkRouter(file) {
  if (!existsSync(file)) {
    report(`${file}: missing language router page`);
    return;
  }

  const html = readFileSync(file, "utf8");
  checkedPages += 1;
  checkLocalTargets(file, html);
  if (!html.includes("data-language-router")) report(`${file}: missing language router`);
}

function checkLocalizedPage(app, section, locale) {
  const parts = [repositoryRoot, app];
  if (section) parts.push(section);
  parts.push(locale, "index.html");
  const file = join(...parts);

  if (!existsSync(file)) {
    report(`${file}: missing localized page`);
    return;
  }

  const html = readFileSync(file, "utf8");
  const sectionPath = section ? `${section}/` : "";
  const canonical = `https://apps.jdgrid.com/${app}/${sectionPath}${locale}/`;
  checkedPages += 1;
  checkLocalTargets(file, html);

  if (!html.includes(`<html lang="${locale}"`)) report(`${file}: expected html lang=${locale}`);
  if (!html.includes(`<link rel="canonical" href="${canonical}">`)) report(`${file}: incorrect canonical URL`);

  for (const alternateLocale of locales) {
    const alternate = `hreflang="${alternateLocale}" href="https://apps.jdgrid.com/${app}/${sectionPath}${alternateLocale}/"`;
    if (!html.includes(alternate)) report(`${file}: missing hreflang=${alternateLocale}`);
  }

  if (!html.includes(`data-locale="${locale}" lang="${locale}" aria-current="page"`)) {
    report(`${file}: current language is not marked in the switcher`);
  }
}

for (const app of apps) {
  for (const section of sections) {
    checkRouter(join(repositoryRoot, app, section, "index.html"));
    for (const locale of locales) checkLocalizedPage(app, section, locale);
  }
}

for (const localeScript of [
  join(repositoryRoot, "saegeun", "assets", "locale.js"),
  join(repositoryRoot, "assets", "product-locale.js"),
]) {
  const source = readFileSync(localeScript, "utf8");
  for (const locale of locales) {
    if (!source.includes(locale)) report(`${localeScript}: missing supported locale ${locale}`);
  }
}

if (errors.length > 0) {
  for (const error of errors) console.error(error);
  process.exitCode = 1;
} else {
  console.log(`Checked ${checkedPages} pages: all links and locale metadata are valid.`);
}
