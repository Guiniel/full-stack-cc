"use client";
import React, { useEffect, useState } from 'react';
import SongCard from "@/components/SongCard";
import dotenv from 'dotenv';
dotenv.config();
export default function HomePage() {
  const [songs, setSongs] = useState([]);
  
  useEffect(() => {
    const fetchSongs = async () => {
      try {

        const res = await fetch(`${process.env.BACKEND_URL}/song`);

        const { songData } = await res.json(); // Aquí es donde se hace el cambio
        if (Array.isArray(songData)) {
          setSongs(songData);
        } else {
          console.error("songData fetched is not an array:", songData);
        }
      } catch (error) {
        console.error("Error fetching songs:", error);
      }
    };

    fetchSongs();
  }, []);

  return (
    <div>
      <h1 className="text-4xl font-bold text-center my-10">Escoge una canción para mas detalles</h1>
      <div className="grid md:grid-cols-3 gap-2">
      {songs.map((song) => (
        <SongCard song={song} key={song._id} />
      ))}
    </div>
    </div>

  );
}