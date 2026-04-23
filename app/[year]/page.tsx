import YearPageClient from "./yearPageClient";
import YearSelector from "@/components/yearSelector"; // or ScrollYearSelector depending on which you kept
import MonthSelector from "@/components/monthSelector";
import isValidDate from "@/utils/isValidDate";

function yearLabel(year: number, currentYear: number) {
    const diff = year - currentYear;
    if (diff === 0) return "— now";
    if (diff === 1) return "— next year";
    if (diff === -1) return "— last year";
    if (diff > 0) return `— ${diff} years from now`;
    return `— ${Math.abs(diff)} years ago`;
}

export default async function YearPage({ params }: { params: Promise<{ year: string }> }) {
    const { year } = await params;
    const y = Number(year);
    const today = new Date();

    if (!isValidDate(y)) return <div>Invalid year.</div>;

    return (
        <div style={{ minHeight: "100dvh", padding: "1rem", fontFamily: "Georgia, serif" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem" }}>

                {/* Left Side: Main Heading with Year Selector */}
                <h1 style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    fontSize: "1.5rem",
                    fontWeight: 300,
                    letterSpacing: "0.2em",
                    opacity: 0.9,
                    margin: 0
                }}>
                    <YearSelector currentYear={y} />

                    <span style={{ fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", opacity: 0.5 }}>
                        {yearLabel(y, today.getFullYear())}
                    </span>
                </h1>

                {/* Right Side: Month Details/Jump */}
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <span style={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", opacity: 0.4 }}>
                        Jump to Month
                    </span>
                    <MonthSelector />
                </div>

            </div>

            <YearPageClient year={y} today={today} />
        </div>
    );
}