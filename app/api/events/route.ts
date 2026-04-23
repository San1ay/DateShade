import { NextResponse } from "next/server";

// REMOVED: export const dynamic = 'force-static'; 
// We want this to be dynamic so it can read the URL params, 
// but the FETCH itself will be cached forever.

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const year = searchParams.get("year");
    const month = searchParams.get("month");

    // This check will now only fail if the client actually forgets to send params
    if (!year || !month) {
        return NextResponse.json({ error: "Missing year or month" }, { status: 400 });
    }

    const apiKey = process.env.GUARDIAN_API_KEY;

    // Ensure month is 2 digits for the Guardian API
    const formattedMonth = month.padStart(2, '0');
    const startDate = `${year}-${formattedMonth}-01`;

    // Calculate last day of the month
    const lastDay = new Date(Number(year), Number(month), 0).getDate();
    const endDate = `${year}-${formattedMonth}-${lastDay}`;

    try {
        const res = await fetch(
            `https://content.guardianapis.com/search?from-date=${startDate}&to-date=${endDate}&section=world&order-by=relevance&api-key=${apiKey}`,
            {
                // This ensures that once April 2024 is fetched, 
                // it is stored on the server disk forever.
                cache: 'force-cache',
            }
        );

        if (!res.ok) {
            throw new Error(`Guardian API error: ${res.status}`);
        }

        const data = await res.json();

        return NextResponse.json(data, {
            headers: {
                'Cache-Control': 'public, s-maxage=31536000, immutable',
            },
        });
    } catch (err) {
        console.error("Guardian Fetch Error:", err);
        return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 });
    }
}