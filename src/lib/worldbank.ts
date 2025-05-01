import {
    ProgressIndicator,
    IndicatorSource,
    IndicatorCategory,
    ChartType,
} from "../types/dashboard";

// Interface for the World Bank API response structure
interface WorldBankResponseMetadata {
    page: number;
    pages: number;
    per_page: number;
    total: number;
    sourceid: string;
    lastupdated: string; // e.g., "2025-04-15"
}

interface WorldBankDataPoint {
    indicator: { id: string; value: string }; // Name/description from WB
    country: { id: string; value: string };
    countryiso3code: string;
    date: string; // Year as string
    value: number | null;
    unit: string; // Unit from WB (often empty)
    obs_status: string;
    decimal: number;
}

// Configuration for mapping WB indicators to dashboard indicators
interface IndicatorConfig {
    id: string; // Dashboard ID (from initialIndicators.ts)
    name: string; // Dashboard Name
    description: string; // Dashboard Description
    category: IndicatorCategory;
    target?: number;
    unit: string; // Dashboard unit (may differ from WB unit)
    chartType: ChartType;
    color?: string;
    valueTransform?: (wbValue: number) => number; // Optional transformation
}

// Map WB codes to our dashboard indicator configuration
// Derived from initialIndicators.ts and WB code search
const indicatorConfigMap: Record<string, IndicatorConfig> = {
    "SE.ADT.LITR.ZS": {
        // Literacy rate, adult total (% of people ages 15 and above)
        id: "global-literacy",
        name: "Global Literacy Rate",
        description:
            "Percentage of the global population aged 15 and above who can read and write.",
        category: "Education",
        target: 100,
        unit: "%",
        chartType: "line",
        color: "#06B6D4",
    },
    "EG.FEC.RNEW.ZS": {
        // Renewable energy consumption (% of total final energy consumption)
        id: "renewable-energy",
        name: "Renewable Energy Share",
        description:
            "Percentage of global final energy consumption from renewable sources.", // Adjusted description
        category: "Environment",
        target: 60,
        unit: "%",
        chartType: "area",
        color: "#22C55E",
    },
    "SP.DYN.LE00.IN": {
        // Life expectancy at birth, total (years)
        id: "life-expectancy", // Matches one of the life expectancy IDs
        name: "Global Life Expectancy",
        description: "Average number of years a newborn is expected to live.",
        category: "Health",
        target: 85, // Keep original target
        unit: "years",
        chartType: "line",
        color: "#EC4899",
    },
    "SI.POV.DDAY": {
        // Poverty headcount ratio at $2.15 a day (2017 PPP) (% of population)
        id: "extreme-poverty",
        name: "Extreme Poverty ($2.15/day)", // Updated name for clarity
        description:
            "Percentage of global population living on less than $2.15 per day (2017 PPP).", // Updated description
        category: "Economy",
        target: 0,
        unit: "%",
        chartType: "bar",
        color: "#F59E0B",
    },
    "IT.NET.USER.ZS": {
        // Individuals using the Internet (% of population)
        id: "internet-access",
        name: "Internet Penetration",
        description: "Percentage of global population with access to internet.",
        category: "Technology",
        target: 95,
        unit: "%",
        chartType: "area",
        color: "#8B5CF6",
    },
    "SH.DYN.MORT": {
        // Mortality rate, under-5 (per 1,000 live births)
        id: "child-mortality",
        name: "Child Mortality Rate",
        description:
            "Number of deaths of children under 5 years per 1,000 live births.",
        category: "Health",
        target: 0,
        unit: "per 1,000", // WB unit should match
        chartType: "line",
        color: "#EF4444",
    },
    "EN.ATM.CO2E.KT": {
        // CO2 emissions (kt)
        id: "co2-emissions",
        name: "Global CO2 Emissions",
        description: "Annual global carbon dioxide emissions.", // Simplified description
        category: "Environment",
        target: 20, // Target is in billion tons
        unit: "billion tons", // Dashboard unit
        chartType: "bar",
        color: "#64748B",
        valueTransform: (kt) => kt / 1000000, // Convert kilotons to billion tons
    },
    "SP.POP.TOTL": {
        // Population, total
        id: "global-population",
        name: "Global Population",
        description: "Total number of humans on Earth.",
        category: "Social",
        // target: undefined, // No specific target in original
        unit: "people",
        chartType: "line",
        color: "#4CAF50",
    },
    "EN.ATM.PM25.MC.M3": {
        // PM2.5 air pollution, mean annual exposure (micrograms per cubic meter)
        id: "global-aqi-pm25",
        name: "Air Quality (PM2.5)",
        description:
            "Global average concentration of fine particulate matter (PM2.5).",
        category: "Environment",
        target: 5, // WHO guideline
        unit: "µg/m³",
        chartType: "line",
        color: "#9E9E9E",
    },
    "SH.H2O.SMDW.ZS": {
        // People using safely managed drinking water services (% of population)
        id: "safely-managed-drinking-water",
        name: "Safely Managed Drinking Water",
        description:
            "Percentage of the global population using safely managed drinking water services.",
        category: "Health",
        target: 100,
        unit: "%",
        chartType: "area",
        color: "#2196F3",
    },
    "SH.STA.SMSS.ZS": {
        // People using safely managed sanitation services (% of population)
        id: "safely-managed-sanitation",
        name: "Safely Managed Sanitation",
        description:
            "Percentage of the global population using safely managed sanitation services.",
        category: "Health",
        target: 100,
        unit: "%",
        chartType: "area",
        color: "#00BCD4",
    },
    "SH.STA.OWAD.ZS": {
        // Prevalence of overweight (% of adults ages 18+)
        id: "global-obesity-overweight", // Reusing existing ID
        name: "Overweight Adults", // Changed name as WB data is only overweight
        description:
            "Percentage of adults (18+) globally who are overweight (BMI >= 25).", // Updated description
        category: "Health",
        target: 15, // Keep original target for now, but it applied to overweight+obese
        unit: "%",
        chartType: "line",
        color: "#FF9800",
    },
    // Note: Indicators like 'scientific-publications', 'world-energy-production',
    // 'global-temperature-change', 'top-supercomputer-flops', 'ecological-footprint'
    // are not directly available or easily mapped in the World Bank API and are omitted here.
    // The second 'life-expectancy' with ambitious target uses the same WB code SP.DYN.LE00.IN.
};

