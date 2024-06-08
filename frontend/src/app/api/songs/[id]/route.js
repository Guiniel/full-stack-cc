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
export async function PATCH(request, { params }) {
  const body = await request.json();
  dbConnect();

  try {
    const songUpdated = await Song.findByIdAndUpdate(params.id, body, {
      new: true,
    });

    if (!songUpdated)
      return NextResponse.json(
        {
          message: "Song not found",
        },
        {
          status: 404,
        }
      );

    return NextResponse.json(songUpdated);
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
}
export async function PUT(request, { params }) {
  const body = await request.json();
  

  try {
    const songUpdated = await Song.findByIdAndUpdate(params.id, body, {
      new: true,
    });

    if (!songUpdated)
      return NextResponse.json(
        {
          message: "Song not found",
        },
        {
          status: 404,
        }
      );

    return NextResponse.json(songUpdated);
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
}

export async function DELETE(request, { params }) {
  

  try {
    const songDeleted = await Song.findByIdAndDelete(params.id);

    if (!songDeleted)
      return NextResponse.json(
        {
          message: "Song not found",
        },
        {
          status: 404,
        }
      );

    return NextResponse.json(songDeleted);
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
}
