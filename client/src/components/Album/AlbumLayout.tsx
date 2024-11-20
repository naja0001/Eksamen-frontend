import { useOutlet } from "react-router-dom";
import AlbumList from "./AlbumList";
import "./AlbumLayout.css";

export default function HotelLayout() {
  const outlet = useOutlet();

  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: 1, flexDirection: "column" }}>
        <AlbumList />
      </div>
      <div className="outlet-container">
        {outlet || <h3>Select a hotel to see details</h3>}
      </div>
    </div>
  );
}
