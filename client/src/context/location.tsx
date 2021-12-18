import React from 'react';
import { AuthContext } from './auth';

interface ICoordinates {
  latitude?: number;
  longitude?: number;
}

export const LocationContext = React.createContext<ICoordinates | null>(null);

export const LocationContextProvider: React.FC = (props) => {
  const _coordinates: ICoordinates | {} = JSON.parse(localStorage.getItem('coordinates') || '{}');
  const [location, setLocation] = React.useState<ICoordinates | null>(_coordinates || null);
  const { authState } = React.useContext(AuthContext);

  const getGeoLocation = async (location: GeolocationPosition) => {
    try {
      const { latitude, longitude } = location.coords;
      setLocation({ latitude, longitude });
      localStorage.setItem('coordinates', JSON.stringify({ latitude, longitude }));
    } catch (error) {
      console.log(error, 'Unable to get location at the moment');
    }
  };
  React.useEffect(() => {
    if (!authState) return;
    // get geolocation if the user is logged in
    navigator.geolocation.getCurrentPosition((location) => {
      getGeoLocation(location);
    });
  }, [authState]);

  return <LocationContext.Provider value={location}>{props.children}</LocationContext.Provider>;
};
