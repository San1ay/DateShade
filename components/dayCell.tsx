// components/DayCell.tsx
"use client";

export default function DayCell({
    day,
    primary,
    secondary,
    text,
    isToday,
}: {
    day: number;
    primary: string;
    secondary: string;
    text: string;
    isToday: boolean;
}) {
    return (
        <div
            style={{
                background: `linear-gradient(135deg, ${primary}, ${secondary})`,
                borderRadius: "6px",
                aspectRatio: "1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.65rem",
                color: text,
                fontWeight: isToday ? 700 : 400,
                outline: isToday ? `2px solid ${primary}` : "none",
                outlineOffset: "2px",
                transition: "transform 0.15s ease, opacity 0.15s ease",
                cursor: "pointer",
                opacity: 0.9,
            }}
            onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.transform = "scale(1.15)";
                (e.currentTarget as HTMLDivElement).style.opacity = "1";
            }}
            onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.transform = "scale(1)";
                (e.currentTarget as HTMLDivElement).style.opacity = "0.9";
            }}
        >
            {day}
        </div>
    );
}