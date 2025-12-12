// Checklist Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initChecklistChart();
    initCompletionTrendChart();
    initChecklistForm();
});

// Initialize Checklist Chart
function initChecklistChart() {
    const canvas = document.getElementById('checklistChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.parentElement.offsetWidth;
    const height = 300;
    
    canvas.width = width;
    canvas.height = height;
    
    // Sample data
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const data = [85, 92, 88, 95, 90, 87, 94];
    const maxValue = 100;
    
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
        gradient.addColorStop(0, '#86EFAC');
        gradient.addColorStop(1, '#22C55E');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, barWidth - barSpacing, barHeight);
        
        // Draw labels
        ctx.fillStyle = '#6B7280';
        ctx.font = '11px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(days[index], x + (barWidth - barSpacing) / 2, height - padding + 20);
        
        // Draw percentage on top
        ctx.fillStyle = '#22C55E';
        ctx.font = 'bold 11px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        ctx.fillText(value + '%', x + (barWidth - barSpacing) / 2, y - 5);
    });
    
    // Draw Y-axis labels
    ctx.fillStyle = '#9CA3AF';
    ctx.font = '11px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.textAlign = 'right';
    for (let i = 0; i <= 4; i++) {
        const value = (100 / 4) * (4 - i);
        const y = padding + (chartHeight / 4) * i;
        ctx.fillText(value + '%', padding - 10, y + 4);
    }
}

// Initialize Completion Trend Chart
function initCompletionTrendChart() {
    const canvas = document.getElementById('completionTrendChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.parentElement.offsetWidth;
    const height = 200;
    
    canvas.width = width;
    canvas.height = height;
    
    // Sample trend data
    const weeks = ['W1', 'W2', 'W3', 'W4', 'W5', 'W6'];
    const data = [82, 85, 88, 90, 92, 94];
    const maxValue = 100;
    
    const padding = 30;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;
    const pointSpacing = chartWidth / (data.length - 1);
    
    // Draw background
    ctx.fillStyle = '#F9FAFB';
    ctx.fillRect(0, 0, width, height);
    
    // Draw line
    ctx.strokeStyle = '#22C55E';
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
        ctx.fillStyle = '#22C55E';
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw week labels
        ctx.fillStyle = '#6B7280';
        ctx.font = '10px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(weeks[index], x, height - padding + 15);
    });
    
    ctx.stroke();
}

// Initialize Checklist Form
function initChecklistForm() {
    const form = document.getElementById('createChecklistForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const checklistData = {
                title: document.getElementById('checklistTitle').value,
                description: document.getElementById('checklistDescription').value,
                category: document.getElementById('checklistCategory').value,
                priority: document.getElementById('checklistPriority').value
            };
            
            console.log('Creating checklist:', checklistData);
            alert('Checklist created successfully!');
            
            // Reset form
            form.reset();
        });
    }
    
    // Create checklist button
    const createBtn = document.getElementById('createChecklistBtn');
    if (createBtn) {
        createBtn.addEventListener('click', function() {
            document.getElementById('createChecklistForm').scrollIntoView({ behavior: 'smooth' });
        });
    }
}

// Chart resize handler
window.addEventListener('resize', function() {
    const checklistChart = document.getElementById('checklistChart');
    const trendChart = document.getElementById('completionTrendChart');
    
    if (checklistChart) {
        initChecklistChart();
    }
    if (trendChart) {
        initCompletionTrendChart();
    }
});

