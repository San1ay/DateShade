"use client";

import { MONTHS } from "@/utils/constants";
import EventsSection from "./eventsSection";
import ZodiacSection from "./zodiacSection";

export default function MonthDetails({ year, month }: { year: number; month: number }) {
    const monthName = MONTHS[month - 1];

    return (
        <div style={{ padding: "1.5rem", border: "1px solid currentColor", borderRadius: "8px", opacity: 0.9 }}>
            <h2 style={{ fontWeight: 300, margin: "0 0 1.5rem 0", borderBottom: "1px solid currentColor", paddingBottom: "0.5rem" }}>
                {monthName} {year}
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>

                {/* Independent Zodiac Section */}
                <ZodiacSection year={year} month={month} />

                <hr style={{ border: "none", borderTop: "1px dashed rgba(0,0,0,0.1)", margin: 0 }} />

                {/* Independent Events Section */}
                <EventsSection year={year} month={month} />

            </div>
        </div>
    );
}