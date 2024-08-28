(function() {
    const newThemeColor = "#ff5733";  // Set your desired theme color
    const newBackgroundColor = "#ffffff";  // Set your desired background color
  
    // Modify the theme color
    let themeMeta = document.querySelector("meta[name='theme-color']");
    if (themeMeta) {
      themeMeta.setAttribute("content", newThemeColor);
    } else {
      themeMeta = document.createElement("meta");
      themeMeta.setAttribute("name", "theme-color");
      themeMeta.setAttribute("content", newThemeColor);
      document.head.appendChild(themeMeta);
    }
  
    // Modify the background color
    let backgroundMeta = document.querySelector("meta[name='background-color']");
    if (backgroundMeta) {
      backgroundMeta.setAttribute("content", newBackgroundColor);
    } else {
      backgroundMeta = document.createElement("meta");
      backgroundMeta.setAttribute("name", "background-color");
      backgroundMeta.setAttribute("content", newBackgroundColor);
      document.head.appendChild(backgroundMeta);
    }
  
    // Additionally, set the body background color directly
    document.body.style.backgroundColor = newBackgroundColor;
  })();
  