import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import React from "react";
import Layout from "./Layout";
import AlbumLayout from "./components/Album/AlbumLayout";
import Album from "./components/Album/Album";
import AlbumForm from "./components/Album/AlbumForm";
import "./App.css"


function App() {
  return (
    <Layout>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/albums" element={<AlbumLayout />}>
          <Route path=":id" element={<Album />} />
          <Route path=":id/edit" element={<AlbumForm />} /> 
        </Route>
        <Route path="/addAlbum" element={<AlbumForm />} />
      </Routes>
    </Layout>
  );
}

export default App;
