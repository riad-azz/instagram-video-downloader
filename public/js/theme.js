// Dynamic theme change based on user preference (dark/light)
(async () => {
  const getCookie = (name) => {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(name + "=")) {
        return cookie.substring(name.length + 1);
      }
    }
    return null;
  };

  const userTheme = getCookie("theme");

  const colorSchemeQueryList = window.matchMedia(
    "(prefers-color-scheme: dark)"
  );
  const setColorScheme = (e) => {
    if (e.matches) {
      document.documentElement.className = "dark";
    } else {
      document.documentElement.className = "";
    }
  };
  setColorScheme(colorSchemeQueryList);

  if (!userTheme) {
    colorSchemeQueryList.addEventListener("change", setColorScheme);
  } else {
    document.documentElement.className = userTheme == "light" ? "" : "dark";
  }
})();
