import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";

export default function EarthquakeMap({ data, loading, error }) {
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;
  const quakes = data || [];
  const [zoom, setZoom] = useState(2);

  useEffect(() => {
    if (window.innerWidth < 600)
      setZoom(0); // Most zoomed out for smallest screens
    else if (window.innerWidth < 960) setZoom(1);
    else if (window.innerWidth < 1020) setZoom(2);
    else if (window.innerWidth < 1375) setZoom(2);
    else setZoom(2); // Default for large screens
  }, []);

  return (
    <MapContainer
      className="map-view"
      center={[20, 0]}
      zoom={zoom}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {quakes.map((f) => {
        const [lon, lat] = f.geometry.coordinates; // [lon, lat, depth]
        const { mag, place, time, url } = f.properties;
        return (
          <CircleMarker
            key={f.id}
            center={[lat, lon]} // Leaflet expects [lat, lon]
            radius={Math.max(4, (mag || 0) * 3)} // scale radius
            pathOptions={{
              color: colorForMag(mag),
              fillOpacity: 0.7,
            }}
          >
            <Popup>
              <div>
                <strong>{place}</strong>
                <div>Magnitude: {mag}</div>
                <div>{new Date(time).toLocaleString()}</div>
                <a href={url} target="_blank" rel="noreferrer">
                  Details
                </a>
              </div>
            </Popup>
          </CircleMarker>
        );
      })}
    </MapContainer>
  );
}

function colorForMag(m) {
  if (m >= 6) return "#800026";
  if (m >= 5) return "#BD0026";
  if (m >= 4) return "#E31A1C";
  if (m >= 3) return "#FC4E2A";
  if (m >= 2) return "#FD8D3C";
  return "#FEB24C";
}
