import React, { Suspense } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useLoaderData } from "react-router";

function Coverage() {
  const serviceCenters = useLoaderData();
  const position = [23.8103, 90.4125];
  const mapRef = React.useRef();

  const handleSearch = (event) => {
    event.preventDefault();
    const location = event.target.location.value.toLowerCase();
    //const district = serviceCenters.find(center => center.district.toLowerCase() === location);
    const district = serviceCenters.find((center) =>
      center.district.toLowerCase().includes(location.toLowerCase()),
    );
    if (district) {
      const coord = [district.latitude, district.longitude];
      // mapRef.current.setView(coord, 12);
      mapRef.current.flyTo(coord, 13);
    }
  };

  return (
    <div>
      <h1>Coverage Page</h1>
      <p>This is the coverage page content.</p>
      <div>
        <form onSubmit={handleSearch} className="search-form">
          <label className="input">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input
              type="search"
              name="location"
              required
              placeholder="Search"
            />
          </label>
        </form>
      </div>

      <div>
        <MapContainer
          center={position}
          zoom={7}
          scrollWheelZoom={false}
          style={{ height: "600px", width: "100%" }}
          ref={mapRef}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Suspense fallback={<div>Loading markers...</div>}>
            {serviceCenters.map((center, idx) => (
              <Marker key={idx} position={[center.latitude, center.longitude]}>
                <Popup>{center.district}</Popup>
              </Marker>
            ))}
          </Suspense>
        </MapContainer>
      </div>
    </div>
  );
}
export default Coverage;
