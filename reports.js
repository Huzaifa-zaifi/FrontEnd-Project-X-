// Reports Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initActivityChart();
    initFilters();
});

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
    
    // Draw bars - monochromatic gray
    data.forEach((value, index) => {
        const barHeight = (value / maxValue) * chartHeight;
        const x = padding + index * barWidth + barSpacing / 2;
        const y = height - padding - barHeight;
        
        // Use gray gradient
        ctx.fillStyle = '#6B7280';
        ctx.fillRect(x, y, barWidth - barSpacing, barHeight);
        
        // Draw month labels
        ctx.fillStyle = '#6B7280';
        ctx.font = '11px "Open Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(months[index], x + (barWidth - barSpacing) / 2, height - padding + 20);
    });
    
    // Draw Y-axis labels
    ctx.fillStyle = '#9CA3AF';
    ctx.font = '11px "Open Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.textAlign = 'right';
    for (let i = 0; i <= 4; i++) {
        const value = Math.round((maxValue / 4) * (4 - i));
        const y = padding + (chartHeight / 4) * i;
        ctx.fillText(value.toString(), padding - 10, y + 4);
    }
}

// Filter Interactions
function initFilters() {
    const filterSelects = document.querySelectorAll('.filter-select');
    
    filterSelects.forEach(select => {
        select.addEventListener('change', function() {
            console.log('Filter changed:', this.value);
        });
    });
    
    // Download button
    const downloadBtn = document.querySelector('.download-btn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            console.log('Download clicked');
            alert('Download functionality would be implemented here!');
        });
    }
}

// Chart resize handler
window.addEventListener('resize', function() {
    const canvas = document.getElementById('activityChart');
    if (canvas) {
        initActivityChart();
    }
});

