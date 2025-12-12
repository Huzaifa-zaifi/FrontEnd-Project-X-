// Team Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initTeamActivityChart();
    initTeamGrowthChart();
    initAddMemberForm();
});

// Initialize Team Activity Chart
function initTeamActivityChart() {
    const canvas = document.getElementById('teamActivityChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.parentElement.offsetWidth;
    const height = 300;
    
    canvas.width = width;
    canvas.height = height;
    
    // Sample data
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const data = [120, 135, 128, 145, 140, 115, 130];
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

// Initialize Team Growth Chart
function initTeamGrowthChart() {
    const canvas = document.getElementById('teamGrowthChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.parentElement.offsetWidth;
    const height = 200;
    
    canvas.width = width;
    canvas.height = height;
    
    // Sample growth data
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    const data = [35, 38, 40, 42, 45, 48];
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
        
        // Draw month labels
        ctx.fillStyle = '#6B7280';
        ctx.font = '10px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(months[index], x, height - padding + 15);
    });
    
    ctx.stroke();
}

// Initialize Add Member Form
function initAddMemberForm() {
    const form = document.getElementById('addMemberForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const memberData = {
                name: document.getElementById('memberName').value,
                email: document.getElementById('memberEmail').value,
                role: document.getElementById('memberRole').value,
                team: document.getElementById('memberTeam').value
            };
            
            console.log('Adding team member:', memberData);
            alert('Team member added successfully!');
            
            // Reset form
            form.reset();
        });
    }
    
    // Add member button
    const addBtn = document.getElementById('addMemberBtn');
    if (addBtn) {
        addBtn.addEventListener('click', function() {
            document.getElementById('addMemberForm').scrollIntoView({ behavior: 'smooth' });
        });
    }
}

// Chart resize handler
window.addEventListener('resize', function() {
    const activityChart = document.getElementById('teamActivityChart');
    const growthChart = document.getElementById('teamGrowthChart');
    
    if (activityChart) {
        initTeamActivityChart();
    }
    if (growthChart) {
        initTeamGrowthChart();
    }
});

