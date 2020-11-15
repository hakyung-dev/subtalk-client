import React, { useState, useRef } from 'react';
import {
  GoogleMap,
  withGoogleMap,
  withScriptjs,
  Marker,
} from 'react-google-maps';

const Map = (props) => {
  const { currentLocation } = props;
  const [mapCenter, setMapCenter] = useState(currentLocation);
  const mapRef = useRef(null);
  const [zoom, setZoom] = useState(15);

  const handleDragEnd = () => {
    const newCenter = mapRef.current.getCenter().toJSON();
    setMapCenter(newCenter);
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
        <Marker title="now" position={mapCenter} />
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
    </div>
  );
};

export default Map;
