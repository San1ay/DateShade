"use client";

import { useState } from "react";
import MonthGrid from "@/components/monthGrid";
import { MONTHS } from "@/utils/constants";
import YearDetails from "@/components/yearDetails";

const HOROSCOPES = [
    { sign: "Aries", dates: "Mar 21 – Apr 19", element: "Fire", trait: "Bold & Ambitious" },
    { sign: "Taurus", dates: "Apr 20 – May 20", element: "Earth", trait: "Reliable & Patient" },
    { sign: "Gemini", dates: "May 21 – Jun 20", element: "Air", trait: "Curious & Adaptable" },
    { sign: "Cancer", dates: "Jun 21 – Jul 22", element: "Water", trait: "Intuitive & Emotional" },
    { sign: "Leo", dates: "Jul 23 – Aug 22", element: "Fire", trait: "Creative & Passionate" },
    { sign: "Virgo", dates: "Aug 23 – Sep 22", element: "Earth", trait: "Analytical & Kind" },
    { sign: "Libra", dates: "Sep 23 – Oct 22", element: "Air", trait: "Diplomatic & Fair" },
    { sign: "Scorpio", dates: "Oct 23 – Nov 21", element: "Water", trait: "Brave & Resourceful" },
    { sign: "Sagittarius", dates: "Nov 22 – Dec 21", element: "Fire", trait: "Generous & Idealistic" },
    { sign: "Capricorn", dates: "Dec 22 – Jan 19", element: "Earth", trait: "Disciplined & Serious" },
    { sign: "Aquarius", dates: "Jan 20 – Feb 18", element: "Air", trait: "Original & Independent" },
    { sign: "Pisces", dates: "Feb 19 – Mar 20", element: "Water", trait: "Compassionate & Artistic" },
];

const ELEMENT_COLORS: Record<string, string> = {
    Fire: "#ff6b4a", Earth: "#8b7355", Air: "#87ceeb", Water: "#4a90d9",
};

const MONTH_INFO = [
    { season: "Winter", gem: "Garnet", flower: "Carnation", mood: "Renewal" },
    { season: "Winter", gem: "Amethyst", flower: "Violet", mood: "Clarity" },
    { season: "Spring", gem: "Aquamarine", flower: "Daffodil", mood: "Growth" },
    { season: "Spring", gem: "Diamond", flower: "Daisy", mood: "Energy" },
    { season: "Spring", gem: "Emerald", flower: "Lily", mood: "Abundance" },
    { season: "Summer", gem: "Pearl", flower: "Rose", mood: "Warmth" },
    { season: "Summer", gem: "Ruby", flower: "Larkspur", mood: "Passion" },
    { season: "Summer", gem: "Peridot", flower: "Poppy", mood: "Vitality" },
    { season: "Autumn", gem: "Sapphire", flower: "Aster", mood: "Wisdom" },
    { season: "Autumn", gem: "Opal", flower: "Marigold", mood: "Harvest" },
    { season: "Autumn", gem: "Topaz", flower: "Chrysanthemum", mood: "Gratitude" },
    { season: "Winter", gem: "Turquoise", flower: "Narcissus", mood: "Reflection" },
];

// function YearDetails({ year }: { year: number }) {
//     const isLeap = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
//     const totalDays = isLeap ? 366 : 365;
//     const jan1Day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][new Date(year, 0, 1).getDay()];

//     return (
//         <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>

//             {/* Year stats */}
//             <div>
//                 <p style={{ fontSize: "0.55rem", letterSpacing: "0.3em", textTransform: "uppercase", opacity: 0.5, marginBottom: "0.75rem" }}>Year at a Glance</p>
//                 <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
//                     {[
//                         { label: "Total Days", value: totalDays },
//                         { label: "Leap Year", value: isLeap ? "Yes" : "No" },
//                         { label: "Starts On", value: jan1Day },
//                         { label: "Seasons", value: "4" },
//                     ].map(({ label, value }) => (
//                         <div key={label} style={{ padding: "0.75rem", borderRadius: "6px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
//                             <p style={{ fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", opacity: 0.4, margin: "0 0 0.3rem" }}>{label}</p>
//                             <p style={{ fontSize: "0.95rem", fontWeight: 300, margin: 0 }}>{value}</p>
//                         </div>
//                     ))}
//                 </div>
//             </div>

