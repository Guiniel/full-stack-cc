"use client";
import { useState, useEffect } from "react"; 
import { useRouter, useParams } from "next/navigation";
import dotenv from 'dotenv';
dotenv.config();
const NewSong = () => { 
  const [newSong, setNewSong] = useState({ 
  name: "", 
  artist: "", 
  genre: "",
  duration: "", 
});
const params = useParams(); 
const router = useRouter();
const url_backend = process.env.NEXT_PUBLIC_BACKEND_URL;
const [isSubmitting, setIsSubmitting] = useState(false); 
const [errors, setErrors] = useState({});

const getSong = async () => { 
  try {
  const res = await fetch(`${url_backend}/song/${params.id}`,
  { method: "GET",
  headers: { "Content-Type": "application/json", }, }
  );
  const data = await res.json(); 
  setNewSong({
    name: data.name,
    artist: data.artist,
    genre: data.genre,
    duration: data.duration }
  );} catch (error) {
    console.error(error);
    // Aquí puedes manejar el error como prefieras
  }
};

useEffect(() => {
   if (params.id)
     { getSong(); }
  }, []);

const handleSubmit = async (e) => { 
  e.preventDefault(); 
  let errs = validate();
  if (Object.keys(errs).length) return setErrors(errs);

  setIsSubmitting(true);
  if (params.id) {
    await updateSong();
  } else {
    await createSong();
  }
  
  router.push("/");
};

const handleChange = (e) => setNewSong({ ...newSong, [e.target.name]: e.target.value });

const validate = () => { let errors = {};

    if (!newSong.name) {
      errors.name = "Name is required";
    }
    if (!newSong.artist) {
      errors.artist = "Artist is required";
    }
    if (!newSong.genre) {
      errors.genre = "Genre is required";
    }
    if (!newSong.duration) {
      errors.duration = "Duration is required";
    }

    return errors;
  };

  const createSong = async () => { 
  try { 
    const result= await fetch(url_backend+"/song",
    { method: "POST",
      headers: { "Content-Type": "application/json", }, 
      body: JSON.stringify(newSong), 
    });
    router.push("/");
    router.refresh();
  } catch (error)
   { console.error(error); }
  };

  const handleDelete = async () => { 
    if (window.confirm("Are you sure you want to delete this song?"))
    { 
      try { 
        const res = await fetch(`${url_backend}/song/${params.id}`,
        { method: "DELETE",});
        router.push("/");
        router.refresh(); 
      } 
      catch (error) 
      { console.error(error);} 
    }
  };
  const updateSong = async () => { 
    try {
      await fetch(`${url_backend}/song/${params.id}`,
      { 
        method: "PATCH",
        headers: { 
          "Content-Type": "application/json",
        }, 
        body: JSON.stringify(newSong),
      });
      connsole.log(JSON.stringify(newSong));
      router.push("/");
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-[calc(100vh-7rem)] flex justify-center items-center">
      <form onSubmit={handleSubmit}>
        <header className="flex justify-between">
          <h1 className="font-bold text-3xl">
            {!params.id ? "Create Song" : "Update Song"}
          </h1>
          {params.id && (
            <button
              className="bg-red-500 px-3 py-1 rounded-md"
              onClick={handleDelete}
            >
              Delete
            </button>
          )}
        </header>
        <input
          type="text"
          placeholder="Song name"
          name="name"
          onChange={handleChange}
          value={newSong.name}
          autoFocus
          className="bg-gray-800 border-2 w-full p-4 rounded-lg my-4"
        />

        <input
          type="text"
          placeholder="Artist"
          name="artist"
          onChange={handleChange}
          value={newSong.artist}
          className="bg-gray-800 border-2 w-full p-4 rounded-lg my-4"
        />

        <input
          type="text"
          placeholder="Genre"
          name="genre"
          onChange={handleChange}
          value={newSong.genre}
          className="bg-gray-800 border-2 w-full p-4 rounded-lg my-4"
        />

        <input
          type="number"
          placeholder="Duration in seconds"
          name="duration"
          onChange={handleChange}
          value={newSong.duration}
          className="bg-gray-800 border-2 w-full p-4 rounded-lg my-4"
        />

        <button className="bg-green-600 text-white font-semibold px-8 py-2 rounded-lg">
          {params.id ? "Update" : "Save"}
        </button>
      </form>
    </div>
  );
};

export default NewSong;