"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function YearSelector({ currentYear }: { currentYear: number }) {
    const [year, setYear] = useState(String(currentYear));
    const [editing, setEditing] = useState(false);
    const router = useRouter();

    const navigate = () => {
        setEditing(false);
        router.push(`/${year}`);
    };

    if (!editing) {
        return (
            <span
                onClick={() => setEditing(true)}
                style={{ cursor: "pointer", borderBottom: "1px dashed currentColor" }}
            >
                {year}
            </span>
        );
    }

    return (
        <input
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
                width: "5rem",
                fontFamily: "inherit",
                cursor: "text",
            }}
        />
    );
}