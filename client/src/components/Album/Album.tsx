import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAlbum, Album } from "../../services/ApiFacade/AlbumApiFacade";
import "./Album.css";

export default function AlbumDetails() {
  const { id } = useParams();
  const [album, setAlbum] = useState<Album | null>(null);

  useEffect(() => {
    getAlbum(Number(id))
      .then(setAlbum)
      .catch(console.error);
  }, [id]);

  return (
    <div className="album-details">
      {album && (
        <div>
          <h2>{album.title}</h2>
          <p>
            <strong>Album ID:</strong> {album.id}
          </p>
          <p>
            <strong>Artist:</strong> {album.artist}
          </p>
          <p>
            <strong>Genre:</strong> {album.genre}
          </p>
          <p>
            <strong>Availability:</strong> {album.availability ? "Available" : "Unavailable"}
          </p>
        </div>
      )}
    </div>
  );
}
