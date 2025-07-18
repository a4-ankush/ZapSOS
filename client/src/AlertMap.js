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

const RecenterMap = ({ lat, lng }) => {
  const map = useMap();
  useEffect(() => {
    if (lat && lng) map.setView([lat, lng], 14);
  }, [lat, lng]);

  return null;
};

const AlertMap = ({ alerts, selectedAlert }) => {
  const latest = alerts.find(
    (alert) => alert.location?.latitude && alert.location?.longitude
  );

  const target =
    selectedAlert?.location?.latitude && selectedAlert?.location?.longitude
      ? selectedAlert
      : latest?.location?.latitude && latest?.location?.longitude
      ? latest
      : null;
  const targetPosition = target
    ? [target.location.latitude, target.location.longitude]
    : [26.9124, 75.7873]; // default

  return (
    <MapContainer
      center={targetPosition}
      zoom={14}
      style={{ height: "500px", width: "100%" }}
    >
      <RecenterMap lat={targetPosition[0]} lng={targetPosition[1]} />
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {alerts
        .filter(
          (alert) =>
            alert.status === "active" &&
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

      {selectedAlert &&
        selectedAlert.status === "resolved" &&
        selectedAlert.location &&
        selectedAlert.location.latitude &&
        selectedAlert.location.longitude && (
          <Marker
            key="selected-resolved"
            position={[
              selectedAlert.location.latitude,
              selectedAlert.location.longitude,
            ]}
            icon={L.divIcon({ className: "invisible-marker" })}
          >
            <Popup open={true}>
              <strong>{selectedAlert.user?.name || "Unknown user"}</strong>
              <br />
              {selectedAlert.message}
              <br />
              <em>Resolved</em>
            </Popup>
          </Marker>
        )}
    </MapContainer>
  );
};

export default AlertMap;
