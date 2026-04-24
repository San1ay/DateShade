"use client";

import { useState, useEffect } from "react";

interface ZodiacData {
    sign: string;
    symbol: string;
    monthly_horoscope: string;
    lucky_color_name: string;
    lucky_color_hex: string;
    lucky_number: number;
    details: {
        element: string;
        ruler: string;
        traits: string[];
    };
}

export default function ZodiacSection({ year, month, day }: { year: number; month?: number, day?: number }) {
    const [zodiacs, setZodiacs] = useState<ZodiacData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        let isMounted = true;
        setLoading(true);

        const fetchZodiacs = async () => {
            try {
                const paramsObj = Object.fromEntries(
                    Object.entries({
                        year: year?.toString(),
                        month: month ? month.toString() : '',
                        day: day ? day?.toString() : ''
                    }).filter(([_, value]) => value !== '')
                );

                const searchParams = new URLSearchParams(paramsObj).toString();

                const res = await fetch(`/api/horoscope?${searchParams}`);
                const data = await res.json();

                if (isMounted) {
                    setZodiacs(data.data && Array.isArray(data.data) ? data.data : []);
                    setLoading(false);
                }
            } catch (err) {
                if (isMounted) {
                    setZodiacs([]);
                    setLoading(false);
                }
            }
        };

        fetchZodiacs();
        return () => { isMounted = false; };
    }, [year, month, day]);

    return (
        <section>
            <h4 style={{ fontSize: "0.65rem", textTransform: "uppercase", opacity: 0.5, letterSpacing: "0.15em", marginBottom: "1rem" }}>
                {day ? "Daily" : "Monthly"} Zodiac Forecasts
            </h4>

            {loading ? (
                <p style={{ fontStyle: "italic", opacity: 0.5 }}>Consulting the stars...</p>
            ) : zodiacs.length > 0 ? (
                /* Note: grid-template-columns: repeat(4, 1fr) might be tight on small screens; 
                   consider repeat(auto-fill, minmax(250px, 1fr)) for better responsiveness */
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "1.5rem" }}>
                    {zodiacs.map((zodiac) => (
                        <div key={zodiac.sign} style={{
                            padding: "1rem",
                            border: "1px solid rgba(0,0,0,0.1)",
                            borderRadius: "8px",
                            backgroundColor: "rgba(0,0,0,0.02)",
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.75rem"
                        }}>
                            <h5 style={{ textTransform: "capitalize", margin: 0, fontSize: "1.1rem", fontWeight: 500 }}>
                                <span style={{ marginRight: "0.4rem", opacity: 0.8 }}>{zodiac.symbol}</span>
                                {zodiac.sign}
                            </h5>

                            <div style={{ fontSize: "0.7rem", opacity: 0.6, display: "flex", flexDirection: "column", gap: "0.2rem" }}>
                                <div style={{ display: "flex", gap: "0.5rem" }}>
                                    <span><strong>Element:</strong> {zodiac.details.element}</span>
                                    <span>•</span>
                                    <span><strong>Ruler:</strong> {zodiac.details.ruler}</span>
                                </div>
                                <div>
                                    <strong>Traits:</strong> {zodiac.details.traits.join(", ")}
                                </div>
                            </div>

                            <p style={{ fontSize: "0.85rem", lineHeight: 1.5, fontWeight: 300, margin: "0.25rem 0 0 0" }}>
                                {zodiac.monthly_horoscope}
                            </p>

                            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", fontSize: "0.75rem", opacity: 0.8, marginTop: "auto", borderTop: "1px solid rgba(0,0,0,0.05)", paddingTop: "0.75rem" }}>
                                <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                                    <strong>Color:</strong>
                                    <span>{zodiac.lucky_color_name}</span>
                                    <span style={{
                                        display: "inline-block",
                                        width: "12px",
                                        height: "12px",
                                        borderRadius: "50%",
                                        backgroundColor: zodiac.lucky_color_hex,
                                        border: "1px solid rgba(0,0,0,0.2)"
                                    }} title={zodiac.lucky_color_name}></span>
                                </span>
                                <span><strong>Lucky Number:</strong> {zodiac.lucky_number}</span>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p style={{ fontSize: "0.85rem", opacity: 0.4 }}>Horoscope data unavailable.</p>
            )}
        </section>
    );
}