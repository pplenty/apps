(function () {
  "use strict";

  var supportedLocales = ["ko", "en", "ja"];
  var storageKey = "saegeun-locale";

  function normalizeLocale(locale) {
    var language = String(locale || "").toLowerCase().split("-")[0];
    return supportedLocales.indexOf(language) >= 0 ? language : null;
  }

  function getStoredLocale() {
    try {
      return normalizeLocale(window.localStorage.getItem(storageKey));
    } catch (error) {
      return null;
    }
  }

  function storeLocale(locale) {
    try {
      window.localStorage.setItem(storageKey, locale);
    } catch (error) {
      // Browsers may block storage in private or restricted contexts.
    }
  }

  function getBrowserLocale() {
    var languages = navigator.languages || [navigator.language];

    for (var index = 0; index < languages.length; index += 1) {
      var locale = normalizeLocale(languages[index]);
      if (locale) return locale;
    }

    return "en";
  }

  document.querySelectorAll("[data-locale]").forEach(function (link) {
    link.addEventListener("click", function () {
      var locale = normalizeLocale(link.getAttribute("data-locale"));
      if (locale) storeLocale(locale);
    });
  });

  if (document.documentElement.hasAttribute("data-language-router")) {
    var locale = getStoredLocale() || getBrowserLocale();
    var baseUrl = new URL(window.location.href);
    if (!baseUrl.pathname.endsWith("/")) baseUrl.pathname += "/";
    baseUrl.search = "";
    baseUrl.hash = "";
    window.location.replace(new URL("./" + locale + "/", baseUrl));
  }
})();