/**
 * Fetches data for a specific indicator from the World Bank API and transforms it.
 * @param indicatorCode The World Bank indicator code (e.g., 'SE.ADT.LITR.ZS').
 * @returns A Promise resolving to a ProgressIndicator object or null if fetching/parsing fails.
 */
export async function fetchWorldBankIndicator(
    indicatorCode: string
): Promise<ProgressIndicator | null> {
    const config = indicatorConfigMap[indicatorCode];
    if (!config) {
        console.error(
            `No configuration found for World Bank indicator code: ${indicatorCode}`
        );
        return null;
    }

    // Fetch more data points per page to potentially get more history in one request
    const url = `https://api.worldbank.org/v2/country/WLD/indicator/${indicatorCode}?format=json&per_page=100`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            // Log specific error for debugging
            const errorBody = await response.text();
            console.error(
                `HTTP error fetching ${indicatorCode}: ${response.status} ${response.statusText}`,
                errorBody
            );
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const rawData = await response.json();

        // Validate the expected structure [metadata, dataPoints[]]
        if (
            !Array.isArray(rawData) ||
            rawData.length !== 2 ||
            typeof rawData[0] !== "object" ||
            !rawData[0]?.lastupdated ||
            !Array.isArray(rawData[1])
        ) {
            console.error(
                "Invalid API response structure received for:",
                indicatorCode,
                rawData
            );
            return null;
        }

        const [metadata, dataPoints] = rawData as [
            WorldBankResponseMetadata,
            WorldBankDataPoint[]
        ];

        // Filter out null values, parse year, apply transform, and sort
        const historicalData = dataPoints
            .filter((d) => d.value !== null && d.date)
            .map((d) => ({
                year: parseInt(d.date, 10),
                // Apply transformation if defined in config, otherwise use raw value
                value: config.valueTransform
                    ? config.valueTransform(d.value!)
                    : d.value!,
            }))
            .sort((a, b) => a.year - b.year); // Ensure data is chronologically sorted

        // If no valid data points remain after filtering, return null
        if (historicalData.length === 0) {
            console.warn(
                `No valid historical data points found for indicator: ${indicatorCode}`
            );
            return null;
        }

        // Get the most recent data point for the main 'value'
        const latestDataPoint = historicalData[historicalData.length - 1];

        // Construct the source object
        const source: IndicatorSource = {
            name: "World Bank",
            url: `https://data.worldbank.org/indicator/${indicatorCode}`, // Link to the indicator's page on World Bank site
            lastUpdated: metadata.lastupdated, // Use the last updated date from API metadata
        };

        // Construct the final ProgressIndicator object using config and fetched data
        const indicator: ProgressIndicator = {
            id: config.id,
            name: config.name,
            description: config.description,
            category: config.category,
            value: latestDataPoint.value, // Latest available value
            target: config.target,
            unit: config.unit, // Use unit defined in our config
            chartType: config.chartType,
            source: source,
            historical: historicalData, // Full historical array
            color: config.color,
        };

        return indicator;
    } catch (error) {
        console.error(
            `Failed to fetch or process World Bank indicator ${indicatorCode}:`,
            error
        );
        return null; // Return null on error
    }
}

// Export the list of WB codes we have configurations for
export const worldBankIndicatorCodes = Object.keys(indicatorConfigMap);
