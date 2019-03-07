(() => {
  
  let count = 0;
  let loading = true;

  document.onload = () => {
    
    var imgA = new Image();
    count++;
    imgA.onload = () => {
      checkOff();
    };
    imgA.src = 'assets/images/coding-4-flip-2a.png';

    var imgB = new Image();
    count++;
    imgB.onload = () => {
      checkOff();
    };
    imgB.src = 'assets/images/coding-4-flip-2a.png';

    var imgC = new Image();
    count++;
    imgC.onload = () => {
      checkOff();
    };
    imgC.src = 'assets/images/blue-grid-paper-background-millimeter.jpg';


  };


  function checkOff() {
    loading = (count === 0);
  }
})();