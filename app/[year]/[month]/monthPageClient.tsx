"use client";

import { useRouter } from "next/navigation";
import MonthGrid from "@/components/monthGrid";
import ZodiacSection from "@/components/zodiacSection";
import EventsSection from "@/components/eventsSection";
import { MONTHS } from "@/utils/constants";

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
    const years = Array.from({ length: 21 }, (_, i) => 2020 + i);

    const navigateMonth = (delta: number) => {
        let newMonth = month + delta;
        let newYear = year;
        if (newMonth > 12) { newMonth = 1; newYear += 1; }
        else if (newMonth < 1) { newMonth = 12; newYear -= 1; }
        router.push(`/${newYear}/${newMonth}`);
    };

    const handleJump = (y: number, m: number) => router.push(`/${y}/${m}`);

    const selectStyle: React.CSSProperties = {
        appearance: "none",
        WebkitAppearance: "none",
        background: "transparent",
        border: "none",
        borderBottom: "1px solid rgba(0,0,0,0.1)",
        fontFamily: "inherit",
        fontSize: "0.7rem",
        textTransform: "uppercase",
        letterSpacing: "0.1em",
        cursor: "pointer",
        outline: "none",
        opacity: 0.6,
        padding: "0 4px",
    };

    return (
        <div style={{ minHeight: "100dvh", padding: "1rem", fontFamily: "Georgia, serif" }}>
            <style>{`
                .month-layout-grid {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 3rem;
                }
                .jump-select:hover {
                    opacity: 1 !important;
                    border-bottom-color: rgba(0,0,0,0.4) !important;
                }
                @media (min-width: 768px) {
                    .month-layout-grid {
                        grid-template-columns: 1fr 2.5fr; 
                        align-items: start;
                    }
                }
            `}</style>

            {/* Top Navigation Bar: Split Left and Right */}
            <header style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "4rem",
                borderBottom: "1px solid rgba(0,0,0,0.05)",
                paddingBottom: "1.5rem"
            }}>

                {/* Left Side: Title and Relative Label */}
                <div style={{ display: "flex", alignItems: "baseline", gap: "1rem" }}>
                    <h1 style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.25rem",
                        fontSize: "1.5rem",
                        fontWeight: 300,
                        letterSpacing: "0.2em",
                        opacity: 0.9,
                        margin: 0,
                        whiteSpace: "nowrap"
                    }}>
                        <button onClick={() => navigateMonth(-1)} style={{ background: "transparent", border: "none", cursor: "pointer", opacity: 0.6, fontSize: "inherit" }}>&lt;</button>
                        <span style={{ borderBottom: "1px dashed currentColor", cursor: "pointer" }} onClick={() => router.push(`/${year}`)}>{year}</span>
                        <span> — {MONTHS[month - 1]}</span>
                        <button onClick={() => navigateMonth(1)} style={{ background: "transparent", border: "none", cursor: "pointer", opacity: 0.6, fontSize: "inherit" }}>&gt;</button>
                    </h1>

                    <span style={{
                        fontSize: "0.65rem",
                        letterSpacing: "0.3em",
                        textTransform: "uppercase",
                        opacity: 0.5,
                        whiteSpace: "nowrap"
                    }}>
                        {monthLabel(year, month, today)}
                    </span>
                </div>

                {/* Right Side: Jump To Selectors */}
                <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                    <span style={{ fontSize: "0.6rem", opacity: 0.4, letterSpacing: "0.1em" }}>JUMP TO</span>

                    <select className="jump-select" value={year} onChange={(e) => handleJump(parseInt(e.target.value), month)} style={selectStyle}>
                        {years.map(y => <option key={y} value={y}>{y}</option>)}
                    </select>
                    <select className="jump-select" value={month} onChange={(e) => handleJump(year, parseInt(e.target.value))} style={selectStyle}>
                        {MONTHS.map((m, i) => <option key={m} value={i + 1}>{m}</option>)}
                    </select>
                </div>
            </header>

            {/* Main Content Grid */}
            <div className="month-layout-grid">
                {/* Sidebar Column */}
                <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
                    <MonthGrid year={year} month={month} monthName={MONTHS[month - 1]} today={today} />
                    <EventsSection year={year} month={month} />
                </div>

                {/* Content Column */}
                <div>
                    <ZodiacSection year={year} month={month} />
                </div>
            </div>
        </div>
    );
}