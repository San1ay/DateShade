import MonthPageClient from "./monthPageClient";

export default async function MonthPage({ params }: { params: Promise<{ year: string; month: string }> }) {
    const { year, month } = await params;

    const y = Number(year);
    const m = Number(month);


    return <MonthPageClient year={y} month={m} />;
}