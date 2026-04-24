// This script is used for the custom website design page, which has a different header CTA button link.
// When the mobile dropdown menu is open, and a user clicks on the CTA button, the menu needs to close.
// That is what this script accomplishes.

document.addEventListener('DOMContentLoaded', function () {
    // Wait for the page to load
    const bookButtons = document.querySelectorAll('.menu-book-button');

    bookButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            // Target the close button or the overlay to shut the menu
            const closeButton = document.querySelector('#menu-close-button');
            if (closeButton) {
                closeButton.click();
            } 
        });
    });
	
});