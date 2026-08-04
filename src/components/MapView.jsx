import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import routes from "../data/map-routes.json";

const QODIRIY_BLUE = "#2563eb";
const MUSTAQILLIK_RED = "#dc2626";

function metroIcon(color) {
  return L.divIcon({
    className: "map-metro",
    html: `<span style="background:${color}">M</span>`,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  });
}

export default function MapView({ labels }) {
  const elRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) return;
    const map = L.map(elRef.current, { scrollWheelZoom: false });
    mapRef.current = map;

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    const logoIcon = L.icon({
      iconUrl: "/brand/icon-96.png",
      iconSize: [48, 48],
      iconAnchor: [24, 24],
      className: "map-logo",
    });
    L.marker(routes.center, { icon: logoIcon, zIndexOffset: 1000 })
      .addTo(map)
      .bindPopup(`<b>Smart Learning Centre</b><br>${labels.address}`);

    for (const [key, color] of [["qodiriy", QODIRIY_BLUE], ["mustaqillik", MUSTAQILLIK_RED]]) {
      const r = routes[key];
      L.polyline(r.coords, { color, weight: 5, opacity: 0.85, lineJoin: "round" })
        .addTo(map)
        .bindPopup(`<b>${labels[key]}</b><br>≈ ${r.dist} m · ${r.mins} ${labels.minWalk}`);
      L.marker(r.station, { icon: metroIcon(color) })
        .addTo(map)
        .bindPopup(`<b>${labels[key]}</b><br>≈ ${r.dist} m · ${r.mins} ${labels.minWalk}`);
    }

    map.fitBounds(L.latLngBounds([routes.center, routes.qodiriy.station, routes.mustaqillik.station]).pad(0.25));
  }, []);

  return <div className="location__leaflet" ref={elRef} />;
}
