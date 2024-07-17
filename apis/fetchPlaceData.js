import Config from "react-native-config";

async function fetchPlaceData(latLongArray) {
  const apiKey = Config.GOOGLE_MAPS_API_KEY; // 여기에 실제 API 키를 넣으세요
  const results = [];

  for (const { latitude, longitude } of latLongArray) {
    const location = `${latitude},${longitude}`;

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=500&key=${apiKey}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      results.push(...data.results);
    } catch (error) {
      console.error("Error fetching place data:", error);
    }
  }
  return results;
}

export default fetchPlaceData;
