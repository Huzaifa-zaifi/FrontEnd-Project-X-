// Notification Service for sending notifications to admin and general manager

export const sendNotification = async (reportData, notificationType = 'report_submitted') => {
  // Simulate notification sending
  const notifications = [
    {
      recipient: 'admin@redvion.com',
      recipientType: 'admin',
      subject: `New ${notificationType.replace('_', ' ')}`,
      message: `A new report has been submitted: ${reportData.title || 'Untitled Report'}`,
      timestamp: new Date().toISOString(),
      data: reportData
    },
    {
      recipient: 'manager@redvion.com',
      recipientType: 'general_manager',
      subject: `New ${notificationType.replace('_', ' ')}`,
      message: `A new report has been submitted: ${reportData.title || 'Untitled Report'}`,
      timestamp: new Date().toISOString(),
      data: reportData
    }
  ]

  // Store notifications in localStorage (in production, this would be an API call)
  const existingNotifications = JSON.parse(localStorage.getItem('notifications') || '[]')
  const updatedNotifications = [...existingNotifications, ...notifications]
  localStorage.setItem('notifications', JSON.stringify(updatedNotifications))

  // Show success message
  showNotificationMessage('Notification sent to Admin and General Manager', 'success')

  // In production, you would make an API call here:
  // await fetch('/api/notifications', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(notifications)
  // })

  return notifications
}

export const getNotifications = () => {
  return JSON.parse(localStorage.getItem('notifications') || '[]')
}

export const showNotificationMessage = (message, type = 'info') => {
  const notificationEl = document.createElement('div')
  notificationEl.className = `fixed top-5 right-5 px-6 py-4 rounded-lg shadow-lg z-50 font-medium animate-slide-in ${
    type === 'success' ? 'bg-green-500' : 
    type === 'error' ? 'bg-red-500' : 
    'bg-blue-500'
  } text-white`
  notificationEl.textContent = message
  document.body.appendChild(notificationEl)
  
  setTimeout(() => {
    notificationEl.classList.add('animate-slide-out')
    setTimeout(() => notificationEl.remove(), 300)
  }, 3000)
}

