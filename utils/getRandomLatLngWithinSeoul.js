function getRandomLatLngWithinSeoul() {
  const centerLat = 37.5665; // 서울시 중심부 위도
  const centerLng = 126.978; // 서울시 중심부 경도
  const radiusInKm = 10; // 반경 10km

  const getRandomOffset = () => (Math.random() - 0.5) * 2 * (radiusInKm / 111); // 위도와 경도 1도의 거리는 약 111km

  const latitude = centerLat + getRandomOffset();
  const longitude = centerLng + getRandomOffset();

  return { latitude, longitude };
}

function generateRandomLocations(count) {
  const locations = [];
  for (let i = 0; i < count; i++) {
    locations.push(getRandomLatLngWithinSeoul());
  }
  return locations;
}

const randomLocations = generateRandomLocations(4);
