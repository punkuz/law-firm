document.addEventListener('DOMContentLoaded', () => {

     // --- NEW: Set Dynamic Year in Footer ---
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) { // Check if the element exists on the page
        yearSpan.textContent = new Date().getFullYear();
    }

  // --- NEW: Hero Carousel Logic ---
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    let slideInterval;

    const showSlide = (index) => {
        // Deactivate all slides and dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Activate the new slide and dot
        slides[index].classList.add('active');
        dots[index].classList.add('active');
    };

    const nextSlide = () => {
        currentSlide = (currentSlide + 1) % slides.length; // Loop back to 0
        showSlide(currentSlide);
    };

    const startSlideShow = () => {
        // Set an interval to switch slides every 5 seconds (5000ms)
        slideInterval = setInterval(nextSlide, 5000);
    };

    // Manual navigation with dots
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            // Stop the automatic slideshow
            clearInterval(slideInterval);
            // Get the slide index from the data-slide attribute
            currentSlide = parseInt(dot.getAttribute('data-slide'));
            showSlide(currentSlide);
            // Restart the slideshow
            startSlideShow();
        });
    });

    // Start the carousel on page load
    startSlideShow();

    // --- Sticky Header on Scroll ---
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Hamburger Menu for Mobile ---
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // --- Smooth Scrolling for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Team Member Modal Logic ---
    const modal = document.getElementById('team-modal');
    const modalImg = document.getElementById('modal-img');
    const modalName = document.getElementById('modal-name');
    const modalTitle = document.getElementById('modal-title');
    const modalBio = document.getElementById('modal-bio');
    const teamCards = document.querySelectorAll('.team-card');
    const closeModalBtn = document.querySelector('.close-btn');

    teamCards.forEach(card => {
        card.addEventListener('click', () => {
            // Get data from the card's data attributes
            const name = card.getAttribute('data-name');
            const title = card.getAttribute('data-title');
            const bio = card.getAttribute('data-bio');
            const imgSrc = card.querySelector('img').src;
            
            // Populate the modal with the data
            modalImg.src = imgSrc;
            modalName.textContent = name;
            modalTitle.textContent = title;
            modalBio.textContent = bio;
            
            // Show the modal
            modal.style.display = 'flex';
        });
    });

    // Function to close the modal
    const closeModal = () => {
        modal.style.display = 'none';
    };

    // Close the modal when the close button is clicked
    closeModalBtn.addEventListener('click', closeModal);

    // Close the modal when clicking outside of the modal content
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Close modal on 'Escape' key press
    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.style.display === 'flex') {
            closeModal();
        }
    });

});