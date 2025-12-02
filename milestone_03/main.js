"use strict"; 

/* main.js
This script handles the interactivity of the website.
Its main job is to listen for clicks on the gallery images and open a "Modal" (a pop-up window)
that shows more details about the clicked image. */

// 'DOMContentLoaded' is a special event that fires when the HTML is fully loaded and parsed.
// wrap our code inside this to ensure don't try to find elements (like buttons) before they exist on the page.
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Data Simulation (Data Source)
    // Instead of a database, use a JavaScript Object (JSON-like structure) to store info for each image.
    // The keys (e.g., 'interstellar') match the 'data-key' attribute in our HTML.
    // use 'let' because this data object will not be reassigned.
    let data = {
        'interstellar': {
            // Path to the image file
            src: 'image/sample-2.jpg', 
            // Title shown in the modal
            title: 'Interstellar (2014)',
            // Detailed info fields
            color: 'Brown / Yellow',
            director: 'Christopher Nolan',
            comp: 'Rule of Third', // Composition technique
            time: 'Afternoon',
            loc: 'Interior'
        },
        'portrait': {
            src: 'image/IMG_6339.jpg',
            title: 'Portrait of a Lady on Fire (2019)',
            color: 'Warm Yellow',
            director: 'Céline Sciamma',
            comp: 'Symmetry',
            time: 'Night',
            loc: 'Interior'
        },
        'budapest': {
            src: 'image/budapest.png',
            title: 'The Grand Budapest Hotel',
            color: 'Warm Orange',
            director: 'Wes Anderson',
            comp: 'Central Symmetry',
            time: 'Day',
            loc: 'Exterior'
        },
        'placeholder4': {
            src: 'image/IMG_0079.JPG',
            title: 'Blade Runner 2049',
            color: 'Teal & Orange',
            director: 'Denis Villeneuve',
            comp: 'Centring',
            time: 'Night',
            loc: 'Exterior'
        }
    };

    // 2. Get DOM Elements (Selecting HTML Tags)
    // select elements from the HTML using their ID so can manipulate them.
    // use 'let' here because don't need to overwrite these variables later.
    let modal = document.getElementById('detailModal'); // The hidden pop-up container
    let closeBtn = document.getElementById('closeBtn'); // The "< Back" button
    let modalImg = document.getElementById('modalImg'); // The <img> tag inside the modal
    let modalTitle = document.getElementById('modalTitle'); // The title text inside the modal
    
    // Select ALL cards on the page. 'querySelectorAll' returns a list (NodeList) of elements.
    let cards = document.querySelectorAll('.gallery-card');

    // 3. Define Functions (The Logic)

    /*
    Function: openModal
    Purpose: Populates the modal with data and makes it visible.
    @param {string} key - The unique ID for the image (e.g., 'interstellar')
     */
    function openModal(key) {
        // 1. Find the data object that matches the key
        let item = data[key];
        
        // Safety check: if no data found for this key, stop the function.
        if (!item) return;

        // 2. Update the Image
        modalImg.src = item.src;
        // Fallback: If the image fails to load (broken link), show a placeholder instead.
        modalImg.onerror = function() { 
            this.src = 'https://placehold.co/1200x600/222/555?text=Image+Load+Error'; 
        };
        
        // 3. Update the Text Content
        modalTitle.textContent = item.title;
        // use 'document.getElementById' here to find the specific <span> tags in the modal's info card
        document.getElementById('modalColor').textContent = item.color;
        document.getElementById('modalDirector').textContent = item.director;
        document.getElementById('modalComp').textContent = item.comp;
        document.getElementById('modalTime').textContent = item.time;
        document.getElementById('modalLoc').textContent = item.loc;

        // 4. Show the Modal
        // Changing display to 'block' makes the hidden div visible.
        modal.style.display = 'block';
        
        // 5. Disable scrolling on the main body
        // This prevents the background from moving while the user is looking at the modal.
        document.body.style.overflow = 'hidden'; 
        
        // 6. Accessibility Improvement
        // Move keyboard focus to the close button so screen readers know a context switch happened.
        if (closeBtn) {
            closeBtn.focus();
        }
        modal.setAttribute('aria-hidden', 'false'); // Tell screen readers the modal is now visible
    }

    /*
    Function: closeModal
    Purpose: Hides the modal and re-enables scrolling.
     */
    function closeModal() {
        modal.style.display = 'none'; // Hide the modal
        document.body.style.overflow = 'auto'; // Re-enable scrolling
        modal.setAttribute('aria-hidden', 'true'); // Tell screen readers it's hidden
    }

    // 4. Event Listeners (Waiting for User Actions)
    // Loop through each card found on the page
    // NOTE: use 'function(card)' here. Arrow functions '=>' are not used.
    cards.forEach(function(card) {
        // A. Click Event (Mouse/Touch)
        card.addEventListener('click', function() {
            // 'this' refers to the specific card that was clicked.
            // get the value of 'data-key' attribute (e.g., data-key="interstellar")
            let key = this.getAttribute('data-key');
            
            // If a key exists, call the openModal function with that key
            if (key) {
                openModal(key);
            }
        });

        // B. Keyboard Accessibility (Enter Key)
        // This allows users to tab to a card and press Enter to open it.
        card.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                let key = this.getAttribute('data-key');
                if (key) {
                    openModal(key);
                }
            }
        });
    });

    // Close Button Logic
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    // "Click Outside" Logic
    // If the user clicks on the dark overlay (the 'modal' div itself), close the modal.
    if (modal) {
        modal.addEventListener('click', function(e) {
            // e.target is what was actually clicked. modal is the background container.
            // If they are the same, it means the user clicked OUTSIDE the content box.
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // ESC Key Logic
    // Allow users to close the modal by pressing the Escape key on their keyboard.
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
});