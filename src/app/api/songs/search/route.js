import Song from "@/models/Song";

import { NextResponse } from "next/server";

export async function GET(request, { params }) {

  try {
    const songFound = await Song.findById(params.id);

    if (!songFound)
      return NextResponse.json(
        {
          message: "Song not found",
        },
        {
          status: 404,
        }
      );

    return NextResponse.json(songFound);
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
}