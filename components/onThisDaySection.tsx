"use client";

import { useState, useEffect } from "react";
import { MONTHS } from "@/utils/constants";

interface HistoricalEvent {
    year: number;
    text: string;
    pages?: { title: string; extract: string; content_urls: { desktop: { page: string } } }[];
}

export default function OnThisDaySection({ month, day }: { month: number; day: number }) {
    const [events, setEvents] = useState<HistoricalEvent[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        let isMounted = true;
        setLoading(true);

        const fetchHistory = async () => {
            try {
                const paramsObj = Object.fromEntries(
                    Object.entries({
                        month: month?.toString(),
                        day: day?.toString()
                    }).filter(([_, value]) => value !== undefined && value !== null && value !== "")
                );

                const searchParams = new URLSearchParams(paramsObj).toString();
                const res = await fetch(`/api/on-this-day?${searchParams}`);
                const data = await res.json();

                if (isMounted) {
                    setEvents(data.events && Array.isArray(data.events) ? data.events : []);
                    setLoading(false);
                }
            } catch (err) {
                console.error("History Fetch Error:", err);
                if (isMounted) {
                    setEvents([]);
                    setLoading(false);
                }
            }
        };

        if (month && day) {
            fetchHistory();
        } else {
            setLoading(false);
        }

        return () => { isMounted = false; };
    }, [month, day]);

    return (
        <section>
            <h4 style={{
                fontSize: "0.65rem",
                textTransform: "uppercase",
                opacity: 0.5,
                letterSpacing: "0.15em",
                marginBottom: "1.5rem"
            }}>
                In History — {MONTHS[month - 1]} {day}
            </h4>

            {loading ? (
                <p style={{ fontStyle: "italic", opacity: 0.5 }}>Dusting off the archives...</p>
            ) : events.length > 0 ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                    {events.map((evt, idx) => (
                        <div key={idx} style={{
                            paddingBottom: "1.25rem",
                            borderBottom: idx === events.length - 1 ? "none" : "1px solid rgba(0,0,0,0.05)"
                        }}>
                            <p style={{
                                fontSize: "0.9rem",
                                lineHeight: 1.6,
                                margin: 0,
                                opacity: 0.85
                            }}>
                                {/* Inline Year */}
                                <strong style={{
                                    fontSize: "1.05rem",
                                    fontWeight: 600,
                                    marginRight: "0.5rem"
                                }}>
                                    {evt.year}
                                </strong>

                                <span style={{ opacity: 0.8 }}>— {evt.text}</span>

                                {/* Inline Link at the end of the text */}
                                {evt.pages && evt.pages.length > 0 && (
                                    <a
                                        href={evt.pages[0].content_urls.desktop.page}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            marginLeft: "0.4rem",
                                            fontSize: "0.65rem",
                                            textTransform: "uppercase",
                                            letterSpacing: "0.1em",
                                            color: "inherit",
                                            opacity: 0.4,
                                            textDecoration: "none",
                                            borderBottom: "1px dashed rgba(0,0,0,0.3)",
                                            whiteSpace: "nowrap"
                                        }}
                                        title={`Read about ${evt.pages[0].title} on Wikipedia`}
                                    >
                                        Read more
                                    </a>
                                )}
                            </p>
                        </div>
                    ))}
                </div>
            ) : (
                <p style={{ fontSize: "0.85rem", opacity: 0.4 }}>No historical events recorded for this date.</p>
            )}
        </section>
    );
}