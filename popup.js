// Event listener for DOMContentLoaded
document.addEventListener('DOMContentLoaded', function () {
    const colorPicker = document.getElementById('colorPicker');
    const applyButton = document.getElementById('applyButton');

    // Get the current URL of the PWA
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        const currentUrl = new URL(tabs[0].url).origin;

        // Load the saved color for the current URL from local storage
        chrome.storage.local.get([currentUrl], function(data) {
            if (data[currentUrl]) {
                colorPicker.value = data[currentUrl];
            }
        });

        // Handle Apply button click
        applyButton.addEventListener('click', function () {
            const selectedColor = colorPicker.value;

            // Save the selected color for the current URL to local storage
            chrome.storage.local.set({ [currentUrl]: selectedColor }, function() {
                console.log('Theme color saved for', currentUrl, ':', selectedColor);
            });

            // Apply the selected color to the current tab
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                function: applyThemeColor,
                args: [selectedColor]
            });
        });
    });
});

// Function to inject into the current tab to change the theme color
function applyThemeColor(selectedColor) {
    let themeMeta = document.querySelector("meta[name='theme-color']");
    if (themeMeta) {
        themeMeta.setAttribute("content", selectedColor);
    } else {
        themeMeta = document.createElement("meta");
        themeMeta.setAttribute("name", "theme-color");
        themeMeta.setAttribute("content", selectedColor);
        document.head.appendChild(themeMeta);
    }
}
