var getGeoLocation = function (locOut, getGeoButton, errorOut) {

  var checkGeoLocationNoShow = function () {
    if(timeoutError === true) { 
      errorOut.innerHTML = "****No geolocation was detected.****"; 
    }
  }
  
  var timeoutError = true;
  locOut.location = false;
  
  var locationInfo = function(position) {
    var details = "Lat: " + position.coords.latitude + ", Long: " + position.coords.longitude;
    locOut.innerHTML = details;
    timeoutError = false;
    locOut.location = true;
    errorOut.innerHTML = "";
  }
  
  var locationInfoError = function(error) {
    var errorMessage = ['',
     'Permission denied',
     'Position unavailable',
     'Timeout'];
     
    errorOut.innerHTML = "****Error receiving location info: " + errorMessage[error.code] + "****";

  }
  
  var options = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 30000
  }

  getGeoButton.onclick = function() {
    timeoutError = true;
    locOut.location = false;
    locOut.innerHTML = "";
    errorOut.innerHTML = "";
    setTimeout(checkGeoLocationNoShow, 10000);
    navigator.geolocation.getCurrentPosition(locationInfo, locationInfoError, options);
  }
}

var validation = function() {
  document.getElementById("submitError").innerHTML = "";
    
  if ((document.getElementById("geoLoc").location === false) && (document.getElementById("carPref").children.length === 1)) {
    document.getElementById("submitError").innerHTML = "****No car preferences or location given****"
    return false;
  } 
  else if (document.getElementById("geoLoc").location === false) {
    document.getElementById("submitError").innerHTML += "****No location given****";
    return false;
  } 
  else if (document.getElementById("carPref").children.length === 1) {
    document.getElementById("submitError").innerHTML += "****No car preferences given****";
    return false;
  }
  return true;
}

var dragDrop = function(orderForm, carSelectionTable, cars, carImages) {

  orderForm.ondrop = function(event) { 
    var box = document.getElementById("carPref");
    box.appendChild(document.getElementById(event.dataTransfer.getData('Img')));
    event.preventDefault();
    return true;
  }

  orderForm.ondragenter = function() { return false };
  orderForm.ondragover = function() { return false };
  orderForm.onsubmit = function() { return validation() };

  carSelectionTable.ondrop = function(event) { 
    var carImage = document.getElementById(event.dataTransfer.getData('Img'));
    document.getElementById(carImage.getAttribute("alt")).appendChild(carImage);
    event.preventDefault();
    return true;
  }

  carSelectionTable.ondragenter = function() { return false };
  carSelectionTable.ondragover = function() { return false };

  for (car in cars) {
    cars[car].ondragstart = function(event) { 
      event.dataTransfer.setData('Img', this.children[1].children[0].id);
      return true;
    };
  }

  for(carImage in carImages) {
    carImages[carImage].ondragstart = function(event) { 
      event.dataTransfer.setData('Img', this.id);
      return true;
    };
  }
}