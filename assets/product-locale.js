(function () {
  "use strict";

  var root = document.documentElement;
  var supported = (root.dataset.locales || "ko,en,ja").split(",");
  var storageKey = root.dataset.localeKey || "preferred-locale";

  function normalize(value) {
    var language = String(value || "").toLowerCase().split("-")[0];
    return supported.indexOf(language) >= 0 ? language : null;
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
    if (!base.pathname.endsWith("/")) base.pathname += "/";
    base.search = "";
    base.hash = "";
    window.location.replace(new URL("./" + locale + "/", base));
  }
})();
