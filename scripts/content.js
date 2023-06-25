function isWindowAspectRatio4to3() {
    const width = window.outerWidth;
    const height = window.outerHeight;
    const aspectRatio = width / height;

    console.log(Math.abs(aspectRatio - (4 / 3)))

    return Math.abs(aspectRatio - (4 / 3)) < 0.1;
}

if (isWindowAspectRatio4to3()) {
    // Window is in a 4:3 aspect ratio
    // Create a new MutationObserver instance
    const observer = new MutationObserver((mutations) => {
        // Check each mutation that occurred
        mutations.forEach((mutation) => {
            // Check if new nodes were added to the DOM
            if (mutation.type === 'childList' && mutation.addedNodes.length) {
                const video = document.querySelector('video');
                if (video) {
                    if (video.videoWidth != 640 && video.videoWidth != 0) {
                        chrome.storage.sync.get(
                            { scaleFactor: '1.5', enabled: true },
                            (items) => {
                                if (items.enabled) {
                                    // Check if the added node is a video element
                                    const videoPlayer = document.getElementsByClassName('btm-media-player');
                                    for (let i = 0; i < videoPlayer.length; i++) {
                                        videoPlayer[i].style.transform = 'scale(' + items.scaleFactor + ')'
                                    }
                                    console.log("scaling by factor of " + items.scaleFactor)
                                }
                            }
                        );
                    }
                }
            }
        });
    });

    // Start observing the document body and its subtree for changes
    observer.observe(document.body, { childList: true, subtree: true });
} else {
    // Window is not in a 4:3 aspect ratio
    console.log("Window is not in a 4:3 aspect ratio");
}
