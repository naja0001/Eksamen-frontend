// src/components/ReservationForm.tsx
import React, { useState, useEffect } from "react";
import { getAlbums, Album } from "../../services/ApiFacade/AlbumApiFacade";
import { reserveAlbum } from "../../services/ApiFacade/ReservationApiFacade";
import "./ReservationForm.css";

const ReservationForm: React.FC = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [selectedAlbum, setSelectedAlbum] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    // Fetch albums for the dropdown
    getAlbums()
      .then((res) => setAlbums(res))
      .catch(() => setMessage("Error fetching albums. Is the server running?"));
  }, []);

  const handleReserve = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !selectedAlbum) {
      setMessage("Please fill in both fields.");
      return;
    }

    try {
      await reserveAlbum({ albumTitle: selectedAlbum, customerEmail: email });
      setMessage(`Successfully reserved "${selectedAlbum}" for ${email}`);
      setEmail("");
      setSelectedAlbum("");
    } catch (error) {
      setMessage("Error reserving album. Please try again.");
    }
  };

  return (
    <div className="reservation-form">
      <h3>Reserve an Album</h3>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleReserve}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="album">Album:</label>
          <select
            id="album"
            value={selectedAlbum}
            onChange={(e) => setSelectedAlbum(e.target.value)}
            required
          >
            <option value="" disabled>
              Select an album
            </option>
            {albums.map((album) => (
              <option key={album.id} value={album.title}>
                {album.title} - {album.artist}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Reserve</button>
      </form>
    </div>
  );
};

export default ReservationForm;
