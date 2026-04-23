"use client";

import { useState, useEffect } from "react";
import { MONTHS } from "@/utils/constants";

export default function MonthDetails({ year, month }: { year: number; month: number }) {
    const [events, setEvents] = useState<{ title: string; url: string; date: string }[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const monthName = MONTHS[month - 1];

    useEffect(() => {
        let isMounted = true;
        setLoading(true);

        const fetchNews = async () => {
            try {
                // Call your internal API route instead of the external one
                const res = await fetch(`/api/events?year=${year}&month=${month}`);
                const data = await res.json();

                if (data.response?.results) {
                    const results = data.response.results.slice(0, 5).map((item: any) => ({
                        title: item.webTitle,
                        url: item.webUrl,
                        date: new Date(item.webPublicationDate).toLocaleDateString(undefined, {
                            day: "numeric",
                            month: "short",
                        }),
                    }));

                    if (isMounted) {
                        setEvents(results);
                        setLoading(false);
                    }
                }
            } catch (err) {
                if (isMounted) {
                    setEvents([]);
                    setLoading(false);
                }
            }
        };

        fetchNews();
        return () => { isMounted = false; };
    }, [year, month]);

    return (
        <div style={{ padding: "1.5rem", border: "1px solid currentColor", borderRadius: "8px", opacity: 0.9 }}>
            <h3 style={{ fontWeight: 300, borderBottom: "1px dashed currentColor", paddingBottom: "0.5rem", marginBottom: "1.5rem" }}>
                Events: {monthName} {year}
            </h3>

            {loading ? (
                <p style={{ fontStyle: "italic", opacity: 0.5 }}>Querying archives...</p>
            ) : events.length > 0 ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    {events.map((event, i) => (
                        <a
                            key={i}
                            href={event.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ textDecoration: "none", color: "inherit", display: "block", transition: "opacity 0.2s" }}
                            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.6")}
                            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                        >
                            <span style={{ fontSize: "0.65rem", opacity: 0.5, textTransform: "uppercase", display: "block", marginBottom: "0.2rem" }}>
                                {event.date}, {year}
                            </span>
                            <h4 style={{ margin: 0, fontSize: "0.95rem", fontWeight: 400, lineHeight: 1.4 }}>
                                {event.title}
                            </h4>
                        </a>
                    ))}
                </div>
            ) : (
                <p style={{ fontSize: "0.9rem", opacity: 0.5 }}>No major headlines found for this period.</p>
            )}
        </div>
    );
}