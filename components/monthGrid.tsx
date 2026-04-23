import Link from "next/link";
import getDayPalette from "@/lib/getDayDetails";
import DayCell from "./dayCell";
import { DAYS } from "@/utils/constants";


export default function MonthGrid({
    month,
    monthName,
    year,
    today,
}: {
    month: number;
    monthName: string;
    year: number;
    today: Date;
}) {
    const daysInMonth = new Date(year, month, 0).getDate();
    const firstDayOfWeek = new Date(year, month - 1, 1).getDay();

    return (
        <div>
            <h2 style={{ fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "0.4rem", opacity: 0.5 }}>
                {monthName}
            </h2>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "2px", marginBottom: "2px" }}>
                {DAYS.map(d => (
                    <div key={d} style={{ textAlign: "center", fontSize: "0.5rem", opacity: 0.35, letterSpacing: "0.05em" }}>
                        {d}
                    </div>
                ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "2px" }}>
                {Array.from({ length: firstDayOfWeek }, (_, i) => <div key={`empty-${i}`} />)}

                {Array.from({ length: daysInMonth }, (_, di) => {
                    const day = di + 1;
                    const value = getDayPalette(year, month, day);
                    const isToday = today.getMonth() + 1 === month && today.getDate() === day;

                    return (
                        <Link key={day} href={`/${year}/${String(month).padStart(2, "0")}/${String(day).padStart(2, "0")}`} style={{ textDecoration: "none" }}>
                            <DayCell
                                day={day}
                                primary={value.palette.primary}
                                secondary={value.palette.secondary}
                                text={value.palette.text}
                                isToday={isToday}
                            />
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}