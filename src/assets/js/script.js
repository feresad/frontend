document.addEventListener('DOMContentLoaded', function() {
    const notificationIcon = document.getElementById('notificationIcon');
    const notificationList = document.getElementById('notificationList');
  
    notificationIcon.addEventListener('click', function() {
      if (notificationList.style.display === 'none') {
        notificationList.style.display = 'block';
      } else {
        notificationList.style.display = 'none';
      }
    });
  });