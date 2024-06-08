import Song from "@/models/Song";

import { NextResponse } from "next/server";

export async function GET() {
  
  const songs = await Song.find();
  return NextResponse.json(songs);
  
  // return NextResponse.json({message:"CANCIONES"});
}

export async function POST(request) {
  try {
    const body = await request.json();
    const newSong = new Song(body);
    const savedSong = await newSong.save();
    return NextResponse.json(savedSong);
    // return NextResponse.json({message:"POST CANCIONES"});
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
}
