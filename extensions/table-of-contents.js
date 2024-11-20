/**** Feather Wiki extension for a floating Table of Contents. ****/
FW.ready(() => { // Wait until Feather Wiki is fully initialized
    const { state, emitter } = FW; // Extract state & emitter for easier use
    console.log('running tocExtension'); // Indicate that the extension has been added

    // Make the extension run both when the page renders and when the page first loads
    ['DOMContentLoaded', 'render'].forEach(ev => {
        emitter.on(ev, () => {
            setTimeout(() => { // Adds a very small delay so it injects after render when elements exist in DOM
                renderTableOfContents();
            }, 50);
        });
    });
    emitter.emit('DOMContentLoaded'); // Ensure your extension renders

    function renderTableOfContents() {
        // Remove any existing ToC to avoid duplicates
        const existingToc = document.querySelector('#toc');
        if (existingToc) {
            existingToc.remove();
        }

        // Create the ToC container
        const toc = document.createElement('div');
        toc.id = 'toc';
        toc.style.position = 'fixed';
        toc.style.top = '80px'; // Adjust to fit Feather Wiki's UI
        toc.style.right = '20px';
        toc.style.width = '200px';
        toc.style.maxHeight = 'calc(100vh - 100px)';
        toc.style.overflowY = 'auto';
        toc.style.backgroundColor = '#f9f9f9';
        toc.style.border = '1px solid #ccc';
        toc.style.padding = '10px';
        toc.style.borderRadius = '4px';
        toc.style.fontSize = '14px';
        toc.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.2)';
        toc.innerHTML = '<strong>Table of Contents</strong>';

        // Collect <h1> and <h2> elements from the page content
        const content = document.querySelector('.uc'); // Updated selector to '.uc'
        if (!content) {
            console.error('Content area not found!');
            return;
        }

        const headers = content.querySelectorAll('h1, h2');
        if (headers.length === 0) {
            console.log('No headers found in the content.');
            return;
        }

        // Generate ToC links
        const tocList = document.createElement('ul');
        tocList.style.listStyle = 'none';
        tocList.style.padding = '0';

        headers.forEach(header => {
            const listItem = document.createElement('li');
            listItem.style.margin = '5px 0';
            listItem.style.paddingLeft = header.tagName === 'H2' ? '10px' : '0';

            const link = document.createElement('a');
            link.href = `#${header.id || generateId(header)}`;
            link.textContent = header.textContent; // Updated to remove the `#` prefix
            link.style.textDecoration = 'none';
            link.style.color = '#007BFF';

            listItem.appendChild(link);
            tocList.appendChild(listItem);
        });

        toc.appendChild(tocList);

        // Append ToC to the body
        document.body.appendChild(toc);
    }

    // Helper function to generate IDs for headers without them
    function generateId(element) {
        const id = element.textContent.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
        element.id = id;
        return id;
    }
});
/**** End of Feather Wiki extension for a floating Table of Contents. ****/