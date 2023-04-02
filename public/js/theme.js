// Dynamic theme change based on user preference (dark/light)
(async () => {
  const response = await fetch("/theme");
  const json = await response.json();
  const userTheme = json.theme;

  const dynmaicTheme = () => {
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
    colorSchemeQueryList.addEventListener("change", setColorScheme);
  };

  if (!userTheme) {
    dynmaicTheme();
  } else {
    document.documentElement.className = userTheme === "light" ? "" : "dark";
  }
})();
