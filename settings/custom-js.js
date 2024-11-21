/**** Feather Wiki extension to add CodeMirror for Custom CSS. ****/
FW.ready(() => { // Wait until Feather Wiki is fully initialized
    const { state, emitter } = FW; // Extract state & emitter for easier use
    console.log('running cssEditorExtension'); // Indicate that the extension has been added

    // Load CodeMirror CSS and JS files dynamically
    function loadCodeMirror(callback) {
        // Add CSS for CodeMirror
        const cmCss = document.createElement('link');
        cmCss.rel = 'stylesheet';
        cmCss.href = 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.10/codemirror.min.css'; // Latest stable version as of this writing
        document.head.appendChild(cmCss);

        // Add JS for CodeMirror
        const cmScript = document.createElement('script');
        cmScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.10/codemirror.min.js';
        cmScript.onload = () => {
            // Load CSS mode for syntax highlighting
            const cssMode = document.createElement('script');
            cssMode.src = 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.10/mode/css/css.min.js';
            cssMode.onload = callback; // Once loaded, execute the callback
            document.body.appendChild(cssMode);
        };
        document.body.appendChild(cmScript);
    }

    // Replace the textarea with a CodeMirror editor
    function renderCssEditor() {
        const textarea = document.getElementById('wCss');
        if (!textarea) {
            console.error('Textarea with id "wCss" not found!');
            return;
        }

        // Hide the original textarea
        textarea.style.display = 'none';

        // Create a new div container for CodeMirror
        const editorContainer = document.createElement('div');
        textarea.parentNode.insertBefore(editorContainer, textarea);

        // Initialize CodeMirror
        const editor = CodeMirror(editorContainer, {
            value: textarea.value, // Set the initial content
            mode: 'css', // CSS syntax highlighting
            lineNumbers: true, // Add line numbers
            theme: 'default', // You can change this to any CodeMirror theme
            tabSize: 2,
            indentWithTabs: true,
        });

        // Sync changes from CodeMirror back to the original textarea
        editor.on('change', () => {
            textarea.value = editor.getValue();
        });
    }

    // Attach renderCssEditor to page events
    ['DOMContentLoaded', 'render'].forEach(ev => {
        emitter.on(ev, () => {
            setTimeout(() => {
                loadCodeMirror(renderCssEditor); // Ensure CodeMirror is loaded before rendering the editor
            }, 50);
        });
    });
    emitter.emit('DOMContentLoaded'); // Ensure the extension initializes
});
/**** End of Feather Wiki extension to add CodeMirror for Custom CSS. ****/


/**** Feather Wiki extension to add CodeMirror for Custom JS. ****/
FW.ready(() => { // Wait until Feather Wiki is fully initialized
    const { state, emitter } = FW; // Extract state & emitter for easier use
    console.log('running cssEditorExtension'); // Indicate that the extension has been added

    // Load CodeMirror CSS and JS files dynamically
    function loadCodeMirror(callback) {
        // Add CSS for CodeMirror
        const cmCss = document.createElement('link');
        cmCss.rel = 'stylesheet';
        cmCss.href = 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.10/codemirror.min.css'; // Latest stable version as of this writing
        document.head.appendChild(cmCss);

        // Add JS for CodeMirror
        const cmScript = document.createElement('script');
        cmScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.10/codemirror.min.js';
        cmScript.onload = () => {
            // Load CSS mode for syntax highlighting
            const cssMode = document.createElement('script');
            cssMode.src = 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.10/mode/javascript/javascript.min.js';
            cssMode.onload = callback; // Once loaded, execute the callback
            document.body.appendChild(cssMode);
        };
        document.body.appendChild(cmScript);
    }

    // Replace the textarea with a CodeMirror editor
    function renderCssEditor() {
        const textarea = document.getElementById('wJs');
        if (!textarea) {
            console.error('Textarea with id "wJs" not found!');
            return;
        }

        // Hide the original textarea
        textarea.style.display = 'none';

        // Create a new div container for CodeMirror
        const editorContainer = document.createElement('div');
        textarea.parentNode.insertBefore(editorContainer, textarea);

        // Initialize CodeMirror
        const editor = CodeMirror(editorContainer, {
            value: textarea.value, // Set the initial content
            mode: 'javascript', // JS syntax highlighting
            lineNumbers: true, // Add line numbers
            theme: 'default', // You can change this to any CodeMirror theme
            tabSize: 2,
            indentWithTabs: true,
        });

        // Sync changes from CodeMirror back to the original textarea
        editor.on('change', () => {
            textarea.value = editor.getValue();
        });
    }

    // Attach renderCssEditor to page events
    ['DOMContentLoaded', 'render'].forEach(ev => {
        emitter.on(ev, () => {
            setTimeout(() => {
                loadCodeMirror(renderCssEditor); // Ensure CodeMirror is loaded before rendering the editor
            }, 50);
        });
    });
    emitter.emit('DOMContentLoaded'); // Ensure the extension initializes
});
/**** End of Feather Wiki extension to add CodeMirror for Custom JS. ****/


