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
    chartType: ChartType;
    source: IndicatorSource;
    historical: { year: number; value: number }[];
    color?: string;
    mapData?: { [code: string]: number }; // Optional data for map view
}

export type DashboardView = "cards" | "charts" | "table" | "map";

export type CategoryFilter = IndicatorCategory | "All";
