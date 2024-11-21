/**** Feather Wiki extension for a Back to Top button. ****/
FW.ready(() => { // Wait until Feather Wiki is fully initialized
    const { state, emitter } = FW; // Extract state & emitter for easier use
    console.log('running backToTopExtension'); // Indicate that the extension has been added

    // Create the Back to Top button
    const goToTopBtn = document.createElement('button');
    goToTopBtn.id = 'goToTopBtn';
    goToTopBtn.innerText = 'Back to Top';
    goToTopBtn.title = 'Go to top';
    goToTopBtn.style.position = 'fixed';
    goToTopBtn.style.bottom = '30px';
    goToTopBtn.style.right = '20px';
    goToTopBtn.style.zIndex = '1000';
    goToTopBtn.style.padding = '5px 12px';
    goToTopBtn.style.background = '#a6bb3a';
    goToTopBtn.style.color = '#000';
    goToTopBtn.style.borderRadius = '1rem';
    goToTopBtn.style.cursor = 'pointer';
    goToTopBtn.style.display = 'none'; // Initially hidden

    // Function to toggle the button's visibility based on scroll position
    function toggleButtonVisibility() {
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            goToTopBtn.style.display = 'block';
        } else {
            goToTopBtn.style.display = 'none';
        }
    }

    // Scroll smoothly to the top when the button is clicked
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // Render function for adding the button and setting up event listeners
    function renderBackToTopExtension() {
        // Append the button to the body if it's not already present
        if (!document.getElementById('goToTopBtn')) {
            document.body.appendChild(goToTopBtn);
        }
        // Show/hide button based on scroll position
        toggleButtonVisibility();
    }

    // Add event listeners for scroll and button click
    window.addEventListener('scroll', toggleButtonVisibility);
    goToTopBtn.addEventListener('click', scrollToTop);

    // Trigger the extension rendering on 'DOMContentLoaded' and 'render' events
    ['DOMContentLoaded', 'render'].forEach(ev => {
        emitter.on(ev, () => {
            setTimeout(() => { // Adds a small delay to ensure elements are in the DOM
                renderBackToTopExtension();
            }, 100);
        });
    });

    emitter.emit('DOMContentLoaded'); // Ensure the extension renders initially
});
/**** End of Feather Wiki extension for a Back to Top button. ****/