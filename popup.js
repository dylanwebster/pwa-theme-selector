// Event listener for DOMContentLoaded
document.addEventListener('DOMContentLoaded', function () {
    const colorPicker = document.getElementById('colorPicker');

    // Load saved color from storage, if available
    chrome.storage.sync.get('themeColor', function(data) {
        if (data.themeColor) {
            colorPicker.value = data.themeColor;
        }
    });

    // Handle color picker change
    colorPicker.addEventListener('input', function () {
        const selectedColor = colorPicker.value;

        // Save the selected color to Chrome storage
        chrome.storage.sync.set({ 'themeColor': selectedColor }, function() {
            console.log('Theme color saved: ' + selectedColor);
        });

        // Query the current active tab
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            const tabId = tabs[0].id;

            // Inject the script to change the theme color of the current page
            chrome.scripting.executeScript({
                target: { tabId: tabId },
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
