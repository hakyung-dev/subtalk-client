import React, { useState, useRef, useEffect } from 'react';
import {
  GoogleMap,
  withGoogleMap,
  withScriptjs,
  Marker,
} from 'react-google-maps';
import { epsgToWgs } from '../utils/transformCoordinates';

import ArrivalBoard from '../components/ArrivalBoard';
import metroMarker from '../styles/images/metro.png';
import nowMarker from '../styles/images/now.png';

const Map = (props) => {
  const {
    currentLocation,
    getNearStation,
    stationLocation,
    selectStation,
    diselect,
    selectedStation,
  } = props;
  const [mapCenter, setMapCenter] = useState(currentLocation);
  const mapRef = useRef();
  const [zoom, setZoom] = useState(14);

  useEffect(() => {
    getNearStation(mapCenter);
  }, [getNearStation, mapCenter]);

  const handleDragEnd = () => {
    const newCenter = mapRef.current.getCenter().toJSON();
    setMapCenter(newCenter);
    setZoom(14);
  };

  const closeModal = () => {
    diselect();
  };

  const googleMaps = () => {
    return (
      <GoogleMap
        defaultZoom={zoom}
        defaultCenter={currentLocation}
        ref={mapRef}
        onDragEnd={handleDragEnd}
        center={mapCenter}
      >
        <Marker
          title="now"
          position={mapCenter}
          icon={nowMarker}
          opacity={0.3}
        />
        {stationLocation &&
          stationLocation.map((station, i) => {
            const e = [
              Number(station.subwayXcnts),
              Number(station.subwayYcnts),
            ];
            const w = epsgToWgs(e);
            const stationInfo = {
              name: station.statnNm,
              subwayId: station.subwayId,
              lineName: station.subwayNm,
            };
            const handleClick = () => {
              diselect();
              setZoom(17);
              setMapCenter({ lat: w[1], lng: w[0] });
              selectStation(stationInfo);
            };
            return (
              <Marker
                key={i}
                position={{ lat: w[1], lng: w[0] }}
                icon={metroMarker}
                onClick={handleClick}
              />
            );
          })}
      </GoogleMap>
    );
  };

  const WrappedMap = withScriptjs(withGoogleMap(googleMaps));

  return (
    <div className="container-map">
      <WrappedMap
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3&key=${process.env.REACT_APP_GOOGLE_MAPS_KEY}&libraries=geometry,drawing,places`}
        loadingElement={<div style={{ height: `100vh` }} />}
        containerElement={<div style={{ height: `100vh` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
      {selectedStation && <ArrivalBoard {...props} closeModal={closeModal} />}
    </div>
  );
};

export default Map;
