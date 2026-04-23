import { YearFact } from "@/types/year";

export async function fetchYearData(year: number): Promise<YearFact> {
    const summaryRes = await fetch(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${year}`,
        { headers: { Accept: "application/json" } }
    );
    const summaryData = await summaryRes.json();

    const extractRes = await fetch(
        `https://en.wikipedia.org/w/api.php?action=query&titles=${year}&prop=extracts&explaintext=true&format=json&origin=*`
    );
    const extractData = await extractRes.json();
    const pages = extractData?.query?.pages ?? {};
    const page: any = Object.values(pages)[0];
    const pageContent: string = typeof page?.extract === "string" ? page.extract : "";

    const lines = pageContent
        .split("\n")
        .map((l: string) => l.trim())
        .filter((l: string) => l.length > 20 && !l.startsWith("=="));

    return {
        summary: summaryData?.extract ?? "No summary available.",
        events: lines.slice(0, 5),
        births: lines.slice(5, 10),
        deaths: lines.slice(10, 15),
    };
}