"use client";

import { useRouter } from "next/navigation";
import { format, intervalToDuration, formatDuration, addDays, subDays, isSameDay } from "date-fns";
import { MONTHS } from "@/utils/constants";
import EventsSection from "@/components/eventsSection";
import ZodiacSection from "@/components/zodiacSection";
import OnThisDaySection from "@/components/onThisDaySection";
import HomeButton from "@/components/homeButton";

// Helper to format: "Friday, Yesterday" or "Saturday, 2 years ago"
function formatRelativeDateLabel(year: number, month: number, day: number) {
    const targetDate = new Date(year, month - 1, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    targetDate.setHours(0, 0, 0, 0);

    const dayName = format(targetDate, "EEEE");

    // 1. Check for specific relative terms
    if (isSameDay(targetDate, today)) return `— ${dayName}, Today`;
    if (isSameDay(targetDate, addDays(today, 1))) return `— ${dayName}, Tomorrow`;
    if (isSameDay(targetDate, subDays(today, 1))) return `— ${dayName}, Yesterday`;

    const isFuture = targetDate > today;

    // 2. Calculate exact difference
    const duration = intervalToDuration({
        start: isFuture ? today : targetDate,
        end: isFuture ? targetDate : today
    });

    const durationStr = formatDuration(duration, {
        format: ['years', 'months', 'days']
    });

    return `— ${dayName}, ${durationStr} ${isFuture ? "from now" : "ago"}`;
}

export default function DayPageClient({ year, month, day }: { year: number; month: number, day: number }) {
    const router = useRouter();

    const years = Array.from({ length: 51 }, (_, i) => 2000 + i);
    const daysInMonth = new Date(year, month, 0).getDate();
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const requestedDate = new Date(year, month - 1, day);
    const isFutureDate = requestedDate > today;

    const navigateDay = (delta: number) => {
        const d = new Date(year, month - 1, day);
        d.setDate(d.getDate() + delta);
        router.push(`/${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`);
    };

    const handleJump = (y: number, m: number, d: number) => {
        router.push(`/${y}/${m}/${d}`);
    };

    const navButtonStyle: React.CSSProperties = {
        background: "transparent",
        border: "none",
        cursor: "pointer",
        fontFamily: "inherit",
        fontSize: "1.2rem",
        opacity: 0.4,
        padding: "0 0.5rem",
    };

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

    if (isNaN(year) || isNaN(month) || isNaN(day)) {
        return <div style={{ padding: "2rem", opacity: 0.5 }}>Loading chronological data...</div>;
    }

    return (
        <div style={{ minHeight: "100dvh", padding: "1rem", fontFamily: "Georgia, serif" }}>
            <style>{`
                /* Responsive Header Wrapper */
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
                    font-size: 0.6rem;
                    letter-spacing: 0.15em;
                    text-transform: uppercase;
                    opacity: 0.5;
                    padding-left: 2.5rem; 
                }
                .jump-group {
                    display: flex;
                    gap: 1rem;
                    align-items: center;
                }

                @media (min-width: 640px) {
                    .left-group { flex-direction: row; align-items: baseline; gap: 1rem; }
                    .relative-label { padding-left: 0; }
                }

                @media (min-width: 1024px) {
                    .header-wrapper {
                        flex-direction: row;
                        justify-content: space-between;
                        align-items: center;
                        margin-bottom: 4rem;
                    }
                }

                .day-layout-grid { display: grid; grid-template-columns: 1fr; gap: 3rem; }
                @media (min-width: 768px) {
                    .day-layout-grid { grid-template-columns: 1fr 2.5fr; align-items: start; }
                }

                .nav-arrow:hover { opacity: 1 !important; }
                .breadcrumb:hover { opacity: 1 !important; border-bottom-style: solid !important; }
            `}</style>

            <header className="header-wrapper">
                <div className="left-group">
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                        <HomeButton />
                        <h1 style={{
                            display: "flex",
                            alignItems: "center",
                            fontSize: "1.5rem",
                            fontWeight: 300,
                            letterSpacing: "0.05em",
                            opacity: 0.9,
                            margin: 0,
                            whiteSpace: "nowrap"
                        }}>
                            <button className="nav-arrow" onClick={() => navigateDay(-1)} style={navButtonStyle}>&lt;</button>
                            <span className="breadcrumb" style={{ borderBottom: "1px dashed currentColor", cursor: "pointer", opacity: 0.8 }} onClick={() => router.push(`/${year}`)}>{year}</span>
                            <span style={{ opacity: 0.2, margin: "0 0.5rem" }}>/</span>
                            <span className="breadcrumb" style={{ borderBottom: "1px dashed currentColor", cursor: "pointer", opacity: 0.8 }} onClick={() => router.push(`/${year}/${month}`)}>{MONTHS[month - 1]}</span>
                            <span style={{ opacity: 0.2, margin: "0 0.5rem" }}>/</span>
                            <span>{day}</span>
                            <button className="nav-arrow" onClick={() => navigateDay(1)} style={navButtonStyle}>&gt;</button>
                        </h1>
                    </div>

                    <span className="relative-label">
                        {formatRelativeDateLabel(year, month, day)}
                    </span>
                </div>

                <div className="jump-group">
                    <span style={{ fontSize: "0.6rem", opacity: 0.4, letterSpacing: "0.1em" }}>JUMP TO</span>
                    <select value={year} onChange={(e) => handleJump(parseInt(e.target.value), month, day)} style={selectStyle}>
                        {years.map(y => <option key={y} value={y}>{y}</option>)}
                    </select>
                    <select value={month} onChange={(e) => handleJump(year, parseInt(e.target.value), day)} style={selectStyle}>
                        {MONTHS.map((m, i) => <option key={m} value={i + 1}>{m}</option>)}
                    </select>
                    <select value={day} onChange={(e) => handleJump(year, month, parseInt(e.target.value))} style={selectStyle}>
                        {days.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                </div>
            </header>

            <div className="day-layout-grid">
                <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
                    {!isFutureDate && (
                        <div style={{ opacity: 0.8 }}>
                            <h2 style={{ fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1.5rem', fontWeight: 400 }}>
                                World News
                            </h2>
                            <EventsSection year={year} month={month} day={day} />
                        </div>
                    )}
                    <div style={{ opacity: 0.8 }}>
                        <OnThisDaySection month={month} day={day} />
                    </div>
                </div>

                <div>
                    <ZodiacSection year={year} month={month} day={day} />
                </div>
            </div>
        </div>
    );
}