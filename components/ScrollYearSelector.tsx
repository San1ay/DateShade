"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ScrollYearSelector({ currentYear }: { currentYear: number }) {
    const [year, setYear] = useState(String(currentYear));
    const router = useRouter();

    // Keep local state in sync if the parent changes the currentYear prop
    useEffect(() => {
        setYear(String(currentYear));
    }, [currentYear]);

    const scrollToYear = (targetYear: number | string) => {
        const y = Number(targetYear);

        if (isNaN(y)) {
            setYear(String(currentYear));
            return;
        }

        const targetElement = document.getElementById(`year-${y}`);

        if (targetElement) {
            // If the year is already rendered in the DOM, smoothly scroll to it
            targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
            setYear(String(y));
        } else {
            // If the year hasn't been loaded by infinite scroll yet, navigate to its dedicated route
            router.push(`/${y}`);
        }
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
            <button
                onClick={() => scrollToYear(Number(year) - 1)}
                style={buttonStyle}
                aria-label="Previous Year"
            >
                &lt;
            </button>

            <span
                onClick={() => router.push(`/${year}`)}
                style={{ cursor: "pointer", borderBottom: "1px dashed currentColor" }}
                title="Go to Year Detail"
            >
                {year}
            </span>

            <button
                onClick={() => scrollToYear(Number(year) + 1)}
                style={buttonStyle}
                aria-label="Next Year"
            >
                &gt;
            </button>
        </div>
    );
}