import YearPageClient from "./yearPageClient";

export default async function YearPage({ params }: { params: Promise<{ year: string }> }) {
    const { year } = await params;
    const y = Number(year);
    const today = new Date();

    return <YearPageClient year={y} today={today} />

}