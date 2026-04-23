export type ZodiacEntry = {
    sign: string;
    symbol: string;
    element: string;
    dates: string;
    description: string;
    prediction: string;
};

export type YearFact = {
    summary: string;
    events: string[];
    births: string[];
    deaths: string[];
};