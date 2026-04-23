export const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
export const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export const ZODIAC = [
    { sign: "Aries", symbol: "♈", element: "Fire", dates: "Mar 21 – Apr 19" },
    { sign: "Taurus", symbol: "♉", element: "Earth", dates: "Apr 20 – May 20" },
    { sign: "Gemini", symbol: "♊", element: "Air", dates: "May 21 – Jun 20" },
    { sign: "Cancer", symbol: "♋", element: "Water", dates: "Jun 21 – Jul 22" },
    { sign: "Leo", symbol: "♌", element: "Fire", dates: "Jul 23 – Aug 22" },
    { sign: "Virgo", symbol: "♍", element: "Earth", dates: "Aug 23 – Sep 22" },
    { sign: "Libra", symbol: "♎", element: "Air", dates: "Sep 23 – Oct 22" },
    { sign: "Scorpio", symbol: "♏", element: "Water", dates: "Oct 23 – Nov 21" },
    { sign: "Sagittarius", symbol: "♐", element: "Fire", dates: "Nov 22 – Dec 21" },
    { sign: "Capricorn", symbol: "♑", element: "Earth", dates: "Dec 22 – Jan 19" },
    { sign: "Aquarius", symbol: "♒", element: "Air", dates: "Jan 20 – Feb 18" },
    { sign: "Pisces", symbol: "♓", element: "Water", dates: "Feb 19 – Mar 20" },
] as const;

export const ELEMENT_COLORS: Record<string, string> = {
    Fire: "#ff6b4a",
    Earth: "#8b7355",
    Air: "#87ceeb",
    Water: "#4a90d9",
};