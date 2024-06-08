"use client";
import { useState } from "react"; 
import SongCard from "@/components/SongCard"; // Asegúrate de importar el componente SongCard
import dotenv from 'dotenv';
const Busqueda = () => { 
  dotenv.config();
  const [searchTerm, setSearchTerm] = useState(""); 
  const [songs, setSongs] = useState([]);
  const url_backend = process.env.NEXT_PUBLIC_BACKEND_URL;
  const handleSubmit = async (e) => { 
    e.preventDefault(); 
    try {
      const res = await fetch(`${url_backend}/song/search/${searchTerm}`);
      const data = await res.json(); 
      if (Array.isArray(data)) { 
        setSongs(data);
      } else {
        console.error("Data fetched is not an array:", data);
      }
    } catch (error) {
      console.error(error);
        // Aquí puedes manejar el error como prefieras
    }
  };

  const handleChange = (e) => setSearchTerm(e.target.value);

  return (
    <div className="min-h-[calc(100vh-7rem)] flex flex-col justify-center items-center">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <header className="flex justify-between">
            <h1 className="font-bold text-3xl">
              Buscar nombre de la canción
            </h1>
          </header>
          <input
            type="text"
            placeholder="Nombre de la canción"
            name="search"
            onChange={handleChange}
            value={searchTerm}
            autoFocus
            className="bg-gray-800 border-2 w-full p-4 rounded-lg my-4"
          />
          <button className="bg-green-600 text-white font-semibold px-8 py-2 rounded-lg">
            Buscar
          </button>
        </form>
      </div>
      <div className="songs-container flex flex-wrap justify-center mr-10 ml-10 w-3/4 w-auto">
      {songs.map((song) => (
          <div className="w-full/3 p-4">
            <SongCard song={song} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Busqueda;