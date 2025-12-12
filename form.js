// Form Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initFormChart();
    initSubmissionTrendChart();
    initFormBuilder();
});

// Initialize Form Submission Chart
function initFormChart() {
    const canvas = document.getElementById('formChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.parentElement.offsetWidth;
    const height = 300;
    
    canvas.width = width;
    canvas.height = height;
    
    // Sample data
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const data = [45, 52, 48, 61, 55, 38, 42];
    const maxValue = Math.max(...data);
    
    const padding = 40;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;
    const barWidth = chartWidth / days.length;
    const barSpacing = barWidth * 0.3;
    
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
        
        const gradient = ctx.createLinearGradient(0, y, 0, height - padding);
        gradient.addColorStop(0, '#A78BFA');
        gradient.addColorStop(1, '#C4B5FD');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, barWidth - barSpacing, barHeight);
        
        // Draw labels
        ctx.fillStyle = '#6B7280';
        ctx.font = '11px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(days[index], x + (barWidth - barSpacing) / 2, height - padding + 20);
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

// Initialize Submission Trend Chart
function initSubmissionTrendChart() {
    const canvas = document.getElementById('submissionTrendChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.parentElement.offsetWidth;
    const height = 200;
    
    canvas.width = width;
    canvas.height = height;
    
    // Sample trend data
    const data = [20, 25, 30, 28, 35, 40, 38, 45, 50, 48, 55, 60];
    const maxValue = Math.max(...data);
    
    const padding = 30;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;
    const pointSpacing = chartWidth / (data.length - 1);
    
    // Draw background
    ctx.fillStyle = '#F9FAFB';
    ctx.fillRect(0, 0, width, height);
    
    // Draw line
    ctx.strokeStyle = '#A78BFA';
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    data.forEach((value, index) => {
        const x = padding + index * pointSpacing;
        const y = height - padding - (value / maxValue) * chartHeight;
        
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
        
        // Draw point
        ctx.fillStyle = '#A78BFA';
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fill();
    });
    
    ctx.stroke();
}

// Initialize Form Builder
function initFormBuilder() {
    const form = document.getElementById('createFormForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                title: document.getElementById('formTitle').value,
                description: document.getElementById('formDescription').value,
                category: document.getElementById('formCategory').value,
                type: document.getElementById('formType').value
            };
            
            // Simulate form creation
            console.log('Creating form:', formData);
            alert('Form created successfully!');
            
            // Reset form
            form.reset();
        });
    }
    
    // Export button
    const exportBtn = document.getElementById('exportBtn');
    if (exportBtn) {
        exportBtn.addEventListener('click', function() {
            alert('Exporting form data...');
        });
    }
}

// Chart resize handler
window.addEventListener('resize', function() {
    const formChart = document.getElementById('formChart');
    const trendChart = document.getElementById('submissionTrendChart');
    
    if (formChart) {
        initFormChart();
    }
    if (trendChart) {
        initSubmissionTrendChart();
    }
});

