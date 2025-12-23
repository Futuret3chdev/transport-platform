export function getDistanceAndTime(originPlaceId, destinationPlaceId) {
  return new Promise((resolve, reject) => {
    if (!window.google || !window.google.maps) {
      reject("Google Maps not loaded");
      return;
    }

    const service = new window.google.maps.DistanceMatrixService();

    service.getDistanceMatrix(
      {
        origins: [{ placeId: originPlaceId }],
        destinations: [{ placeId: destinationPlaceId }],
        travelMode: "DRIVING",
      },
      (response, status) => {
        // 🚨 Hard API failure
        if (status !== "OK") {
          reject(status);
          return;
        }

        const element = response?.rows?.[0]?.elements?.[0];

        if (!element) {
          reject("NO_RESULT_ELEMENT");
          return;
        }

        // 🌍 Legit case: road route not available (different countries, islands, etc.)
        if (element.status === "ZERO_RESULTS") {
          resolve({
            distanceKm: 0,
            durationMin: null,
            unavailable: true, // ← important flag
          });
          return;
        }

        // 🚨 Other Google errors
        if (element.status !== "OK") {
          reject(element.status);
          return;
        }

        // ✅ Normal road route
        resolve({
          distanceKm: element.distance.value / 1000,
          durationMin: Math.round(element.duration.value / 60),
          unavailable: false,
        });
      }
    );
  });
}
