import React, { useEffect, useState, useRef } from "react";
import { GoogleMap, Marker, InfoWindow, LoadScript } from "@react-google-maps/api";
import '../styles/screens/EmergencyLocations.css'

const libraries = ['places'];

function EmergencyLocations() {
  const [map, setMap] = useState(null);
  const [center, setCenter] = useState({ lat: 45.422, lng: -75.682 });
  const [markers, setMarkers] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const searchInput = useRef(null);

  useEffect(() => {
    if (!map) return;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCenter(pos);
          searchNearby(pos);
        },
        () => {
          handleLocationError(true);
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false);
    }
  }, [map]);

  const searchNearby = (location) => {
    if (!window.google) {
      console.error("Google Maps API not loaded");
      return;
    }
    const service = new window.google.maps.places.PlacesService(map);
    service.nearbySearch(
      {
        location,
        radius: 500,
        type: ["hospital"],
      },
      (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          setMarkers(results);
        }
      }
    );
  };

  const handleSearch = () => {
    if (!searchInput.current.value) return;
    if (!window.google) {
      console.error("Google Maps API not loaded");
      return;
    }
    const service = new window.google.maps.places.PlacesService(map);
    service.textSearch(
      {
        query: searchInput.current.value,
        location: center,
        radius: 500,
      },
      (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          setMarkers(results);
          if (results[0]) {
            setCenter({
              lat: results[0].geometry.location.lat(),
              lng: results[0].geometry.location.lng(),
            });
          }
        }
      }
    );
  };

  const handleLocationError = (browserHasGeolocation) => {
    console.error(
      browserHasGeolocation
        ? "Error: The Geolocation service failed."
        : "Error: Your browser doesn't support geolocation."
    );
  };

  return (
    <div className="emergency-locations">
      <h1 className="emergency-locations__title">Emergency Locations</h1>
      <p className="emergency-locations__description">Search for locating the nearest hospital/pharmacy to you</p>
      <div className="emergency-locations__container">
        <div className="emergency-locations__search-container">
          <input ref={searchInput} type="text" className="emergency-locations__input" placeholder="Type to search: hospital" />
          <button onClick={handleSearch} className="emergency-locations__button">Search</button>
        </div>
        <LoadScript
          googleMapsApiKey="AIzaSyD3cMM5gT7G3Gz1kVnuVb-6Yp4liQ2_-bM"
          libraries={libraries}
        >
          <GoogleMap
            mapContainerClassName="emergency-locations__map"
            mapContainerStyle={{ width: "750px", height: "calc(90vh - 200px)"}}
            center={center}
            zoom={15}
            onLoad={(map) => setMap(map)}
          >
            {markers.map((place, index) => (
              <Marker
                key={index}
                position={place.geometry.location}
                onClick={() => setSelectedPlace(place)}
              />
            ))}
            {selectedPlace && (
              <InfoWindow
                position={selectedPlace.geometry.location}
                onCloseClick={() => setSelectedPlace(null)}
              >
                <div>
                  <h2>{selectedPlace.name}</h2>
                  <p>{selectedPlace.vicinity}</p>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
}

export default EmergencyLocations;
