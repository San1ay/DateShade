import DayPageClient from "./dayPageClient";
import isValidDate from "@/utils/isValidDate"; // Assuming you have this or similar logic

export default async function MonthPage({ params }: { params: Promise<{ year: string; month: string }> }) {
    const { year, month } = await params;

    const y = Number(year);
    const m = Number(month);

    // Validate year and ensure month is between 1 and 12
    if (!isValidDate(y) || isNaN(m) || m < 1 || m > 12) {
        return <div>Invalid date parameters.</div>;
    }

    return <DayPageClient year={y} month={m} />;
}