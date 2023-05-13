import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  return new NextResponse("RIAD-AZZ Instagram API V1.0.0");
}
