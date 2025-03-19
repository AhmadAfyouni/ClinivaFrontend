import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  //   useMap,
} from "react-leaflet";
import { useState, useCallback } from "react";
import "leaflet/dist/leaflet.css";
import { Icon, LeafletMouseEvent } from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { Button, Flex } from "@mantine/core";
import { IconCurrentLocation } from "@tabler/icons-react";

interface LocationPickerProps {
  onChange: (location: { x: number; y: number }) => void;
  initialPosition?: { x: number; y: number };
}

const defaultIcon = new Icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function LocationMarker({
  position,
  onChange,
}: {
  position: [number, number] | null;
  onChange: (location: { x: number; y: number }) => void;
}) {
  useMapEvents({
    click(e: LeafletMouseEvent) {
      const { lat, lng } = e.latlng;
      onChange({ x: lat, y: lng });
    },
  });

  return position ? <Marker position={position} icon={defaultIcon} /> : null;
}

export default function LocationPicker({
  onChange,
  initialPosition,
}: LocationPickerProps) {
  const [position, setPosition] = useState<[number, number] | null>(
    initialPosition ? [initialPosition.x, initialPosition.y] : null
  );

  const handleGetCurrentLocation = useCallback(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setPosition([latitude, longitude]);
          onChange({ x: latitude, y: longitude });
        },
        (error) => {
          console.error("Error getting location:", error);
          alert(
            "Unable to get your location. Please check your browser permissions."
          );
        }
      );
    } else {
      alert("Geolocation is not supported by your browser");
    }
  }, [onChange]);

  const handleMapClick = useCallback(
    (location: { x: number; y: number }) => {
      setPosition([location.x, location.y]);
      onChange(location);
    },
    [onChange]
  );

  const center: [number, number] = position || [0, 0];

  return (
    <>
      <Flex justify="flex-end" mb="sm">
        <Button
          leftSection={<IconCurrentLocation size={16} />}
          onClick={handleGetCurrentLocation}
          variant="light"
          color="blue"
          size="sm"
        >
          Get Current Location
        </Button>
      </Flex>
      <MapContainer
        center={center}
        zoom={position ? 13 : 2}
        style={{ height: "300px", width: "100%", marginBottom: "1rem" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <LocationMarker position={position} onChange={handleMapClick} />
      </MapContainer>
    </>
  );
}
