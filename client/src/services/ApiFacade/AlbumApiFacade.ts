import { API_URL } from "../../settings";
import { makeOptions, handleHttpErrors } from "../fetchUtils";

const ALBUMS_URL = API_URL + "/albums";

export interface Album {
  id: number | null;
  title: string;
  artist: string;
  genre: string; 
  availability: boolean;
}


let albums: Array<Album> = [];

export async function getAlbums(): Promise<Array<Album>> {
  if (albums.length > 0) return [...albums];
  const res = await fetch(ALBUMS_URL).then(handleHttpErrors);
  albums = [...res];
  return albums;
}

export async function getAlbum(id: number): Promise<Album> {
  return fetch(`${ALBUMS_URL}/${id}`).then(handleHttpErrors);
}

export async function addUpdateAlbum(newAlbum: Album): Promise<Album> {
  const method = newAlbum.id ? "PUT" : "POST";
  const options = makeOptions(method, newAlbum);
  const URL = newAlbum.id ? `${ALBUMS_URL}/${newAlbum.id}` : ALBUMS_URL;
  return fetch(URL, options).then(handleHttpErrors);
}

export async function deleteAlbum(id: number): Promise<void> {
  const options = makeOptions("DELETE", null);
  return fetch(`${ALBUMS_URL}/${id}`, options).then(handleHttpErrors);
}


