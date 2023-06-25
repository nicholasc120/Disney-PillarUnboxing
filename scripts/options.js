// Saves options to chrome.storage
const saveOptions = () => {
    const scaleFactor = document.getElementById('scaleFactor').value;
    const enabled = document.getElementById('enabled').checked;

    chrome.storage.sync.set(
        { scaleFactor: scaleFactor, enabled: enabled },
        () => {
            // Update status to let user know options were saved.
            const status = document.getElementById('status');
            status.textContent = 'Options saved. Reload Disney+ and enter fullscreen to take effect.';
            setTimeout(() => {
                status.textContent = '';
            }, 1500);
        }
    );
};

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
const restoreOptions = () => {
    chrome.storage.sync.get(
        { scaleFactor: '1.5', enabled: true },
        (items) => {
            document.getElementById('scaleFactor').value = items.scaleFactor;
            document.getElementById('enabled').checked = items.enabled;
        }
    );
};

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);