export type ChartType = "line" | "bar" | "area" | "pie";

export type IndicatorCategory =
    | "Health"
    | "Education"
    | "Technology"
    | "Environment"
    | "Economy"
    | "Social"
    | "Science"
    | "Other";

export type IndicatorSource = {
    name: string;
    url: string;
    lastUpdated: string;
};

export interface ProgressIndicator {
    id: string;
    name: string;
    description: string;
    category: IndicatorCategory;
    value: number;
    target?: number;
    unit: string;
    displayPrecision?: number;
    chartType: ChartType;
    source: IndicatorSource;
    historical: { year: number; value: number }[];
    color?: string;
    mapData?: { [code: string]: number }; // Optional data for map view
    invertedScale?: boolean; // True if lower values are better (e.g., poverty rate, infant mortality)
    useLogScale?: boolean; // True if the indicator should use logarithmic scale (e.g., exponential growth)
}

export type DashboardView = "cards" | "charts" | "table" | "map";

export type CategoryFilter = IndicatorCategory | "All";
