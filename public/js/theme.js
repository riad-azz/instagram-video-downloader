// Dynamic theme change based on user preference (dark/light)
(() => {
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
})();
