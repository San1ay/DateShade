import DayPageClient from "./dayPageClient";

export default async function MonthPage({ params }: { params: Promise<{ year: string; month: string; day: string }> }) {
    const { year, month, day } = await params;

    const y = Number(year);
    const m = Number(month);
    const d = Number(day);

    return <DayPageClient year={y} month={m} day={d} />;
}