import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    // 1. Extract params - .get() returns null if not present
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

    // 2. Granular Future Date Check
    const now = new Date();
    const todayDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    // Construct a date object for the requested time (default to 1st of month if no day)
    const targetDate = new Date(
        requestedYear,
        requestedMonth ? requestedMonth - 1 : 0,
        requestedDay || 1
    );

    if (targetDate > todayDate) {
        return NextResponse.json({
            response: { status: "ok", total: 0, results: [] }
        });
    }

    // 3. Construct Guardian API Dates strictly
    const apiKey = process.env.GUARDIAN_API_KEY;
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