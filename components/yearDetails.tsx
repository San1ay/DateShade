"use client";

import { useEffect, useState } from "react";
import { fetchYearData } from "@/lib/fetchYearData";
import { YearFact } from "@/types/year";

export default function YearDetails({ year }: { year: number }) {
    const [data, setData] = useState<YearFact | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        setData(null);
        fetchYearData(year)
            .then(setData)
            .finally(() => setLoading(false));
    }, [year]);

    const isLeap = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    const jan1Day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][new Date(year, 0, 1).getDay()];

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>

            <div>
                <p style={{ fontSize: "0.55rem", letterSpacing: "0.3em", textTransform: "uppercase", opacity: 0.5, marginBottom: "0.75rem" }}>Year at a Glance</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                    {[
                        { label: "Total Days", value: isLeap ? "366" : "365" },
                        { label: "Leap Year", value: isLeap ? "Yes" : "No" },
                        { label: "Starts On", value: jan1Day },
                    ].map(({ label, value }) => (
                        <div key={label} style={{ padding: "0.75rem", borderRadius: "6px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                            <p style={{ fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", opacity: 0.4, margin: "0 0 0.3rem" }}>{label}</p>
                            <p style={{ fontSize: "0.95rem", fontWeight: 300, margin: 0 }}>{value}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <p style={{ fontSize: "0.55rem", letterSpacing: "0.3em", textTransform: "uppercase", opacity: 0.5, marginBottom: "0.75rem" }}>About {year}</p>
                {loading
                    ? <p style={{ opacity: 0.4, fontSize: "0.8rem", fontStyle: "italic" }}>Loading...</p>
                    : <p style={{ fontSize: "0.8rem", lineHeight: 1.7, opacity: 0.75, fontWeight: 300 }}>
                        {data?.summary?.slice(0, 400)}{data?.summary && data.summary.length > 400 ? "…" : ""}
                    </p>
                }
            </div>

            <Section title={`Events of ${year}`} items={data?.events} loading={loading} />
            <Section title="Notable Births" items={data?.births} loading={loading} />
            <Section title="Notable Deaths" items={data?.deaths} loading={loading} />

        </div>
    );
}

function Section({ title, items, loading }: { title: string; items?: string[]; loading: boolean }) {
    return (
        <div>
            <p style={{ fontSize: "0.55rem", letterSpacing: "0.3em", textTransform: "uppercase", opacity: 0.5, marginBottom: "0.75rem" }}>{title}</p>
            {loading
                ? <p style={{ opacity: 0.4, fontSize: "0.8rem", fontStyle: "italic" }}>Loading...</p>
                : !items?.length
                    ? <p style={{ opacity: 0.3, fontSize: "0.75rem" }}>No data found.</p>
                    : <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                        {items.map((item, i) => (
                            <div key={i} style={{ padding: "0.5rem 0.75rem", borderRadius: "6px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", fontSize: "0.75rem", lineHeight: 1.5, opacity: 0.8 }}>
                                {item}
                            </div>
                        ))}
                    </div>
            }
        </div>
    );
}