"use client";

import { useState, useEffect } from "react";

interface Event {
    title: string;
    url: string;
    date: string;
}

export default function EventsSection({ year, month }: { year: number; month: number }) {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        let isMounted = true;
        setLoading(true);

        const fetchEvents = async () => {
            try {
                const res = await fetch(`/api/events?year=${year}&month=${month}`);
                const data = await res.json();

                if (isMounted) {
                    if (data.response?.results) {
                        const results = data.response.results.slice(0, 5).map((item: any) => ({
                            title: item.webTitle,
                            url: item.webUrl,
                            date: new Date(item.webPublicationDate).toLocaleDateString(undefined, {
                                day: "numeric",
                                month: "short",
                            }),
                        }));
                        setEvents(results);
                    } else {
                        setEvents([]);
                    }
                    setLoading(false);
                }
            } catch (err) {
                if (isMounted) {
                    setEvents([]);
                    setLoading(false);
                }
            }
        };

        fetchEvents();
        return () => { isMounted = false; };
    }, [year, month]);

    return (
        <section>
            <h4 style={{ fontSize: "0.65rem", textTransform: "uppercase", opacity: 0.5, letterSpacing: "0.15em", marginBottom: "1rem" }}>
                World Headlines
            </h4>

            {loading ? (
                <p style={{ fontStyle: "italic", opacity: 0.5 }}>Scanning historical archives...</p>
            ) : events.length > 0 ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
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
                            <span style={{ fontSize: "0.65rem", opacity: 0.5, display: "block", marginBottom: "0.2rem" }}>
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
        </section>
    );
}