/**** Feather Wiki extension to add CodeMirror for Custom HTML. ****/
FW.ready(() => { // Wait until Feather Wiki is fully initialized
    const { state, emitter } = FW; // Extract state & emitter for easier use
    console.log('running htmlEditorExtension'); // Indicate that the extension has been added

    // Load CodeMirror CSS and JS files dynamically
    function loadCodeMirror(callback) {
        // Add CSS for CodeMirror
        const cmCss = document.createElement('link');
        cmCss.rel = 'stylesheet';
        cmCss.href = 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.10/codemirror.min.css'; // Latest stable version as of this writing
        document.head.appendChild(cmCss);

        // Add JS for CodeMirror
        const cmScript = document.createElement('script');
        cmScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.10/codemirror.min.js';
        cmScript.onload = () => {
            // Load HTML Mixed mode for syntax highlighting
            const htmlMode = document.createElement('script');
            htmlMode.src = 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.10/mode/htmlmixed/htmlmixed.min.js';
            htmlMode.onload = () => {
                // Load additional modes for embedded CSS and JS
                const cssMode = document.createElement('script');
                cssMode.src = 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.10/mode/css/css.min.js';
                const jsMode = document.createElement('script');
                jsMode.src = 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.10/mode/javascript/javascript.min.js';
                document.body.appendChild(cssMode);
                document.body.appendChild(jsMode);
                callback();
            };
            document.body.appendChild(htmlMode);
        };
        document.body.appendChild(cmScript);
    }

    // Replace the textarea with a CodeMirror editor
    function renderHtmlEditor() {
        const textarea = document.getElementById('wHead');
        if (!textarea) {
            console.error('Textarea with id "wHead" not found!');
            return;
        }

        // Hide the original textarea
        textarea.style.display = 'none';

        // Create a new div container for CodeMirror
        const editorContainer = document.createElement('div');
        textarea.parentNode.insertBefore(editorContainer, textarea);

        // Initialize CodeMirror
        const editor = CodeMirror(editorContainer, {
            value: textarea.value, // Set the initial content
            mode: 'htmlmixed', // HTML syntax highlighting with embedded CSS/JS support
            lineNumbers: true, // Add line numbers
            theme: 'default', // You can change this to any CodeMirror theme
            tabSize: 2,
            indentWithTabs: true,
        });

        // Sync changes from CodeMirror back to the original textarea
        editor.on('change', () => {
            textarea.value = editor.getValue();
        });
    }

    // Attach renderHtmlEditor to page events
    ['DOMContentLoaded', 'render'].forEach(ev => {
        emitter.on(ev, () => {
            setTimeout(() => {
                loadCodeMirror(renderHtmlEditor); // Ensure CodeMirror is loaded before rendering the editor
            }, 50);
        });
    });
    emitter.emit('DOMContentLoaded'); // Ensure the extension initializes
});
/**** End of Feather Wiki extension to add CodeMirror for Custom HTML. ****/


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
        listContainer.style.padding = '5px';
        listContainer.style.borderRadius = '3px';
        listContainer.style.backgroundColor = '#f9f9f9';

        // Split textarea value into list items and populate the container
        const listItems = textarea.value.split('\n').filter(item => item.trim() !== '');
        listItems.forEach(item => {
            const listItem = document.createElement('div');
            listItem.textContent = item;
            listItem.style.padding = '4px';
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