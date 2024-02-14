 // Wait for the DOM to be fully loaded
 document.addEventListener('DOMContentLoaded', function() {
    // Select the info icon and the div to be revealed
    var infoIcon = document.querySelector('.info');
    var infoCoriDiv = document.querySelector('.info-cori');

    // Add the message content to info-cori div

    // Add an event listener for clicks on the info icon
    infoIcon.addEventListener('click', function() {
      // Toggle the display style between 'none' and 'block'
      if (infoCoriDiv.style.display === 'none' || infoCoriDiv.style.display === '') {
        infoCoriDiv.style.display = 'block';
    infoCoriDiv.innerText = 'This is for my love Cori, celebrating 15 wonderful years together.';
    infoCoriDiv.style.opacity = 1

      } else {
        infoCoriDiv.style.display = 'none';
    infoCoriDiv.innerText = '';
    infoCoriDiv.style.opacity = 0


      }
    });
  });