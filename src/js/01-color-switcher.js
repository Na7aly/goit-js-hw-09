document.addEventListener("DOMContentLoaded", function () {
    const startButton = document.querySelector('[data-start]');
    const stopButton = document.querySelector('[data-stop]');
    const body = document.body;
  
    let colorChangeInterval;
  
    function getRandomHexColor() {
      return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
    }
  
    function changeBackgroundColor() {
      body.style.backgroundColor = getRandomHexColor();
    }
  

    startButton.addEventListener('click', function () {
      startButton.disabled = true;
      colorChangeInterval = setInterval(changeBackgroundColor, 1000);
    });

    stopButton.addEventListener('click', function () {
      clearInterval(colorChangeInterval);
      startButton.disabled = false;
    });
  });
  