import proj4 from 'proj4';

const epsg5181 = proj4('+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=500000 +ellps=GRS80 +units=m +no_defs');
const wgs84 = proj4('WGS84');

export const wgsToEpsg = (wgs) => {
  return proj4(wgs84, epsg5181, wgs);
};

export const epsgToWgs = (epsg) => {
  return proj4(epsg5181, wgs84, epsg);
};
