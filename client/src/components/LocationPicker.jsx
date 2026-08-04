import { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix default marker icon paths (broken by default with bundlers like Vite)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

function RecenterMap({ latitude, longitude }) {
  const map = useMap();
  map.setView([latitude, longitude], map.getZoom());
  return null;
}

export default function LocationPicker({ address, latitude, longitude, onLocationFound }) {
  const [searching, setSearching] = useState(false);
  const [locateError, setLocateError] = useState('');

  const handleLocate = async () => {
    if (!address || address.trim() === '') {
      setLocateError('Please enter an address first');
      return;
    }
    setSearching(true);
    setLocateError('');
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(
          address
        )}`
      );
      const data = await res.json();
      if (data.length === 0) {
        setLocateError('Location not found, try a more specific address');
        setSearching(false);
        return;
      }
      onLocationFound(parseFloat(data[0].lat), parseFloat(data[0].lon));
      setSearching(false);
    } catch (err) {
      setLocateError('Failed to fetch location, please try again');
      setSearching(false);
    }
  };

  return (
    <div className='flex flex-col gap-2'>
      <button
        type='button'
        disabled={searching}
        onClick={handleLocate}
        className='p-3 text-blue-700 border border-blue-700 rounded uppercase hover:shadow-lg disabled:opacity-80 w-full'
      >
        {searching ? 'Locating...' : 'Locate on Map'}
      </button>
      {locateError && <p className='text-red-700 text-sm'>{locateError}</p>}
      {latitude && longitude && (
        <div className='rounded-lg overflow-hidden border'>
          <MapContainer
            center={[latitude, longitude]}
            zoom={14}
            scrollWheelZoom={false}
            style={{ height: '200px', width: '100%' }}
          >
            <TileLayer
              attribution='&copy; OpenStreetMap contributors'
              url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            />
            <Marker position={[latitude, longitude]} />
            <RecenterMap latitude={latitude} longitude={longitude} />
          </MapContainer>
        </div>
      )}
    </div>
  );
}
