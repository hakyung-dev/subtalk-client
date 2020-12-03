import React, { useEffect, useState } from 'react';
import { distanceBetween } from '../utils/index';
import { allStationLocation } from '../data/allStationLocation';

const GeoStatus = (props) => {
  const { currentLocation, trainPosition, handleModal, closeModal } = props;
  const [newLocation, setNewLocation] = useState(currentLocation);
  const [watchStatus, setWatchStatus] = useState(null);

  useEffect(() => {
    if (trainPosition) {
      const km = distanceBetween(
        newLocation,
        allStationLocation[trainPosition.statnNm]
      );
      if (km > 10) {
        handleModal();
      }
    }
  }, [trainPosition]);

  useEffect(() => {
    const navGeo = navigator.geolocation;
    const success = (position) => {
      setNewLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    };
    const error = (error) => {
      setWatchStatus(error.message);
    };
    const options = {
      enableHighAccuracy: false,
      timeout: 60000,
      maximumAge: 0,
    };
    if (!navGeo) {
      setWatchStatus('위치를 읽을 수 없습니다.');
      return;
    }

    const watcher = navGeo.watchPosition(success, error, options);

    return () => navGeo.clearWatch(watcher);
  }, []);

  const statusClass = watchStatus ? 'watch-status-err' : 'watch-status';

  return (
    <div className="geo-status">
      <button className="button-out" onClick={() => closeModal()}>
        OUT
      </button>
      <div className={statusClass}>{watchStatus}</div>
    </div>
  );
};

export default GeoStatus;
