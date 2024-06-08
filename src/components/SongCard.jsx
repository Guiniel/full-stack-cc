import Link from "next/link";

export function SongCard({ song }) {
  return (
    <Link href={`/songs/${song._id}`}>
      <div className="bg-gray-800 m-2.5 p-10 text-white rounded-md hover:cursor-pointer hover:bg-gray-700">
        <h1 className="text-2xl font-bold">{song.name}</h1>
        <p className="text-slate-300"><span className="mr-1">Duration in segs:</span>{song.duration}</p>
        <p className="text-slate-300"><span className="mr-1">Artist:</span>{song.artist}</p>
        <p className="text-slate-300"><span className="mr-1">Genre:</span>{song.genre}</p>
        <p className="text-slate-400 my-2">
        </p>
      </div>
    </Link>
  );
}

export default SongCard;
