export const distanceBetween = (position1, position2) => {
  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };
  const R = 6371;
  const dLat = deg2rad(position2.lat - position1.lat);
  const dLon = deg2rad(position2.lng - position1.lng);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(position1.lat)) *
      Math.cos(deg2rad(position2.lat)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;

  return d;
};
