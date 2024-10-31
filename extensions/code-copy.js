/**** Feather Wiki extension for Code Block Copy button. ****/
FW.ready(() => { // Wait until Feather Wiki is fully initialized
    const { state, emitter } = FW; // Extract state & emitter for easier use
    console.log('running copyToClipboardExtension'); // Indicate that the extension has been added

    // Make the extension run *both* when the page renders *and* when the page first loads
    ['DOMContentLoaded', 'render'].forEach(ev => {
        emitter.on(ev, () => {
            setTimeout(() => { // Adds a very small delay so it injects after render when elements exist in DOM
                renderCopyToClipboardExtension();
            }, 50);
        });
    });
    emitter.emit('DOMContentLoaded'); // Ensure your extension renders

    function renderCopyToClipboardExtension() {
        // Select all <pre> elements
        const preElements = document.querySelectorAll('pre');

        preElements.forEach(pre => {
            // Check if the button is already added to prevent duplicates
            if (pre.querySelector('.copy-button')) return;

            // Create the copy button
            const copyButton = document.createElement('button');
            copyButton.className = 'copy-button';
            copyButton.textContent = 'Copy';

            // Add click event to the button
            copyButton.addEventListener('click', () => {
                // Copy the text inside <pre> to the clipboard
                navigator.clipboard.writeText(pre.textContent)
                    .then(() => {
                        copyButton.textContent = 'Copied!';
                        setTimeout(() => {
                            copyButton.textContent = 'Copy';
                        }, 1000);
                    })
                    .catch(err => console.error('Failed to copy text:', err));
            });

            // Append the button to the <pre> element
            pre.style.position = 'relative'; // Ensure positioning works if needed
            copyButton.style.position = 'absolute';
            copyButton.style.top = '5px';
            copyButton.style.right = '5px';

            pre.appendChild(copyButton);
        });
    }
});
/**** End of Feather Wiki extension for Code Block Copy button. ****/