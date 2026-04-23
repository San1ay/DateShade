import MonthGrid from "@/components/monthGrid";
import { MONTHS } from "@/utils/constants";
import isValidDate from "@/utils/isValidDate";
import YearSelector from "@/components/yearSelector";

function yearLabel(year: number, currentYear: number) {
    const diff = year - currentYear;
    if (diff === 0) return "— now";
    if (diff === 1) return "— next year";
    if (diff === -1) return "— last year";
    if (diff > 0) return `— ${diff} years from now`;
    return `— ${Math.abs(diff)} years ago`;
}

export default async function YearPage({
    params,
}: {
    params: Promise<{ year: string }>;
}) {
    const { year } = await params;
    const y = Number(year);
    const today = new Date();

    if (!isValidDate(y)) return <div>Invalid year.</div>;

    return (
        <div style={{ minHeight: "100dvh", padding: "1rem", fontFamily: "Georgia, serif" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem" }}>
                <h1 style={{ fontSize: "1.5rem", fontWeight: 300, letterSpacing: "0.2em", opacity: 0.9, margin: 0 }}>
                    {y}
                    <span style={{ fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", opacity: 0.5 }}>
                        {yearLabel(y, today.getFullYear())}
                    </span>
                </h1>

                <YearSelector currentYear={y} />
            </div>

            <style>{`
                .calendar-grid {
                    display: grid;
                    grid-template-columns: repeat(1, 1fr);
                    gap: 2rem;
                }
                @media (min-width: 640px) {
                    .calendar-grid { grid-template-columns: repeat(3, 1fr); }
                }
                @media (min-width: 1024px) {
                    .calendar-grid { grid-template-columns: repeat(6, 1fr); }
                }
            `}</style>

            <div className="calendar-grid">
                {Array.from({ length: 12 }, (_, mi) => (
                    <MonthGrid
                        key={mi}
                        month={mi + 1}
                        monthName={MONTHS[mi]}
                        year={y}
                        today={today}
                    />
                ))}
            </div>
        </div>
    );
}