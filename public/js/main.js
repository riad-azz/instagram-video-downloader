// NAVBAR DROPDOWN MENU
try {
  (() => {
    const navMenu = document.getElementById("nav-menu");
    const navMenuBtn = document.getElementById("menu-button");

    const toggleMenu = () => {
      navMenu.classList.toggle("hidden");
    };

    navMenuBtn.onclick = toggleMenu;
  })();
} catch (error) {
  console.error(error);
}

// CHANGE THEM (DARK/LIGHT)
try {
  (() => {
    const themeButton = document.getElementById("theme-button");

    const toggleTheme = async () => {
      themeButton.disabled = true;
      document.documentElement.classList.toggle("dark");
      const newTheme = document.documentElement.classList.contains("dark")
        ? "dark"
        : "light";
      await fetch(`/theme/${newTheme}`, {
        method: "post",
      });
      themeButton.disabled = false;
    };

    themeButton.onclick = toggleTheme;
  })();
} catch (error) {
  console.error(error);
}
