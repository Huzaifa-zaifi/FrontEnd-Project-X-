// Password Toggle Functionality and Authentication Check
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is already logged in (for login/signup pages)
    if (window.location.pathname.includes('index.html') || 
        window.location.pathname.includes('signup.html') ||
        (window.location.pathname === '/' || window.location.pathname.endsWith('/'))) {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (isLoggedIn === 'true') {
            window.location.href = 'dashboard.html';
            return;
        }
    }
    
    const passwordToggle = document.getElementById('passwordToggle');
    const passwordInput = document.getElementById('password');

    if (passwordToggle && passwordInput) {
        passwordToggle.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            // Update icon
            const svg = passwordToggle.querySelector('svg');
            if (type === 'text') {
                // Show eye-off icon
                svg.innerHTML = `
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                `;
            } else {
                // Show eye icon
                svg.innerHTML = `
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                `;
            }
        });
    }

    // Form Submission Handlers
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // Basic validation
            if (email && password) {
                // Simulate login - In production, this would be an API call
                const userData = {
                    email: email,
                    name: email.split('@')[0].replace(/[^a-zA-Z]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
                    loginTime: new Date().toISOString()
                };
                
                // Store user session
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userData', JSON.stringify(userData));
                
                // Show success message
                showMessage('Login successful! Redirecting...', 'success');
                
                // Redirect to dashboard after short delay
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1000);
            } else {
                showMessage('Please fill in all fields', 'error');
            }
        });
    }

    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const firstName = document.getElementById('firstName').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // Basic validation
            if (firstName && email && password) {
                // Simulate signup - In production, this would be an API call
                const userData = {
                    firstName: firstName,
                    email: email,
                    name: firstName,
                    loginTime: new Date().toISOString()
                };
                
                // Store user session
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userData', JSON.stringify(userData));
                
                // Show success message
                showMessage('Account created successfully! Redirecting...', 'success');
                
                // Redirect to dashboard after short delay
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1000);
            } else {
                showMessage('Please fill in all fields', 'error');
            }
        });
    }
    
    // Social Login Handlers
    const socialButtons = document.querySelectorAll('.social-btn');
    socialButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const buttonText = this.textContent.trim();
            
            // Simulate social login
            const userData = {
                email: 'user@example.com',
                name: buttonText.includes('Apple') ? 'Apple User' : 
                      buttonText.includes('Google') ? 'Google User' : 'Facebook User',
                loginTime: new Date().toISOString(),
                socialLogin: true
            };
            
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userData', JSON.stringify(userData));
            
            showMessage(`${buttonText} login successful! Redirecting...`, 'success');
            
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1000);
        });
    });


    // Input Focus Effects
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });

    // Smooth scroll for form section on mobile
    if (window.innerWidth <= 768) {
        const formSection = document.querySelector('.form-section');
        if (formSection) {
            formSection.style.scrollBehavior = 'smooth';
        }
    }
});

// Handle window resize for responsive adjustments
window.addEventListener('resize', function() {
    // Recalculate any dynamic sizing if needed
    const container = document.querySelector('.container');
    if (container && window.innerWidth <= 768) {
        // Mobile adjustments
        container.style.flexDirection = 'column';
    }
});

// Message notification function
function showMessage(message, type = 'success') {
    // Remove existing message if any
    const existingMessage = document.querySelector('.auth-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message element
    const messageEl = document.createElement('div');
    messageEl.className = `auth-message ${type}`;
    messageEl.textContent = message;
    messageEl.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 24px;
        background-color: ${type === 'success' ? '#22C55E' : '#EF4444'};
        color: white;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        font-weight: 500;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(messageEl);
    
    // Remove message after 3 seconds
    setTimeout(() => {
        messageEl.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            messageEl.remove();
        }, 300);
    }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

