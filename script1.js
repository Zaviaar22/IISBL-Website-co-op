function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
    document.body.classList.toggle("menu-open");
}

function updateMenuHighlight(section) {
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === section) {
            link.classList.add('active');
        }
    });
}

document.getElementById('learn-more-btn').addEventListener('click', function(e) {
    e.preventDefault(); // Prevent default action
    window.location.hash = 'researchreports'; // Update URL hash
    showSection('researchreports'); // Show the Research Reports section
});

function showSection(section) {
    // Hide all sections except the requested one
    document.querySelectorAll('.section').forEach(sec => {
        sec.style.display = 'none';
    });

    // Show the selected section
    const selectedSection = document.getElementById(section);
    selectedSection.style.display = 'block';
    

    if (section === 'home') {
        // Scroll to the very top of the page
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    } else {
        // Scroll to the section, considering the header height if necessary
        const headerOffset = document.querySelector('.header-nav').offsetHeight;
        const elementPosition = selectedSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
    // Specifically show the contact form if it's the contact section
    if (section === 'contact') {
        document.getElementById('contact-form').style.display = 'block';
    } else {
        document.getElementById('contact-form').style.display = 'none';
    }

    updateMenuHighlight(section);

    if (section === 'home') {
        document.getElementById('home-content').style.display = 'block';
    } else {
        document.getElementById('home-content').style.display = 'none';
    }
    updateMenuHighlight(section);
}


document.querySelectorAll('.nav-links a, .menu-links a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = this.getAttribute('data-section');
        window.location.hash = target;
        showSection(target);

        const menu = document.querySelector(".menu-links");
        const icon = document.querySelector(".hamburger-icon");
        if (menu.classList.contains('open')) {
            menu.classList.remove('open');
            icon.classList.remove('open');
            document.body.classList.remove("menu-open");
        }
    });
});

// Adjust page position to the selected section on load
window.addEventListener('load', () => {
    const section = window.location.hash ? window.location.hash.substring(1) : 'home';
    showSection(section);
    // Ensure the page does not scroll down on refresh
    window.scrollTo(0, 0);
});

// Add click event to logo to navigate to the home section
document.querySelector('.logo a').addEventListener('click', function (e) {
    e.preventDefault();
    window.location.hash = 'home';
    showSection('home');
});

// Get the modal and close button elements
var modal = document.getElementById('success-modal');
var closeButton = document.querySelector('.close-button');
var modalCloseBtn = document.getElementById('modal-close-btn');

// State flag to check if form was submitted
var formSubmitted = false;

// Function to open the modal
function openModal() {
    modal.style.display = 'flex';
}

// Function to close the modal
function closeModal() {
    modal.style.display = 'none';
    formSubmitted = false; // Reset the flag when modal is closed
}

// Event listeners for closing the modal
closeButton.addEventListener('click', closeModal);
modalCloseBtn.addEventListener('click', closeModal);
window.addEventListener('click', function(event) {
    if (event.target == modal) {
        closeModal();
    }
});

// Handle form submission
document.getElementById('newsletter-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // Check if the form is being actively submitted
    var firstName = document.getElementById('first-name').value.trim();
    var lastName = document.getElementById('last-name').value.trim();
    var email = document.getElementById('email').value.trim();

    // Only show the modal if all fields are filled
    if (firstName && lastName && email) {
        // Set the flag to indicate form submission
        formSubmitted = true;

        // Show the modal on successful submission
        openModal();
        
        // Optionally, reset the form
        this.reset();
    } else {
        // Handle the case where not all fields are filled
        alert("Please fill in all fields.");
    }
});

// Check if the modal should be shown on page load (for debugging, should be false normally)
window.addEventListener('load', () => {
    if (formSubmitted) {
        openModal();
    } else {
        closeModal(); // Ensure modal is not open on load
    }
});
