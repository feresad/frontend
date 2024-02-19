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
  $(document).ready(function() {
    $('#idsearchInput').on('input', function() {
      var searchTerm = $(this).val().toLowerCase();
      
      // Parcourir chaque élément de la page
      $('body *').filter(function() {
        var text = $(this).text().toLowerCase();
        
        // Vérifier si le texte de l'élément contient le terme de recherche
        return text.indexOf(searchTerm) > -1;
      }).show(); // Afficher les éléments correspondants
    });
  });
  