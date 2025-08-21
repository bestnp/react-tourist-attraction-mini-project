import { useState, useEffect } from 'react';
import TripCard from './TripCard';

function TravelCardList({ searchTerm, onAddTag }) {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrips(searchTerm);
  }, [searchTerm]);

  const fetchTrips = async (keywords = '') => {
    try {
      setLoading(true);
      const url = `http://localhost:4001/trips?keywords=${encodeURIComponent(keywords || '')}`;
      const response = await fetch(url);
      const data = await response.json();
      setTrips(data.data || []);
    } catch (error) {
      console.error('Error fetching trips:', error);
      setTrips([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">กำลังโหลดข้อมูล...</div>;
  }

  return (
    <div className="travel-cards-container">
      {trips.map((trip) => (
        <TripCard key={trip.eid} trip={trip} onAddTag={onAddTag} />
      ))}
    </div>
  );
}

export default TravelCardList;