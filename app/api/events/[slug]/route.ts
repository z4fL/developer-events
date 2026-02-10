import { Event } from "@/database";
import connectToDatabase from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/events/[slug]
 * Fetches a single event by its slug
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
): Promise<NextResponse> {
  try {
    // Connect to database
    await connectToDatabase();

    // Validate slug parameter
    const { slug } = await params;
    if (!slug || typeof slug !== "string" || slug.trim().length === 0) {
      return NextResponse.json(
        { message: "Invalid or missing slug parameter" },
        { status: 400 },
      );
    }

    // Sanitize slug (lowercase, trim)
    const sanitizedSlug = slug.trim().toLowerCase();

    // Query event by slug
    const event = await Event.findOne({ slug: sanitizedSlug });

    // Handle event not found
    if (!event) {
      return NextResponse.json(
        { message: `Event with slug '${sanitizedSlug}' not found` },
        { status: 404 },
      );
    }

    // Return event data
    return NextResponse.json(
      { message: "Event fetched successfully", event },
      { status: 200 },
    );
  } catch (error) {
    // Log unexpected errors for debugging
    console.error("Error fetching event by slug:", error);

    // Return generic error response
    return NextResponse.json(
      {
        message: "Failed to fetch event",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
