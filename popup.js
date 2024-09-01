document.addEventListener('DOMContentLoaded', function () {
    const colorPicker = document.getElementById('colorPicker');
    const applyButton = document.getElementById('applyButton');

    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        const currentUrl = new URL(tabs[0].url).origin;

        // Load saved color or use default
        chrome.storage.local.get([currentUrl], function(data) {
            const savedColor = data[currentUrl] || '#000000'; // Default color
            colorPicker.value = savedColor;
        });

        applyButton.addEventListener('click', function () {
            const selectedColor = colorPicker.value;

            chrome.storage.local.set({ [currentUrl]: selectedColor }, function() {
                console.log('Theme color saved for', currentUrl, ':', selectedColor);
            });

            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                function: applyThemeColor,
                args: [selectedColor]
            });
        });
    });
});

function applyThemeColor(selectedColor) {
    const themeMetaTags = document.querySelectorAll("meta[name='theme-color']");

    themeMetaTags.forEach((themeMeta) => {
        themeMeta.setAttribute("content", selectedColor);
    });

    if (themeMetaTags.length === 0) {
        const themeMeta = document.createElement("meta");
        themeMeta.setAttribute("name", "theme-color");
        themeMeta.setAttribute("content", selectedColor);
        document.head.appendChild(themeMeta);
    }

    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'content') {
                themeMetaTags.forEach((themeMeta) => {
                    themeMeta.setAttribute("content", selectedColor);
                });
            }
        });
    });

    themeMetaTags.forEach((themeMeta) => {
        observer.observe(themeMeta, { attributes: true });
    });
}
