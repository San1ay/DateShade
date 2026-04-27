"use client";

import { useEffect, useState } from "react";
import getDayPalette from "@/lib/getDayPalette";
import hexToRgba from "@/utils/hexToRgba";

export default function BackgroundWrapper({ children }: { children: React.ReactNode }) {
    const [bg, setBg] = useState("");

    useEffect(() => {
        const update = () => {
            const today = new Date();
            const data = getDayPalette(
                today.getFullYear(),
                today.getMonth() + 1,
                today.getDate()
            );

            const gradient = `
        radial-gradient(circle at top left, ${hexToRgba(data.primary, 0.4)}, transparent 60%),
        radial-gradient(circle at bottom right, ${hexToRgba(data.secondary, 0.4)}, transparent 60%),
        ${data.background}
      `;

            setBg(gradient);
        };

        update();

        // update on tab focus (better than polling)
        document.addEventListener("visibilitychange", update);

        return () => {
            document.removeEventListener("visibilitychange", update);
        };
    }, []);

    return (
        <div style={{ background: bg, minHeight: "100dvh" }}>
            {children}
        </div>
    );
}