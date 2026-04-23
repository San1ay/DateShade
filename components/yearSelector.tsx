"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function YearSelector({ currentYear }: { currentYear: number }) {
    const [year, setYear] = useState(String(currentYear));
    const [editing, setEditing] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setYear(String(currentYear));
    }, [currentYear]);

    const navigate = () => {
        setEditing(false);
        if (year !== String(currentYear)) {
            router.push(`/${year}`);
        }
    };

    const navigateDelta = (delta: number) => {
        setEditing(false);
        router.push(`/${currentYear + delta}`);
    };

    const buttonStyle = {
        background: "transparent",
        border: "none",
        cursor: "pointer",
        fontFamily: "inherit",
        fontSize: "inherit",
        opacity: 0.6,
        padding: "0 0.25rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    };

    return (
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            {/* Hides the default browser arrows on number inputs */}
            <style>{`
                .no-spinners::-webkit-outer-spin-button,
                .no-spinners::-webkit-inner-spin-button {
                    -webkit-appearance: none;
                    margin: 0;
                }
                .no-spinners {
                    -moz-appearance: textfield;
                }
            `}</style>

            <button
                onClick={() => navigateDelta(-1)}
                style={buttonStyle}
                aria-label="Previous Year"
            >
                &lt;
            </button>

            {!editing ? (
                <span
                    onClick={() => setEditing(true)}
                    style={{ cursor: "pointer", borderBottom: "1px dashed currentColor" }}
                >
                    {year}
                </span>
            ) : (
                <input
                    className="no-spinners"
                    autoFocus
                    type="number"
                    value={year}
                    onChange={e => setYear(e.target.value)}
                    onBlur={navigate}
                    onKeyDown={e => e.key === "Enter" && navigate()}
                    style={{
                        fontSize: "inherit",
                        fontWeight: "inherit",
                        letterSpacing: "inherit",
                        opacity: 0.8,
                        background: "transparent",
                        border: "none",
                        borderBottom: "1px solid currentColor",
                        outline: "none",
                        width: "5ch", /* <-- Updated to properly fit 4 digits */
                        fontFamily: "inherit",
                        cursor: "text",
                        textAlign: "center",
                    }}
                />
            )}

            <button
                onClick={() => navigateDelta(1)}
                style={buttonStyle}
                aria-label="Next Year"
            >
                &gt;
            </button>
        </div>
    );
}