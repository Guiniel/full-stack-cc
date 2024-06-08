import Task from "@/models/Song";

import { NextResponse } from "next/server";

export async function GET(request, { params }) {

  try {
    const taskFound = await Task.findById(params.id);

    if (!taskFound)
      return NextResponse.json(
        {
          message: "Task not found",
        },
        {
          status: 404,
        }
      );

    return NextResponse.json(taskFound);
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
}

export async function PUT(request, { params }) {
  const body = await request.json();


  try {
    const taskUpdated = await Task.findByIdAndUpdate(params.id, body, {
      new: true,
    });

    if (!taskUpdated)
      return NextResponse.json(
        {
          message: "Task not found",
        },
        {
          status: 404,
        }
      );

    return NextResponse.json(taskUpdated);
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
}

export async function DELETE(request, { params }) {

  try {
    const taskDeleted = await Task.findByIdAndDelete(params.id);

    if (!taskDeleted)
      return NextResponse.json(
        {
          message: "Task not found",
        },
        {
          status: 404,
        }
      );

    return NextResponse.json(taskDeleted);
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
}
