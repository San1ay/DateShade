import { Metadata } from "next";
import hexToRgba from "@/utils/hexToRgba";
import getCurrentDateDetails from "@/lib/getCurrentDateDetails";
import isValidDate from "@/utils/isValidDate";
import NoDataFound from "@/components/noData";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ year: string; month: string; day: string }>;
}): Promise<Metadata> {
    const { year, month, day } = await params;
    const parts = [year, month, day].filter(Boolean);
    const dateString = parts.join("/");
    return {
        title: `DateShade: ${dateString}`,
        description: "Dates, reimagined in color.",
    };
}

export default async function YearLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ year: string; month: string; day: string }>;
}) {
    const { year, month, day } = await params;
    const y = Number(year);
    const m = Number(month);
    const d = Number(day);

    if (!isValidDate(y, m, d)) return <NoDataFound />;

    const dateData = getCurrentDateDetails(y, m, d);

    const bg = dateData.palette.background;
    const primary = dateData.palette.primary;
    const secondary = dateData.palette.secondary;

    const gradientBg = `
        radial-gradient(circle at top left, ${hexToRgba(primary, 0.4)}, transparent 60%),
        radial-gradient(circle at bottom right, ${hexToRgba(secondary, 0.4)}, transparent 60%),
        ${bg}
    `;

    return (
        <>
            <style>{`body { background: ${gradientBg} !important; min-height: 100dvh; margin: 0; }`}</style>
            {children}
        </>
    );
}

