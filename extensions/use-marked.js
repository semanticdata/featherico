/**** Replace Parser with Marked.js ****/
FW.ready(() => {
    var markedScript = document.createElement('script');
    document.body.appendChild(markedScript);
    markedScript.onload = () => {
        window.md = window.marked.parse;
        FW.emit('render');
    }
    markedScript.src = 'https://cdn.jsdelivr.net/npm/marked/marked.min.js';
});
/**** End Replace Parser with Marked.js ****/