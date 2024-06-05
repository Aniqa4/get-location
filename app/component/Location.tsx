'use client'
import React, { useState, useEffect } from 'react';
import Popup from './Popup';

interface GeolocationError {
    code: number;
    message: string;
}

type UserLocation = {
    latitude: number;
    longitude: number;
} | null;

function Location() {
    const [showPopup, setShowPopup] = useState(true);
    const [geolocationError, setGeolocationError] = useState<GeolocationError | null>(null);
    const [userLocation, setUserLocation] = useState<UserLocation>(null);

    const requestPermission = async () => {
        if (navigator.geolocation) {
            try {
                const permissionStatus = await navigator.permissions.query({ name: 'geolocation' });
                if (permissionStatus.state === 'granted') {
                    navigator.geolocation.getCurrentPosition(handleGeolocationSuccess, handleGeolocationError, {
                        enableHighAccuracy: true,
                        timeout: 5000, // Set a timeout for the request
                    });
                    setShowPopup(false); // Close the popup after permission granted
                } else {
                    // Permission denied or not determined
                    console.log('Geolocation permission denied or not determined');
                }
            } catch (error) {
                console.error('Error requesting geolocation permission:', error);
            }
        } else {
            console.error('Geolocation is not supported by this browser');
        }
    };

    const handleGeolocationSuccess = (position: GeolocationPosition) => {
        setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
        });
    };

    const handleGeolocationError = (error: GeolocationPositionError) => {
        setGeolocationError({ code: error.code, message: error.message });
    };

    useEffect(() => {
        // Call requestPermission on component mount
        requestPermission();
    }, []);

    // Use userLocation to fetch nearby shops logic here (e.g., API call)

    const handleClosePopup = () => {
        setShowPopup(false); // Update state to hide the popup
    };

return (
    <div>
        {showPopup && (
            <Popup
                onClose={handleClosePopup}
                onRequestPermission={requestPermission} // Pass requestPermission function
            />
        )}
        {geolocationError ? (
            <p>Error: {geolocationError.message}</p>
        ) : userLocation ? (
            <p>Your location: {userLocation.latitude}, {userLocation.longitude}</p>
        ) : (
            <p>Fetching location...</p>
        )}
        {/* You can display the fetched nearby shops data here */}
    </div>
);
}

export default Location;
