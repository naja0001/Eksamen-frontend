import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAlbums, Album } from "../../services/ApiFacade/AlbumApiFacade";
import "./albumList.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function AlbumList() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchAlbums();
  }, []);

  const fetchAlbums = () => {
    getAlbums()
      .then((res) => setAlbums(res))
      .catch(() => setError("Error fetching albums, is the server running?"));
  };

  return (
    <div>
      <h3>Albums</h3>
      {error && <p className="error-message">{error}</p>}
      <table className="album-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Artist</th>
            <th>Genre</th>
            <th>Availability</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {albums.map((album) => (
            <tr
              key={album.id}
              onClick={() => navigate(`${album.id}`)}
              style={{ cursor: "pointer" }}
            >
              <td>{album.id}</td>
              <td>{album.title}</td>
              <td>{album.artist}</td>
              <td>{album.genre}</td>
              <td>{album.availability ? "Available" : "Unavailable"}</td>
              <td onClick={(e) => e.stopPropagation()}> {/* Prevents row click from triggering edit/delete */}
                <div className="icon-container">
                  <Link className="edit-btn" to={`${album.id}/edit`} state={album}>
                    <i className="fas fa-edit"></i>
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
