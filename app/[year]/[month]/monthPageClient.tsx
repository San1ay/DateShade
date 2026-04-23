"use client";

import { useRouter } from "next/navigation";
import MonthGrid from "@/components/monthGrid";
import MonthDetails from "@/components/monthDetails"; // Import the new details component
import { MONTHS } from "@/utils/constants";

// Helper to format exact Years and Months difference
function monthLabel(year: number, month: number, today: Date) {
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;

    const diffMonths = (year - currentYear) * 12 + (month - currentMonth);

    if (diffMonths === 0) return "— this month";

    const isFuture = diffMonths > 0;
    const absDiff = Math.abs(diffMonths);

    const yDiff = Math.floor(absDiff / 12);
    const mDiff = absDiff % 12;

    const parts = [];
    if (yDiff > 0) parts.push(`${yDiff} year${yDiff > 1 ? "s" : ""}`);
    if (mDiff > 0) parts.push(`${mDiff} month${mDiff > 1 ? "s" : ""}`);

    const timeString = parts.join(" ");

    return isFuture ? `— ${timeString} from now` : `— ${timeString} ago`;
}

export default function MonthPageClient({ year, month }: { year: number; month: number }) {
    const router = useRouter();
    const today = new Date();

    const navigateMonth = (delta: number) => {
        let newMonth = month + delta;
        let newYear = year;

        if (newMonth > 12) {
            newMonth = 1;
            newYear += 1;
        } else if (newMonth < 1) {
            newMonth = 12;
            newYear -= 1;
        }

        router.push(`/${newYear}/${newMonth}`);
    };

    const buttonStyle = {
        background: "transparent",
        border: "none",
        cursor: "pointer",
        fontFamily: "inherit",
        fontSize: "inherit",
        opacity: 0.6,
        padding: "0 0.5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    };

    return (
        <div style={{ minHeight: "100dvh", padding: "1rem", fontFamily: "Georgia, serif" }}>

            {/* CSS Grid for the 1/3 and 2/3 layout */}
            <style>{`
                .month-layout-grid {
                    display: grid;
                    grid-template-columns: 1fr; /* Stacks on mobile */
                    gap: 2rem;
                }
                @media (min-width: 768px) {
                    .month-layout-grid {
                        grid-template-columns: 1fr 2fr; /* 1/3 and 2/3 split on larger screens */
                        align-items: start;
                    }
                }
            `}</style>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "4rem" }}>

                {/* Header with Navigation and Relative Time Label */}
                <h1 style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.25rem",
                    fontSize: "1.5rem",
                    fontWeight: 300,
                    letterSpacing: "0.2em",
                    opacity: 0.9,
                    margin: 0
                }}>
                    <button
                        onClick={() => navigateMonth(-1)}
                        style={buttonStyle}
                        aria-label="Previous Month"
                    >
                        &lt;
                    </button>

                    <span
                        style={{ borderBottom: "1px dashed currentColor", margin: "0 0.25rem", cursor: "pointer" }}
                        onClick={() => router.push(`/${year}`)}
                        title={`Back to ${year} Overview`}
                    >
                        {year} — {MONTHS[month - 1]}
                    </span>

                    <button
                        onClick={() => navigateMonth(1)}
                        style={buttonStyle}
                        aria-label="Next Month"
                    >
                        &gt;
                    </button>

                    <span style={{ fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", opacity: 0.5, marginLeft: "0.5rem" }}>
                        {monthLabel(year, month, today)}
                    </span>
                </h1>
            </div>

            {/* Split Content Area */}
            <div className="month-layout-grid">

                {/* Left Side: 1/3 Calendar Grid */}
                <div>
                    <MonthGrid
                        year={year}
                        month={month}
                        monthName={MONTHS[month - 1]}
                        today={today}
                    />
                </div>

                {/* Right Side: 2/3 Details Section */}
                <div>
                    <MonthDetails year={year} month={month} />
                </div>

            </div>
        </div>
    );
}