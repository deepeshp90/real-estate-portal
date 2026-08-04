import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

export default function ListingMap({ latitude, longitude, name, address }) {
  if (!latitude || !longitude) return null;

  return (
    <div className='flex flex-col gap-2'>
      <p className='font-semibold text-black'>Location</p>
      <div className='rounded-lg overflow-hidden border'>
        <MapContainer
          center={[latitude, longitude]}
          zoom={14}
          scrollWheelZoom={false}
          style={{ height: '300px', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
          <Marker position={[latitude, longitude]}>
            <Popup>
              {name}
              <br />
              {address}
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}
