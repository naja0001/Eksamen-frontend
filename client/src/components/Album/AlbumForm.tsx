import { useState, useEffect } from "react";
import { getAlbum, addUpdateAlbum, deleteAlbum, Album } from "../../services/ApiFacade/AlbumApiFacade";
import { useLocation, useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./AlbumForm.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const EMPTY_ALBUM: Album = {
  id: null,
  title: "",
  artist: "",
  genre: "",
  availability: false,
};

export default function AlbumForm() {
  const albumToEdit = useLocation().state || null;
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Album>(albumToEdit || EMPTY_ALBUM);

  useEffect(() => {
    if (albumToEdit && albumToEdit.id) {
      getAlbum(albumToEdit.id).then((album) => setFormData(album));
    }
  }, [albumToEdit]);

  const isEditMode = albumToEdit && albumToEdit.id;

  // Utility function to format genre
  function formatGenre(genre: string): string {
    return genre.charAt(0).toUpperCase() + genre.slice(1).toLowerCase();
  }

  // Update album details
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  // Delete album and navigate back
  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const confirmDelete = window.confirm("Are you sure you want to delete this album?");
    if (!confirmDelete) return;

    if (formData.id) {
      try {
        await deleteAlbum(Number(formData.id));
        setFormData({ ...EMPTY_ALBUM });
        alert("Album deleted successfully");
        navigate("/albums");
      } catch (error) {
        console.error("Error deleting album:", error);
        alert("Failed to delete the album.");
      }
    }
  };

  // Submit form data
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // Format the genre field before submitting
    const formattedData = {
      ...formData,
      genre: formatGenre(formData.genre),
    };

    try {
      await addUpdateAlbum(formattedData); // Use formattedData here
      alert(isEditMode ? "Album updated successfully" : "New album added successfully");
      navigate("/albums");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      <h2>{isEditMode ? "Edit Album" : "Add Album"}</h2>
      <form id="albumForm">
        {/* Album fields */}
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="artist">Artist:</label>
          <input type="text" id="artist" name="artist" value={formData.artist} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="genre">Genre:</label>
          <select
            id="genre"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            required>
            <option value="">Select Genre</option>
            <option value="ROCK">Rock</option>
            <option value="POP">Pop</option>
            <option value="JAZZ">Jazz</option>
            <option value="CLASSICAL">Classical</option>
            <option value="GRUNGE">Grunge</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="availability">Available:</label>
          <input
            type="checkbox"
            id="availability"
            name="availability"
            checked={formData.availability}
            onChange={handleChange}
          />
        </div>
      </form>
      <button type="submit" onClick={handleSubmit} className="album-form-btn">
        Submit
      </button>
      {formData.id && (
        <button className="album-form-btn delete-btn" onClick={handleDelete}>
          <FontAwesomeIcon icon={faTrashAlt} /> Delete Album
        </button>
      )}
    </>
  );
}
