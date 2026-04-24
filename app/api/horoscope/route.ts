import PREDICTIONS, { COLORS, ZODIAC_FACTS, ZODIAC_SYMBOLS } from "@/lib/horoscope";
import { NextResponse } from "next/server";

// Helper function to create a deterministic hash
function generateHash(str: string) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash);
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    const year = searchParams.get("year");
    const month = searchParams.get("month");
    const day = searchParams.get("day");

    // Strict validation: Only Year is absolutely required now
    if (!year) {
        return NextResponse.json({ error: "Year is required" }, { status: 400 });
    }

    // Parse values strictly, falling back to null if missing
    const requestedYear = Number(year);
    const requestedMonth = month ? Number(month) : null;
    const requestedDay = day ? Number(day) : null;

    // Tracking sets to ensure uniqueness across the 12 signs in a single request
    const usedColors = new Set<string>();
    const usedNumbers = new Set<number>();

    const allHoroscopes = Object.keys(ZODIAC_FACTS).map((sign) => {
        // 1. Conditionally build the seed and period labels based on available data
        let timeSeed = `${requestedYear}`;
        let periodLabel = `${requestedYear}`;

        if (requestedYear && requestedMonth && requestedDay) {
            // EXACT DAY MODE
            timeSeed = `${requestedYear}-${requestedMonth}-${requestedDay}`;
            periodLabel = `${requestedYear}/${requestedMonth}/${requestedDay}`;
        } else if (requestedYear && requestedMonth) {
            // FULL MONTH MODE
            timeSeed = `${requestedYear}-${requestedMonth}`;
            periodLabel = `${requestedYear}/${requestedMonth}`;
        }

        // The seed string now exactly matches the resolution of the requested page
        const seedString = `${sign}-${timeSeed}`;
        const uniqueHash = generateHash(seedString);

        // 2. Predictions can be shared if needed
        const predictionIndex = uniqueHash % PREDICTIONS.length;

        // 3. Find a unique color
        let colorIndex = uniqueHash % COLORS.length;
        // If the color name is already in the Set, move to the next one until free
        while (usedColors.has(COLORS[colorIndex].name)) {
            colorIndex = (colorIndex + 1) % COLORS.length;
        }
        usedColors.add(COLORS[colorIndex].name);

        // 4. Find a unique lucky number (between 1 and 99)
        let luckyNumber = (uniqueHash % 99) + 1;
        // Increment until we find a free one
        while (usedNumbers.has(luckyNumber)) {
            luckyNumber += 1;
            if (luckyNumber > 99) luckyNumber = 1; // Wrap around
        }
        usedNumbers.add(luckyNumber);

        // 5. Assemble the data
        const colorObj = COLORS[colorIndex];

        return {
            sign: sign,
            symbol: ZODIAC_SYMBOLS[sign as keyof typeof ZODIAC_SYMBOLS], // Type safety for dictionary keys
            period: periodLabel,
            details: ZODIAC_FACTS[sign as keyof typeof ZODIAC_FACTS],
            monthly_horoscope: PREDICTIONS[predictionIndex],
            lucky_color_name: colorObj.name,
            lucky_color_hex: colorObj.hex,
            lucky_number: luckyNumber
        };
    });

    return NextResponse.json({ data: allHoroscopes }, {
        headers: { 'Cache-Control': 'public, s-maxage=31536000, immutable' }
    });
}