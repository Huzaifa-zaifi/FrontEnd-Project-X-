// Dashboard JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Check authentication first
    checkAuthentication();
    
    // Initialize user profile
    initUserProfile();
    
    // Initialize logout functionality
    initLogout();
    
    // Set active navigation item
    setActiveNavItem();
    
    // Mobile sidebar toggle
    initMobileSidebar();
});

// Set Active Navigation Item
function setActiveNavItem() {
    const currentPage = window.location.pathname.split('/').pop() || 'dashboard.html';
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href) {
            const hrefPage = href.split('/').pop();
            if (hrefPage === currentPage || (currentPage === '' && hrefPage === 'dashboard.html')) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        }
    });
}

// Authentication Check
function checkAuthentication() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    
    if (!isLoggedIn || isLoggedIn !== 'true') {
        // Redirect to login page if not authenticated
        window.location.href = 'index.html';
        return false;
    }
    
    return true;
}

// Initialize User Profile
function initUserProfile() {
    const userDataStr = localStorage.getItem('userData');
    
    if (userDataStr) {
        try {
            const userData = JSON.parse(userDataStr);
            const userNameEl = document.querySelector('.user-name');
            const userEmailEl = document.querySelector('.user-email');
            const userAvatarEl = document.querySelector('.user-avatar img');
            
            if (userNameEl && userData.name) {
                userNameEl.textContent = userData.name;
            }
            
            if (userEmailEl && userData.email) {
                userEmailEl.textContent = userData.email;
            }
            
            if (userAvatarEl && userData.name) {
                const nameForAvatar = userData.name.replace(/\s+/g, '+');
                userAvatarEl.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(nameForAvatar)}&background=A78BFA&color=fff&size=128`;
                userAvatarEl.alt = userData.name;
            }
        } catch (e) {
            console.error('Error parsing user data:', e);
        }
    }
}

// Initialize Logout Functionality
function initLogout() {
    // Handle logout button in user profile
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            handleLogout();
        });
    }
    
    // Create logout button in settings menu as well
    const settingsMenu = document.querySelector('.support-menu');
    if (settingsMenu) {
        // Check if logout button already exists
        let logoutNavBtn = document.querySelector('.logout-nav-btn');
        
        if (!logoutNavBtn) {
            logoutNavBtn = document.createElement('a');
            logoutNavBtn.href = '#';
            logoutNavBtn.className = 'nav-item logout-nav-btn';
            logoutNavBtn.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                    <polyline points="16 17 21 12 16 7"/>
                    <line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
                <span>Logout</span>
            `;
            
            logoutNavBtn.addEventListener('click', function(e) {
                e.preventDefault();
                handleLogout();
            });
            
            settingsMenu.appendChild(logoutNavBtn);
        }
    }
}

// Handle Logout
function handleLogout() {
    // Show confirmation
    if (confirm('Are you sure you want to logout?')) {
        // Clear authentication data
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userData');
        
        // Show logout message
        showMessage('Logging out...', 'success');
        
        // Redirect to login page
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 500);
    }
}

// Message notification function
function showMessage(message, type = 'success') {
    // Remove existing message if any
    const existingMessage = document.querySelector('.dashboard-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message element
    const messageEl = document.createElement('div');
    messageEl.className = `dashboard-message ${type}`;
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

// Add CSS animations for messages
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

// Activity Chart using Canvas
function initActivityChart() {
    const canvas = document.getElementById('activityChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.parentElement.offsetWidth;
    const height = 300;
    
    canvas.width = width;
    canvas.height = height;
    
    // Sample data for the chart
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    const data = [120, 150, 180, 200, 250, 280, 300, 320, 350, 380, 400, 380];
    const maxValue = Math.max(...data);
    
    const padding = 40;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;
    const barWidth = chartWidth / months.length;
    const barSpacing = barWidth * 0.2;
    
    // Draw background
    ctx.fillStyle = '#F9FAFB';
    ctx.fillRect(0, 0, width, height);
    
    // Draw grid lines
    ctx.strokeStyle = '#E5E7EB';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
        const y = padding + (chartHeight / 4) * i;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();
    }
    
    // Draw bars
    data.forEach((value, index) => {
        const barHeight = (value / maxValue) * chartHeight;
        const x = padding + index * barWidth + barSpacing / 2;
        const y = height - padding - barHeight;
        
        // Create gradient
        const gradient = ctx.createLinearGradient(0, y, 0, height - padding);
        gradient.addColorStop(0, '#A78BFA');
        gradient.addColorStop(1, '#C4B5FD');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, barWidth - barSpacing, barHeight);
        
        // Draw month labels
        ctx.fillStyle = '#6B7280';
        ctx.font = '11px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(months[index], x + (barWidth - barSpacing) / 2, height - padding + 20);
    });
    
    // Draw Y-axis labels
    ctx.fillStyle = '#9CA3AF';
    ctx.font = '11px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.textAlign = 'right';
    for (let i = 0; i <= 4; i++) {
        const value = Math.round((maxValue / 4) * (4 - i));
        const y = padding + (chartHeight / 4) * i;
        ctx.fillText(value.toString(), padding - 10, y + 4);
    }
}

// Mobile Sidebar Toggle
function initMobileSidebar() {
    const sidebar = document.querySelector('.sidebar');
    let menuButton = null;
    
    function createMenuButton() {
        if (!menuButton) {
            menuButton = document.createElement('button');
            menuButton.className = 'mobile-menu-btn';
            menuButton.innerHTML = `
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="3" y1="6" x2="21" y2="6"/>
                    <line x1="3" y1="12" x2="21" y2="12"/>
                    <line x1="3" y1="18" x2="21" y2="18"/>
                </svg>
            `;
            
            menuButton.addEventListener('click', function(e) {
                e.stopPropagation();
                sidebar.classList.toggle('open');
            });
            
            document.body.appendChild(menuButton);
        }
        menuButton.style.display = 'flex';
    }
    
    function removeMenuButton() {
        if (menuButton) {
            menuButton.style.display = 'none';
        }
        sidebar.classList.remove('open');
    }
    
    // Initial check
    if (window.innerWidth <= 480) {
        createMenuButton();
    }
    
    // Close sidebar when clicking outside
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 480 && 
            sidebar.classList.contains('open') &&
            !sidebar.contains(e.target) && 
            menuButton && !menuButton.contains(e.target)) {
            sidebar.classList.remove('open');
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth <= 480) {
            createMenuButton();
        } else {
            removeMenuButton();
        }
    });
}

// Filter Interactions
function initFilters() {
    const filterSelects = document.querySelectorAll('.filter-select');
    
    filterSelects.forEach(select => {
        select.addEventListener('change', function() {
            console.log('Filter changed:', this.value);
            // Add your filter logic here
        });
    });
    
    // Download button
    const downloadBtn = document.querySelector('.download-btn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            console.log('Download clicked');
            // Add your download logic here
            alert('Download functionality would be implemented here!');
        });
    }
}

// Smooth scroll for navigation
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function(e) {
        // Add smooth scroll or navigation logic here
        console.log('Navigation clicked:', this.textContent.trim());
    });
});

// Chart resize handler
window.addEventListener('resize', function() {
    const canvas = document.getElementById('activityChart');
    if (canvas) {
        initActivityChart();
    }
});

