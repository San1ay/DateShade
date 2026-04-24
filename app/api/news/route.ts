import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    // 1. Extract params
    const year = searchParams.get("year");
    const month = searchParams.get("month");
    const day = searchParams.get("day");

    // Strict validation: Year is always required
    if (!year) {
        return NextResponse.json({ error: "Year is required" }, { status: 400 });
    }

    const requestedYear = Number(year);
    const requestedMonth = month ? Number(month) : null;
    const requestedDay = day ? Number(day) : null;

    // 2. Future Date Check
    const now = new Date();
    const todayDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const targetDate = new Date(
        requestedYear,
        requestedMonth ? requestedMonth - 1 : 0,
        requestedDay || 1
    );

    // 3. Construct empty response helper
    const emptyResponse = {
        response: { status: "ok", total: 0, results: [] }
    };

    // Return empty if it's a future date
    if (targetDate > todayDate) {
        return NextResponse.json(emptyResponse);
    }

    // 4. API Key Check
    const apiKey = process.env.GUARDIAN_API_KEY;
    if (!apiKey) {
        console.warn("GUARDIAN_API_KEY is missing in environment variables. Returning empty results.");
        return NextResponse.json(emptyResponse);
    }

    let startDate: string;
    let endDate: string;

    if (requestedYear && requestedMonth && requestedDay) {
        // EXACT DAY MODE
        const fMonth = month!.padStart(2, '0');
        const fDay = day!.padStart(2, '0');
        startDate = `${year}-${fMonth}-${fDay}`;
        endDate = startDate;
    } else if (requestedYear && requestedMonth) {
        // FULL MONTH MODE
        const fMonth = month!.padStart(2, '0');
        startDate = `${year}-${fMonth}-01`;
        const lastDay = new Date(requestedYear, requestedMonth, 0).getDate();
        endDate = `${year}-${fMonth}-${lastDay}`;
    } else {
        // FULL YEAR MODE
        startDate = `${year}-01-01`;
        endDate = `${year}-12-31`;
    }

    try {
        // Use 'force-cache' for historical data
        const res = await fetch(
            `https://content.guardianapis.com/search?from-date=${startDate}&to-date=${endDate}&section=world&order-by=relevance&api-key=${apiKey}`,
            { cache: 'force-cache' }
        );

        if (!res.ok) {
            // Log the error but return empty to keep the UI clean
            console.error(`Guardian API responded with ${res.status}`);
            return NextResponse.json(emptyResponse);
        }

        const data = await res.json();

        return NextResponse.json(data, {
            headers: {
                'Cache-Control': 'public, s-maxage=31536000, immutable',
            },
        });
    } catch (err) {
        console.error("Guardian Fetch Error:", err);
        // Fallback to empty response on network failure
        return NextResponse.json(emptyResponse);
    }
}