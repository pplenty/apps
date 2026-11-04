(function () {
  "use strict";

  var root = document.documentElement;
  var supported = (root.dataset.locales || "ko,en,ja").split(",");
  var storageKey = root.dataset.localeKey || "preferred-locale";

  // An exact tag wins ("zh-Hant"); otherwise the language part picks the first
  // supported locale of that language, so "zh-TW" lands on "zh-Hant".
  function normalize(value) {
    var tag = String(value || "").toLowerCase();
    var language = tag.split("-")[0];
    var index;
    for (index = 0; index < supported.length; index += 1) {
      if (supported[index].toLowerCase() === tag) return supported[index];
    }
    // Chinese splits by script, not by list order: Taiwan, Hong Kong and Macau
    // (or an explicit Hant) read Traditional, everyone else Simplified. A site
    // with only one of the two still lands on it through the loop below.
    if (language === "zh") {
      var wanted = /-(hant|tw|hk|mo)(-|$)/.test(tag) ? "zh-hant" : "zh-hans";
      for (index = 0; index < supported.length; index += 1) {
        if (supported[index].toLowerCase() === wanted) return supported[index];
      }
    }
    for (index = 0; index < supported.length; index += 1) {
      if (supported[index].toLowerCase().split("-")[0] === language) return supported[index];
    }
    return null;
  }

  function readPreference() {
    try {
      return normalize(window.localStorage.getItem(storageKey));
    } catch (error) {
      return null;
    }
  }

  function savePreference(locale) {
    try {
      window.localStorage.setItem(storageKey, locale);
    } catch (error) {
      // Storage may be unavailable in private or restricted contexts.
    }
  }

  function browserLocale() {
    var languages = navigator.languages || [navigator.language];
    for (var index = 0; index < languages.length; index += 1) {
      var locale = normalize(languages[index]);
      if (locale) return locale;
    }
    return "en";
  }

  document.querySelectorAll("[data-locale]").forEach(function (link) {
    link.addEventListener("click", function () {
      var locale = normalize(link.getAttribute("data-locale"));
      if (locale) savePreference(locale);
    });
  });

  if (root.hasAttribute("data-language-router")) {
    var locale = readPreference() || browserLocale();
    var base = new URL(window.location.href);
    // "/privacy/index.html" is the same router page; drop the file name so the
    // locale lands beside it, not under it ("/privacy/index.html/ko/" is a 404).
    base.pathname = base.pathname.replace(/index\.html$/, "");
    if (!base.pathname.endsWith("/")) base.pathname += "/";
    base.search = "";
    base.hash = "";
    window.location.replace(new URL("./" + locale + "/", base));
  }
})();
