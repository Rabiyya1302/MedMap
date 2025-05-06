import { useEffect, useState } from 'react';

// Define a type for location data
interface LocationData {
  city: string;
  region: string;
  country: string;
  latitude: number;
  longitude: number;
  ip: string;
}

// Define the return type of the hook
const useLocation = () => {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLocation = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://ip-api.com/json');
        const data = await response.json();
        if (data.status === 'success') {
          setLocation({
            city: data.city,
            region: data.regionName,
            country: data.country,
            latitude: data.lat,
            longitude: data.lon,
            ip: data.query,
          });
        } else {
          setError('Failed to get location');
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchLocation();
  }, []);

  return { location, loading, error };
};

export default useLocation;
