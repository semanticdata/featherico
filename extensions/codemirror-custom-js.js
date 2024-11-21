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