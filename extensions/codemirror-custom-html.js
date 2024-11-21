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