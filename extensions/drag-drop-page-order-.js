/**** Feather Wiki extension to add drag and drop Page Order. ****/
FW.ready(() => { // Wait until Feather Wiki is fully initialized
    const { state, emitter } = FW; // Extract state & emitter for easier use
    console.log('running dragDropListExtension'); // Indicate that the extension has been added

    function loadDragDropLibrary(callback) {
        // Load a lightweight drag-and-drop library (SortableJS)
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/Sortable/1.15.0/Sortable.min.js'; // CDN link
        script.onload = callback; // Call the provided callback once loaded
        document.body.appendChild(script);
    }

    function renderDragDropList() {
        const textarea = document.getElementById('wPo');
        if (!textarea) {
            console.error('Textarea with id "wPo" not found!');
            return;
        }

        // Hide the original textarea
        textarea.style.display = 'none';

        // Create a container for the draggable list
        const listContainer = document.createElement('div');
        listContainer.id = 'dragDropList';
        listContainer.style.border = '1px solid #ccc';
        listContainer.style.padding = '10px';
        listContainer.style.borderRadius = '4px';
        listContainer.style.backgroundColor = '#f9f9f9';

        // Split textarea value into list items and populate the container
        const listItems = textarea.value.split('\n').filter(item => item.trim() !== '');
        listItems.forEach(item => {
            const listItem = document.createElement('div');
            listItem.textContent = item;
            listItem.style.padding = '8px';
            listItem.style.margin = '5px 0';
            listItem.style.border = '1px solid #ddd';
            listItem.style.borderRadius = '3px';
            listItem.style.backgroundColor = '#fff';
            listItem.style.cursor = 'move'; // Visual cue for draggable items
            listContainer.appendChild(listItem);
        });

        // Add the list container to the page, just before the hidden textarea
        textarea.parentNode.insertBefore(listContainer, textarea);

        // Initialize Sortable.js for drag-and-drop functionality
        new Sortable(listContainer, {
            animation: 150, // Smooth dragging animation
            onEnd: () => {
                // Update the original textarea with the new order
                const updatedItems = Array.from(listContainer.children).map(child => child.textContent);
                textarea.value = updatedItems.join('\n');
            }
        });
    }

    // Attach renderDragDropList to page events
    ['DOMContentLoaded', 'render'].forEach(ev => {
        emitter.on(ev, () => {
            setTimeout(() => {
                loadDragDropLibrary(renderDragDropList); // Ensure SortableJS is loaded before rendering the list
            }, 50);
        });
    });
    emitter.emit('DOMContentLoaded'); // Ensure the extension initializes
});
/**** End of Feather Wiki extension to add drag and drop Page Order. ****/