//             {/* All 12 months overview */}
//             <div>
//                 <p style={{ fontSize: "0.55rem", letterSpacing: "0.3em", textTransform: "uppercase", opacity: 0.5, marginBottom: "0.75rem" }}>Monthly Overview</p>
//                 <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
//                     {MONTH_INFO.map((info, i) => (
//                         <div key={i} style={{ display: "grid", gridTemplateColumns: "3rem 1fr 1fr 1fr", gap: "0.5rem", alignItems: "center", padding: "0.4rem 0.5rem", borderRadius: "6px", background: "rgba(255,255,255,0.03)", fontSize: "0.75rem" }}>
//                             <span style={{ opacity: 0.5, fontSize: "0.6rem", letterSpacing: "0.1em" }}>{MONTHS[i]}</span>
//                             <span style={{ opacity: 0.7 }}>{info.season}</span>
//                             <span style={{ opacity: 0.7 }}>{info.gem}</span>
//                             <span style={{ opacity: 0.5, fontSize: "0.65rem" }}>{info.mood}</span>
//                         </div>
//                     ))}
//                 </div>
//             </div>

//             {/* All 12 zodiac signs */}
//             <div>
//                 <p style={{ fontSize: "0.55rem", letterSpacing: "0.3em", textTransform: "uppercase", opacity: 0.5, marginBottom: "0.75rem" }}>Zodiac Year</p>
//                 <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
//                     {HOROSCOPES.map(h => (
//                         <div key={h.sign} style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.4rem 0.5rem", borderRadius: "6px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
//                             <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: ELEMENT_COLORS[h.element], flexShrink: 0 }} />
//                             <div style={{ flex: 1 }}>
//                                 <span style={{ fontSize: "0.8rem", fontWeight: 400 }}>{h.sign}</span>
//                             </div>
//                             <span style={{ fontSize: "0.6rem", opacity: 0.45 }}>{h.dates}</span>
//                             <span style={{ fontSize: "0.6rem", opacity: 0.55, fontStyle: "italic" }}>{h.trait}</span>
//                         </div>
//                     ))}
//                 </div>
//             </div>

//         </div>
//     );
// }

export default function YearPageClient({ year, today }: { year: number; today: Date }) {
    return (
        <div style={{ display: "flex", gap: "2rem", height: "calc(100dvh - 6rem)", overflow: "hidden" }}>

            {/* Left 2/5 — month grids */}
            <div style={{ flex: "2", overflowY: "auto", paddingRight: "0.5rem" }}>
                <style>{`
          .calendar-grid {
            display: grid;
            grid-template-columns: repeat(1, 1fr);
            gap: 1.5rem;
          }
          @media (min-width: 640px) {
            .calendar-grid { grid-template-columns: repeat(2, 1fr); }
          }
        `}</style>
                <div className="calendar-grid">
                    {Array.from({ length: 12 }, (_, mi) => (
                        <MonthGrid
                            key={mi}
                            month={mi + 1}
                            monthName={MONTHS[mi]}
                            year={year}
                            today={today}
                        />
                    ))}
                </div>
            </div>

            {/* Right 3/5 — year details */}
            <div style={{ flex: "3", overflowY: "auto", paddingLeft: "1rem", borderLeft: "1px solid rgba(255,255,255,0.1)" }}>
                <h3 style={{ fontSize: "1.2rem", fontWeight: 300, letterSpacing: "0.2em", marginBottom: "1.5rem", opacity: 0.8 }}>
                    {year} — Overview
                </h3>
                <YearDetails year={year} />
            </div>

        </div>
    );
}