import React, { useEffect } from "react";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const RecenterMap = ({ lat, long }) => {
  const map = useMap();
  useEffect(() => {
    if (lat && long) map.setView([lat, long], 14);
  }, [lat, long]);

  return null;
};

const AlertMap = ({ alerts }) => {
  const latest = alerts.find(
    (alert) => alert.location?.latitude && alert.location?.longitude
  );
  const latestPosition = latest
    ? [latest.location.latitude, latest.location.longitude]
    : [26.9124, 75.7873]; // default

  return (
    <MapContainer
      center={latestPosition}
      zoom={14}
      style={{ height: "500px", width: "100%" }}
    >
      <RecenterMap lat={latestPosition[0]} long={latestPosition[1]} />
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {alerts
        .filter(
          (alert) =>
            alert.location &&
            alert.location.latitude &&
            alert.location.longitude
        )
        .map((alert) => (
          <Marker
            key={alert.alertId}
            position={[alert.location.latitude, alert.location.longitude]}
          >
            <Popup>
              <strong>{alert.user?.name || "Unknown user"}</strong>
              <br />
              {alert.message}
            </Popup>
          </Marker>
        ))}
    </MapContainer>
  );
};

export default AlertMap;
