import { YearFact } from "@/types/year";

export async function fetchYearData(year: number): Promise<YearFact> {
    const response = await fetch(`/api/year-data?year=${year}`);

    if (!response.ok) {
        throw new Error("Failed to fetch year data from internal API");
    }

    return await response.json();
}