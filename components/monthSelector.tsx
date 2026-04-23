"use client";

import { MONTHS } from "@/utils/constants";
import { useRouter, usePathname } from "next/navigation";

export default function MonthSelector() {
    const router = useRouter();
    const pathname = usePathname();

    const navigateToMonth = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const monthIndex = e.target.value;
        if (!monthIndex) return;

        // Clean up the path (removes trailing slash if it exists)
        const basePath = pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;

        // Push to the new route (e.g., if you are on /2024, this goes to /2024/1)
        router.push(`${basePath}/${monthIndex}`);

        // Reset the select back to the placeholder after navigating
        e.target.value = "";
    };

    return (
        <select
            onChange={navigateToMonth}
            defaultValue=""
            style={{
                fontSize: "0.9rem",
                fontWeight: 300,
                fontFamily: "inherit",
                background: "transparent",
                border: "none",
                borderBottom: "1px solid currentColor",
                outline: "none",
                cursor: "pointer",
                opacity: 0.8,
                paddingBottom: "0.15rem",
            }}
        >
            <option value="" disabled>Select...</option>
            {MONTHS.map((monthName, index) => (
                <option key={monthName} value={index + 1} style={{ color: "#000" }}>
                    {monthName}
                </option>
            ))}
        </select>
    );
}