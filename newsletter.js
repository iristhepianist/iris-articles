// Newsletter subscription management
class NewsletterManager {
    constructor() {
        this.storageKey = 'lambda_newsletter_subscribers';
        this.subscribers = this.loadSubscribers();
    }

    loadSubscribers() {
        try {
            const data = localStorage.getItem(this.storageKey);
            return data ? JSON.parse(data) : [];
        } catch (e) {
            console.error('Error loading subscribers:', e);
            return [];
        }
    }

    saveSubscribers() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.subscribers));
            return true;
        } catch (e) {
            console.error('Error saving subscribers:', e);
            return false;
        }
    }

    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email.toLowerCase());
    }

    isSubscribed(email) {
        return this.subscribers.some(sub => sub.email.toLowerCase() === email.toLowerCase());
    }

    subscribe(email, name = '') {
        email = email.trim().toLowerCase();
        
        if (!this.validateEmail(email)) {
            return { success: false, message: 'Please enter a valid email address.' };
        }

        if (this.isSubscribed(email)) {
            return { success: false, message: 'This email is already subscribed.' };
        }

        const subscriber = {
            email: email,
            name: name.trim(),
            subscribedAt: new Date().toISOString(),
            id: this.generateSubscriberId(email)
        };

        this.subscribers.push(subscriber);
        
        if (this.saveSubscribers()) {
            return { success: true, message: 'Successfully subscribed to the newsletter!', subscriber };
        } else {
            return { success: false, message: 'Error saving subscription. Please try again.' };
        }
    }

    unsubscribe(emailOrId) {
        const identifier = emailOrId.toLowerCase();
        const initialLength = this.subscribers.length;
        
        this.subscribers = this.subscribers.filter(sub => 
            sub.email.toLowerCase() !== identifier && sub.id !== identifier
        );

        if (this.subscribers.length < initialLength) {
            this.saveSubscribers();
            return { success: true, message: 'Successfully unsubscribed.' };
        }

        return { success: false, message: 'Email not found in subscriber list.' };
    }

    generateSubscriberId(email) {
        // Simple hash for unsubscribe links
        let hash = 0;
        const str = email + new Date().toISOString();
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return Math.abs(hash).toString(36);
    }

    getSubscribers() {
        return [...this.subscribers];
    }

    getSubscriberCount() {
        return this.subscribers.length;
    }

    exportSubscribers() {
        return JSON.stringify(this.subscribers, null, 2);
    }

    exportCSV() {
        if (this.subscribers.length === 0) {
            return 'email,name,subscribed_at,id\n';
        }

        const headers = 'email,name,subscribed_at,id\n';
        const rows = this.subscribers.map(sub => 
            `${sub.email},"${sub.name}",${sub.subscribedAt},${sub.id}`
        ).join('\n');

        return headers + rows;
    }
}

// Initialize global newsletter manager
const newsletterManager = new NewsletterManager();

// Handle subscription form submission
function handleNewsletterSubscribe(event) {
    event.preventDefault();
    
    const form = event.target;
    const emailInput = form.querySelector('input[type="email"]');
    const nameInput = form.querySelector('input[name="name"]');
    const messageDiv = form.querySelector('.newsletter-message') || createMessageDiv(form);
    const submitBtn = form.querySelector('button[type="submit"]');
    
    const email = emailInput.value;
    const name = nameInput ? nameInput.value : '';
    
    // Disable button during submission
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Subscribing...';
    }
    
    const result = newsletterManager.subscribe(email, name);
    
    // Show message
    messageDiv.textContent = result.message;
    messageDiv.className = 'newsletter-message ' + (result.success ? 'success' : 'error');
    messageDiv.style.display = 'block';
    
    if (result.success) {
        form.reset();
        
        // Track subscription event (optional analytics)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'newsletter_subscribe', {
                'event_category': 'engagement',
                'event_label': 'newsletter'
            });
        }
    }
    
    // Re-enable button
    if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Subscribe';
    }
    
    // Hide message after 5 seconds
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 5000);
}

function createMessageDiv(form) {
    const div = document.createElement('div');
    div.className = 'newsletter-message';
    div.style.display = 'none';
    form.appendChild(div);
    return div;
}

// Handle unsubscribe
function handleNewsletterUnsubscribe(subscriberId) {
    if (confirm('Are you sure you want to unsubscribe from the newsletter?')) {
        const result = newsletterManager.unsubscribe(subscriberId);
        alert(result.message);
        if (result.success && window.location.pathname.includes('unsubscribe')) {
            window.location.href = 'index.html';
        }
    }
}

// Initialize newsletter forms when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    newsletterForms.forEach(form => {
        form.addEventListener('submit', handleNewsletterSubscribe);
    });
    
    // Handle unsubscribe from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const unsubId = urlParams.get('unsubscribe');
    if (unsubId) {
        handleNewsletterUnsubscribe(unsubId);
    }
});
