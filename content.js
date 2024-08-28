(function() {
  // Get the current URL of the PWA
  const currentUrl = window.location.origin;

  // Retrieve the stored theme color for this URL
  chrome.storage.local.get([currentUrl], function(result) {
      const savedColor = result[currentUrl];

      if (savedColor) {
          // Modify the theme color
          let themeMeta = document.querySelector("meta[name='theme-color']");
          if (themeMeta) {
              themeMeta.setAttribute("content", savedColor);
          } else {
              themeMeta = document.createElement("meta");
              themeMeta.setAttribute("name", "theme-color");
              themeMeta.setAttribute("content", savedColor);
              document.head.appendChild(themeMeta);
          }
      }
  });
})();
