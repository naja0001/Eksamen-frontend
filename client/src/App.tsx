import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import React from "react";
import Layout from "./Layout";
import Login from "./security/Login";
import Logout from "./security/Logout";
import AlbumLayout from "./components/Album/AlbumLayout";
import Album from "./components/Album/Album";
import AlbumForm from "./components/Album/AlbumForm";
import "./App.css";
import RequireAuth from "./security/RequireAuth";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/albums" element={<AlbumLayout />}>
          <Route path=":id" element={<Album />} />
          <Route path=":id/edit" element={<RequireAuth><AlbumForm /></RequireAuth>} />
        </Route>
        <Route path="/addAlbum" element={<RequireAuth><AlbumForm /></RequireAuth>} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Layout>
  );
}

export default App;
