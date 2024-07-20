import Config from "react-native-config";

function loadGoogleMapsAPI(callback) {
  // const apiKey = Config.GOOGLE_MAPS_API_KEY; // .env에 있는 API 키를 사용
  const apiKey = "AIzaSyDtZrroHW8B937WdhKlsf1jikT97_rsBBY";
  if (window.google && window.google.maps) {
    // Google Maps API is already loaded, call the callback function
    callback();
  } else {
    // Google Maps API is not loaded, dynamically load it
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
    script.async = true;
    script.defer = true;
    script.onload = callback;
    // Append the script to the document
    document.head.appendChild(script);
  }
}
export default loadGoogleMapsAPI;
