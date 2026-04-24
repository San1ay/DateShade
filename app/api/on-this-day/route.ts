import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const month = searchParams.get("month");
    const day = searchParams.get("day");

    // Strict validation
    if (!month || !day) {
        return NextResponse.json({ error: "Missing month or day" }, { status: 400 });
    }

    // Wikipedia requires 2-digit months and days (e.g., 04/09)
    const fMonth = month.padStart(2, '0');
    const fDay = day.padStart(2, '0');

    try {
        const res = await fetch(`https://en.wikipedia.org/api/rest_v1/feed/onthisday/events/${fMonth}/${fDay}`, {
            headers: {
                // Wikipedia politely requests a User-Agent identifying your app
                'User-Agent': 'ChronosApp/1.0 (your-email@example.com)'
            },
            // Historical facts don't change, so we can cache this aggressively
            cache: 'force-cache'
        });

        if (!res.ok) {
            throw new Error(`Wikipedia API error: ${res.status}`);
        }

        const data = await res.json();

        // Sort events from most recent year to oldest, and slice the top 10
        const sortedEvents = data.events
            .sort((a: any, b: any) => b.year - a.year)
            .slice(0, 10);

        return NextResponse.json({ events: sortedEvents }, {
            headers: {
                'Cache-Control': 'public, s-maxage=31536000, immutable',
            },
        });
    } catch (err) {
        console.error("Wikipedia Fetch Error:", err);
        return NextResponse.json({ error: "Failed to fetch historical events" }, { status: 500 });
    }
}