// DOM Elements - Consolidated declarations
const navbar = document.querySelector('.navbar');
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');
const loading = document.querySelector('.loading');
const notificationContainer = document.querySelector('.notification-container');
const contactForm = document.querySelector('.contact-form');

let lastScroll = 0;

// Modern Loading Animation with Performance Optimization
document.addEventListener('DOMContentLoaded', () => {
    // Use requestAnimationFrame for smooth animation
    requestAnimationFrame(() => {
        window.addEventListener('load', () => {
            loading.classList.add('hidden');
            setTimeout(() => loading.remove(), 500);
        });
    });
});

// Modern Mobile Menu with Touch Support
mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    
    // Toggle menu icon
    const icon = mobileMenu.querySelector('i');
    if (icon.classList.contains('fa-bars')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Add touch support for mobile menu
document.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    if (touchEndX < touchStartX - swipeThreshold) {
        // Swipe left - close menu
        mobileMenu.classList.remove('active');
        navLinks.classList.remove('active');
    } else if (touchEndX > touchStartX + swipeThreshold) {
        // Swipe right - open menu
        mobileMenu.classList.add('active');
        navLinks.classList.add('active');
    }
}

// Modern Smooth Scrolling with Intersection Observer
const scrollLinks = document.querySelectorAll('a[href^="#"]');
const headerOffset = 80;

scrollLinks.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Modern Form Validation with Real-time Feedback
const newsletterForm = document.querySelector('.newsletter-form');

const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const validatePhone = (phone) => {
    return /^\+?[\d\s-]{10,}$/.test(phone);
};

const validateName = (name) => {
    return name.length >= 2;
};

const validateMessage = (message) => {
    return message.length >= 10;
};

// Real-time form validation
const formInputs = contactForm.querySelectorAll('input, textarea');
formInputs.forEach(input => {
    input.addEventListener('input', () => {
        validateInput(input);
    });
    
    input.addEventListener('blur', () => {
        validateInput(input);
    });
});

function validateInput(input) {
    const formGroup = input.closest('.form-group');
    let isValid = true;
    let errorMessage = '';

    switch(input.type) {
        case 'email':
            isValid = validateEmail(input.value);
            errorMessage = 'Please enter a valid email address';
            break;
        case 'tel':
            isValid = validatePhone(input.value);
            errorMessage = 'Please enter a valid phone number';
            break;
        case 'text':
            isValid = validateName(input.value);
            errorMessage = 'Name must be at least 2 characters long';
            break;
        case 'textarea':
            isValid = validateMessage(input.value);
            errorMessage = 'Message must be at least 10 characters long';
            break;
    }

    formGroup.classList.toggle('error', !isValid);
    const errorElement = formGroup.querySelector('.error-message');
    if (errorElement) {
        errorElement.textContent = errorMessage;
    }
}

// Modern Form Submission with Loading States
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Show loading state
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitButton.disabled = true;

    try {
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            message: document.getElementById('message').value
        };

        console.log('Attempting to send form data to:', 'http://localhost:5000/api/contact');
        console.log('Form data:', formData);

        const response = await fetch('http://localhost:5000/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        console.log('Response received:', response);
        console.log('Response status:', response.status);
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Response data:', data);

        showNotification('Message sent successfully! We will contact you soon.', 'success');
        contactForm.reset();
    } catch (error) {
        console.error('Error submitting form:', error);
        showNotification(error.message || 'Failed to send message. Please try again.', 'error');
    } finally {
        // Reset button state
        submitButton.innerHTML = originalButtonText;
        submitButton.disabled = false;
    }
});

// Modern Newsletter Subscription
newsletterForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const emailInput = newsletterForm.querySelector('input[type="email"]');
    const submitButton = newsletterForm.querySelector('button');

    if (!validateEmail(emailInput.value)) {
        showMessage(newsletterForm, 'Please enter a valid email address', 'error');
        return;
    }

    submitButton.disabled = true;
    submitButton.textContent = 'Subscribing...';

    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        showMessage(newsletterForm, 'Thank you for subscribing to our newsletter!', 'success');
        newsletterForm.reset();
    } catch (error) {
        showMessage(newsletterForm, 'An error occurred. Please try again later.', 'error');
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = 'Subscribe';
    }
});

// Modern Message Display
function showMessage(element, message, type = 'error') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.textContent = message;
    
    // Remove any existing messages
    const existingMessage = element.parentNode.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    element.parentNode.appendChild(messageDiv);
    
    // Animate in
    requestAnimationFrame(() => {
        messageDiv.style.opacity = '1';
        messageDiv.style.transform = 'translateY(0)';
    });
    
    // Remove after delay
    setTimeout(() => {
        messageDiv.style.opacity = '0';
        messageDiv.style.transform = 'translateY(-10px)';
        setTimeout(() => messageDiv.remove(), 300);
    }, 3000);
}

// Modern Scroll Animations with Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target); // Stop observing once animated
        }
    });
}, observerOptions);

// Observe elements for scroll animation
document.querySelectorAll('.animate-on-scroll').forEach((element, index) => {
    element.style.animationDelay = `${index * 0.1}s`;
    observer.observe(element);
});

// Modern Parallax Effect with Performance Optimization
const hero = document.querySelector('.hero');
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
            ticking = false;
        });
        ticking = true;
    }
});

// Modern Navbar Scroll Effect with Performance Optimization
let scrollTimeout;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll <= 0) {
                navbar.classList.remove('scroll-up');
                return;
            }
            
            if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
                navbar.classList.remove('scroll-up');
                navbar.classList.add('scroll-down');
            } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
                navbar.classList.remove('scroll-down');
                navbar.classList.add('scroll-up');
            }
            lastScroll = currentScroll;
            ticking = false;
        });
        ticking = true;
    }
});

// Modern Service Cards Hover Effect
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        requestAnimationFrame(() => {
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
        mobileMenu.classList.remove('active');
        const icon = mobileMenu.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenu.classList.remove('active');
        const icon = mobileMenu.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// Form validation and submission
const forms = document.querySelectorAll('form');
forms.forEach(form => {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const submitButton = form.querySelector('button[type="submit"]');
        
        try {
            // Disable submit button
            submitButton.disabled = true;
            submitButton.classList.add('loading');
            
            // Simulate form submission (replace with actual API call)
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Show success notification
            showNotification('Form submitted successfully!', 'success');
            
            // Reset form
            form.reset();
        } catch (error) {
            showNotification('An error occurred. Please try again.', 'error');
        } finally {
            // Re-enable submit button
            submitButton.disabled = false;
            submitButton.classList.remove('loading');
        }
    });
});

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    notificationContainer.appendChild(notification);
    
    // Remove notification after 5 seconds
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// Search functionality
const searchInput = document.querySelector('.search-input');
if (searchInput) {
    searchInput.addEventListener('input', debounce((e) => {
        const searchTerm = e.target.value.toLowerCase();
        const serviceCards = document.querySelectorAll('.service-card');
        
        serviceCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            const details = Array.from(card.querySelectorAll('li')).map(li => li.textContent.toLowerCase());
            
            const isVisible = title.includes(searchTerm) || 
                             description.includes(searchTerm) || 
                             details.some(detail => detail.includes(searchTerm));
            
            card.style.display = isVisible ? 'block' : 'none';
        });
    }, 300));
}

// Debounce function for search
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Image loading handler
document.addEventListener('DOMContentLoaded', function() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
});

// Initialize service cards
document.addEventListener('DOMContentLoaded', () => {
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.classList.add('animate-on-scroll');
    });
}); 