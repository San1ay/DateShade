import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const year = searchParams.get("year");

    if (!year || isNaN(Number(year))) {
        return NextResponse.json({ error: "A valid year is required" }, { status: 400 });
    }

    try {
        // 1. Fetch Summary
        const summaryRes = await fetch(
            `https://en.wikipedia.org/api/rest_v1/page/summary/${year}`,
            {
                headers: {
                    "Accept": "application/json",
                    "User-Agent": "DateShade/1.0 (contact@yourdomain.com)"
                },
                // Set Next.js data cache to never expire (force-cache)
                cache: 'force-cache'
            }
        );
        const summaryData = await summaryRes.json();

        // 2. Fetch Full Extract
        const extractRes = await fetch(
            `https://en.wikipedia.org/w/api.php?action=query&titles=${year}&prop=extracts&explaintext=true&format=json&origin=*`,
            { cache: 'force-cache' }
        );
        const extractData = await extractRes.json();

        const pages = extractData?.query?.pages ?? {};
        const page: any = Object.values(pages)[0];
        const pageContent: string = typeof page?.extract === "string" ? page.extract : "";

        // 3. Process Content
        const lines = pageContent
            .split("\n")
            .map((l: string) => l.trim())
            .filter((l: string) => l.length > 20 && !l.startsWith("=="));

        const data = {
            summary: summaryData?.extract ?? "No summary available.",
            events: lines.slice(0, 10), // Increased slice slightly for better "forever" data
            births: lines.slice(10, 20),
            deaths: lines.slice(20, 30),
        };

        return NextResponse.json(data, {
            headers: {
                // public: accessible by anyone
                // s-maxage=31536000: Cache on CDN for 1 year (Standard "Forever" value)
                // immutable: Tells the browser the file will never change
                'Cache-Control': 'public, s-maxage=31536000, immutable'
            }
        });

    } catch (error) {
        console.error("Year Data Fetch Error:", error);
        return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
    }
}