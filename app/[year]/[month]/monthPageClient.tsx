"use client";

import { useRouter } from "next/navigation";
import MonthGrid from "@/components/monthGrid";
import ZodiacSection from "@/components/zodiacSection";
import EventsSection from "@/components/eventsSection";
import { MONTHS } from "@/utils/constants";
import HomeButton from "@/components/homeButton";

function monthLabel(year: number, month: number, today: Date) {
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;
    const diffMonths = (year - currentYear) * 12 + (month - currentMonth);

    if (diffMonths === 0) return "— this month";
    if (diffMonths === 1) return "— next month"
    if (diffMonths === -1) return "— last month";
    if (diffMonths === 12) return "— next year";
    if (diffMonths === -12) return "— last year";

    const isFuture = diffMonths > 0;
    const absDiff = Math.abs(diffMonths);
    const yDiff = Math.floor(absDiff / 12);
    const mDiff = absDiff % 12;

    const parts = [];
    if (yDiff > 0) parts.push(`${yDiff} year${yDiff > 1 ? "s" : ""}`);
    if (mDiff > 0) parts.push(`${mDiff} month${mDiff > 1 ? "s" : ""}`);

    const timeString = parts.join(" and ");
    return isFuture ? `— ${timeString} from now` : `— ${timeString} ago`;
}

export default function MonthPageClient({ year, month }: { year: number; month: number }) {
    const router = useRouter();
    const today = new Date();
    const years = Array.from({ length: 51 }, (_, i) => 2000 + i);

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
                /* 1. Mobile (Default): All 3 on different lines */
                .header-wrapper {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    margin-bottom: 2rem;
                    border-bottom: 1px solid rgba(0,0,0,0.05);
                    padding-bottom: 1.5rem;
                }
                .left-group {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }
                .relative-label {
                    font-size: 0.65rem;
                    letter-spacing: 0.2em;
                    text-transform: uppercase;
                    opacity: 0.5;
                    padding-left: 2.5rem; /* Indent under the Home icon */
                }
                .jump-group {
                    display: flex;
                    gap: 1rem;
                    align-items: center;
                }

                /* 2. Medium Screen: Home+Year/Month+Label on one line, Jump to on another */
                @media (min-width: 640px) {
                    .left-group {
                        flex-direction: row;
                        align-items: baseline;
                        gap: 1rem;
                    }
                    .relative-label {
                        padding-left: 0;
                    }
                }

                /* 3. Large Screen: Everything on one single line */
                @media (min-width: 1024px) {
                    .header-wrapper {
                        flex-direction: row;
                        justify-content: space-between;
                        align-items: center;
                        margin-bottom: 4rem;
                    }
                }

                /* Layout Grid */
                .month-layout-grid {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 3rem;
                }
                @media (min-width: 768px) {
                    .month-layout-grid {
                        grid-template-columns: 1fr 2.5fr; 
                        align-items: start;
                    }
                }
            `}</style>

            <header className="header-wrapper">
                <div className="left-group">
                    <div className="nav-row" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <HomeButton />
                        <h1 style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            fontSize: "1.5rem",
                            fontWeight: 300,
                            letterSpacing: "0.15em",
                            opacity: 0.9,
                            margin: 0,
                            whiteSpace: "nowrap"
                        }}>
                            <button onClick={() => navigateMonth(-1)} style={{ background: "transparent", border: "none", cursor: "pointer", opacity: 0.4, fontSize: "0.8em" }}>&lt;</button>
                            <span style={{ borderBottom: "1px dashed rgba(0,0,0,0.2)", cursor: "pointer" }} onClick={() => router.push(`/${year}`)}>{year}</span>
                            <span style={{ opacity: 0.3 }}>/</span>
                            <span>{MONTHS[month - 1]}</span>
                            <button onClick={() => navigateMonth(1)} style={{ background: "transparent", border: "none", cursor: "pointer", opacity: 0.4, fontSize: "0.8em" }}>&gt;</button>
                        </h1>
                    </div>

                    <span className="relative-label">
                        {monthLabel(year, month, today)}
                    </span>
                </div>

                <div className="jump-group">
                    <span style={{ fontSize: "0.6rem", opacity: 0.4, letterSpacing: "0.1em" }}>JUMP TO</span>
                    <select value={year} onChange={(e) => handleJump(parseInt(e.target.value), month)} style={selectStyle}>
                        {years.map(y => <option key={y} value={y}>{y}</option>)}
                    </select>
                    <select value={month} onChange={(e) => handleJump(year, parseInt(e.target.value))} style={selectStyle}>
                        {MONTHS.map((m, i) => <option key={m} value={i + 1}>{m}</option>)}
                    </select>
                </div>
            </header>

            <div className="month-layout-grid">
                <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
                    <MonthGrid year={year} month={month} monthName={MONTHS[month - 1]} />
                    <EventsSection year={year} month={month} />
                </div>

                <div>
                    <ZodiacSection year={year} month={month} />
                </div>
            </div>
        </div>
    );
}