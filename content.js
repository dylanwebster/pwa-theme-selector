(function() {
    // Get the current URL of the PWA
    const currentUrl = window.location.origin;

    // Retrieve the stored theme color for this URL
    chrome.storage.local.get([currentUrl], function(result) {
        const savedColor = result[currentUrl];

        if (savedColor) {
            // Modify all theme-color meta tags
            const themeMetaTags = document.querySelectorAll("meta[name='theme-color']");

            themeMetaTags.forEach((themeMeta) => {
                themeMeta.setAttribute("content", savedColor);
            });

            if (themeMetaTags.length === 0) {
                const themeMeta = document.createElement("meta");
                themeMeta.setAttribute("name", "theme-color");
                themeMeta.setAttribute("content", savedColor);
                document.head.appendChild(themeMeta);
            }

            // Observe changes to the theme-color meta tags
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'content') {
                        themeMetaTags.forEach((themeMeta) => {
                            themeMeta.setAttribute("content", savedColor);
                        });
                    }
                });
            });

            themeMetaTags.forEach((themeMeta) => {
                observer.observe(themeMeta, { attributes: true });
            });
        }
    });
})();
