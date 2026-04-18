// Handle Loading Animation
window.addEventListener('load', function() {
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(function() {
            loader.classList.add('hide');
            setTimeout(function() {
                loader.style.display = 'none';
            }, 600);
        }, 1200);
    }
});

// Mobile Menu Toggle with Modern Animation
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu when a link is clicked
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
});

// Menu Filtering Function
function filterMenu(category) {
    const menuItems = document.querySelectorAll('.menu-item');
    const categoryBtns = document.querySelectorAll('.category-btn');

    // Update active button
    categoryBtns.forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    // Filter menu items
    menuItems.forEach(item => {
        if (category === 'all') {
            item.classList.remove('hidden');
        } else {
            if (item.getAttribute('data-category') === category) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        }
    });
}

// Smooth Scroll to Section
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Generic Email Sending Function
async function sendEmail(serviceId, templateId, templateParams) {
    try {
        const response = await emailjs.send(serviceId, templateId, templateParams);
        console.log('✅ Email sent successfully!', response);
        return { success: true, message: 'Email sent successfully', response };
    } catch (error) {
        console.error('❌ Email sending failed:', error);
        return { success: false, message: 'Failed to send email', error };
    }
}

// Send Contact Email
function sendContactEmail(name, email, phone, message) {
    const emailParams = {
        to_email: 'andyp9885@gmail.com',
        from_email: email,
        from_name: name,
        from_phone: phone,
        message: message,
        reply_to: email
    };

    return sendEmail('service_mhwhli2', 'template_xsavhjm', emailParams);
}

// Initialize EmailJS
let isSubmitting = false;

window.addEventListener('load', function() {
    // Initialize EmailJS with your public key from emailjs.com
    // Get this from https://dashboard.emailjs.com/admin/account
    try {
        emailjs.init('P-K_vRni76L-x3mr_'); // Replace with your actual public key
    } catch(error) {
        console.warn('⚠️ EmailJS not properly initialized. Please add your credentials.');
    }
});

// Handle Reservation Form
function handleReservation(event) {
    event.preventDefault();

    // Prevent multiple submissions
    if (isSubmitting) {
        alert('⏳ Please wait for the current submission to complete...');
        return;
    }

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const guests = document.getElementById('guests').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const occasion = document.getElementById('occasion').value || 'Not specified';
    const notes = document.getElementById('notes').value;

    // Format date for email
    const formattedDate = formatDate(date);

    // Prepare email parameters
    const emailParams = {
        to_email: 'andyp9885@gmail.com', // Griddle Kitchen reservation emails
        from_email: email,
        guest_name: name,
        guest_email: email,
        guest_phone: phone,
        guest_number: guests,
        reservation_date: formattedDate,
        reservation_time: time,
        occasion: occasion,
        special_requests: notes || 'None'
    };

    // Show loading message
    const submitBtn = event.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = '🔄 Sending...';
    submitBtn.disabled = true;
    isSubmitting = true;

    // Send email using the sendEmail function
    sendEmail('service_mhwhli2', 'template_xsavhjm', emailParams)
        .then(function(result) {
            if (result.success) {
                // Success - Show message immediately
                const confirmationMessage = `
    ✅ Reservation Sent Successfully!

    Your Reservation Details:
    • Name: ${name}
    • Email: ${email}
    • Phone: ${phone}
    • Number of Guests: ${guests}
    • Date: ${formattedDate}
    • Time: ${time}
    • Occasion: ${occasion}
    ${notes ? `• Special Requests: ${notes}` : ''}

📧 Your reservation has been sent to andyp9885@gmail.com

    ⏳ Your reservation will be reviewed shortly.
    You will receive a confirmation call or email from Griddle Kitchen.

    Thank you for choosing Griddle Kitchen!
                `;

                alert(confirmationMessage);
                console.log('✅ Reservation sent successfully!', result.response);
                event.target.reset();
            } else {
                // Error handling - Show error message
                console.log('❌ Email sending failed:', result.error);
                alert('❌ Unable to send reservation.\n\n⚠️ Please check your connection and try again.\n\nOr contact us directly:\n📞 +233 245 681 858');
            }

            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            isSubmitting = false;
        });
}

// Format date to readable format
function formatDate(dateString) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString + 'T00:00:00').toLocaleDateString('en-US', options);
}

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe menu items for animation
document.addEventListener('DOMContentLoaded', function() {
    const menuItems = document.querySelectorAll('.menu-item');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const eventCards = document.querySelectorAll('.event-card');

    menuItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });

    galleryItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });

    eventCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

// Set minimum date to today
document.addEventListener('DOMContentLoaded', function() {
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }
});

// Add active state to navigation based on scroll position
window.addEventListener('scroll', function() {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });

    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.style.color = 'var(--text-color)';
        if (link.getAttribute('href').slice(1) === current) {
            link.style.color = 'var(--primary-color)';
            link.style.fontWeight = 'bold';
        } else {
            link.style.fontWeight = '500';
        }
    });
});