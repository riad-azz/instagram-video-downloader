import { NextResponse } from "next/server";

export async function GET(request: Request) {
  return new NextResponse("RIAD-AZZ Instagram API V1.0.0");
}
