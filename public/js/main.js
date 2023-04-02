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

// API
try {
  (() => {
    const apiButton = document.getElementById("api-button");

    const toggleTheme = () => {
      document.documentElement.classList.toggle("dark");
    };

    apiButton.onclick = toggleTheme;
  })();
} catch (error) {
  console.error(error);
}

// CHANGE THEM (DARK/LIGHT)
try {
  (() => {
    const themeButton = document.getElementById("theme-button");

    const toggleTheme = () => {
      document.documentElement.classList.toggle("dark");
      const cookies = sessionStorage.getItem("counter");
      console.log(document.cookie);
      console.log(cookies);
    };

    themeButton.onclick = toggleTheme;
  })();
} catch (error) {
  console.error(error);
}
