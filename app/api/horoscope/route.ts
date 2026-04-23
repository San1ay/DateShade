import PREDICTIONS, { COLORS, ZODIAC_FACTS, ZODIAC_SYMBOLS } from "@/lib/horoscope";
import { NextResponse } from "next/server";

// 1. Emoji mapping for the signs
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

    if (!year || !month) {
        return NextResponse.json({ error: "Missing year or month" }, { status: 400 });
    }

    const allHoroscopes = Object.keys(ZODIAC_FACTS).map((sign) => {
        const seedString = `${sign}-${year}-${month}`;
        const uniqueHash = generateHash(seedString);

        // Calculate array indices
        const predictionIndex = uniqueHash % PREDICTIONS.length;

        // Grab the entire color object dynamically from the new array
        const colorObj = COLORS[uniqueHash % COLORS.length];

        const luckyNumber = (uniqueHash % 99) + 1;

        return {
            sign: sign,
            symbol: ZODIAC_SYMBOLS[sign],
            period: `${month}/${year}`,
            details: ZODIAC_FACTS[sign],
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


