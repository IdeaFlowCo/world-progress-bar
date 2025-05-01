import { ProgressIndicator } from "../types/dashboard";

export const initialIndicators: ProgressIndicator[] = [
    {
        id: "global-literacy",
        name: "Global Literacy Rate",
        description:
            "Percentage of the global population aged 15 and above who can read and write.",
        category: "Education",
        value: 87, // Estimated from OWID chart
        target: 100,
        unit: "%",
        chartType: "line",
        source: {
            name: "Our World in Data",
            url: "https://ourworldindata.org/literacy",
            lastUpdated: "2025-04-29 (Estimated from OWID chart)",
        },
        historical: [
            // Estimated from OWID chart
            { year: 1970, value: 60 },
            { year: 1980, value: 68 },
            { year: 1990, value: 74 },
            { year: 2000, value: 80 },
            { year: 2010, value: 84 },
            { year: 2020, value: 87 },
            { year: 2023, value: 87 }, // Using latest estimate for 2023 as well
        ],
        color: "#06B6D4",
    },
    {
        id: "renewable-energy",
        name: "Renewable Energy Share",
        description:
            "Percentage of global energy consumption from renewable sources.",
        category: "Environment",
        value: 29,
        target: 60,
        unit: "%",
        chartType: "area",
        source: {
            name: "Our World in Data",
            url: "https://ourworldindata.org/renewable-energy",
            lastUpdated: "2024", // Placeholder - Verify on OWID
        },
        historical: [
            { year: 1990, value: 17 },
            { year: 2000, value: 18 },
            { year: 2010, value: 20 },
            { year: 2015, value: 23 },
            { year: 2020, value: 26 },
            { year: 2023, value: 29 },
        ],
        color: "#22C55E",
    },
    {
        id: "life-expectancy", // Keep original ID
        name: "Global Life Expectancy", // Keep original name
        description: "Average life expectancy at birth, globally.", // Use description from ambitious
        category: "Health",
        value: 73.4, // Approx 2023/2024
        target: 120, // Use ambitious target
        unit: "years",
        chartType: "line",
        source: {
            name: "Our World in Data", // Use source from ambitious
            url: "https://ourworldindata.org/life-expectancy",
            lastUpdated: "2024", // Placeholder - Verify on OWID
        },
        historical: [
            // Use historical from ambitious
            { year: 2000, value: 66.8 },
            { year: 2010, value: 70.0 },
            { year: 2019, value: 73.3 }, // Pre-pandemic peak
            { year: 2023, value: 73.4 }, // Recovery
        ],
        color: "#E91E63", // Use color from ambitious
    },
    {
        id: "extreme-poverty",
        name: "Extreme Poverty",
        description:
            "Percentage of global population living on less than $1.90 per day.",
        category: "Economy",
        value: 8.4,
        target: 0,
        unit: "%",
        chartType: "bar",
        source: {
            name: "Our World in Data",
            url: "https://ourworldindata.org/extreme-poverty",
            lastUpdated: "2024", // Placeholder - Verify on OWID
        },
        historical: [
            { year: 1990, value: 36 },
            { year: 2000, value: 29 },
            { year: 2010, value: 16 },
            { year: 2015, value: 10.1 },
            { year: 2020, value: 9.2 },
            { year: 2023, value: 8.4 },
        ],
        color: "#F59E0B",
    },
    {
        id: "internet-access",
        name: "Internet Penetration",
        description: "Percentage of global population with access to internet.",
        category: "Technology",
        value: 65.7,
        target: 95,
        unit: "%",
        chartType: "area",
        source: {
            name: "Our World in Data",
            url: "https://ourworldindata.org/internet",
            lastUpdated: "2024", // Placeholder - Verify on OWID
        },
        historical: [
            { year: 2000, value: 6.8 },
            { year: 2005, value: 16 },
            { year: 2010, value: 29 },
            { year: 2015, value: 43 },
            { year: 2020, value: 59 },
            { year: 2023, value: 65.7 },
        ],
        color: "#8B5CF6",
    },
    {
        id: "child-mortality",
        name: "Child Mortality Rate",
        description:
            "Number of deaths of children under 5 years per 1,000 live births.",
        category: "Health",
        value: 38,
        target: 0,
        unit: "per 1,000",
        chartType: "line",
        source: {
            name: "Our World in Data",
            url: "https://ourworldindata.org/child-mortality",
            lastUpdated: "2024", // Placeholder - Verify on OWID
        },
        historical: [
            { year: 1990, value: 93 },
            { year: 2000, value: 77 },
            { year: 2010, value: 52 },
            { year: 2020, value: 40 },
            { year: 2023, value: 38 },
        ],
        color: "#EF4444",
    },
    {
        id: "co2-emissions",
        name: "Global CO2 Emissions",
        description:
            "Annual global carbon dioxide emissions in billions of tons.",
        category: "Environment",
        value: 36.4,
        target: 20,
        unit: "billion tons",
        chartType: "bar",
        source: {
            name: "Our World in Data",
            url: "https://ourworldindata.org/co2-emissions",
            lastUpdated: "2024", // Placeholder - Verify on OWID
        },
        historical: [
            { year: 1990, value: 22.7 },
            { year: 2000, value: 25.2 },
            { year: 2010, value: 33.1 },
            { year: 2015, value: 35.5 },
            { year: 2020, value: 34.8 },
            { year: 2023, value: 36.4 },
        ],
        color: "#64748B",
    },
    {
        id: "scientific-publications",
        name: "Scientific Publications",
        description:
            "Annual number of peer-reviewed scientific papers published worldwide (in millions).",
        category: "Science",
        value: 2.9,
        unit: "million papers",
        chartType: "line",
        source: {
            name: "Our World in Data", // Often uses Scimago data
            url: "https://ourworldindata.org/grapher/articles-published-in-scientific-journals",
            lastUpdated: "2024", // Placeholder - Verify on OWID
        },
        historical: [
            { year: 2000, value: 1.1 },
            { year: 2005, value: 1.5 },
            { year: 2010, value: 1.9 },
            { year: 2015, value: 2.3 },
            { year: 2020, value: 2.7 },
            { year: 2023, value: 2.9 },
        ],
        color: "#06B6D4",
    },
    {
        id: "global-population",
        name: "Global Population",
        description: "Total number of humans on Earth.",
        category: "Social",
        value: 8100000000, // Approx 8.1 Billion as of early 2024
        unit: "people",
        chartType: "line",
        source: {
            name: "Our World in Data",
            url: "https://ourworldindata.org/population-growth",
            lastUpdated: "2024", // Placeholder - Verify on OWID
        },
        historical: [
            { year: 2000, value: 6143493823 },
            { year: 2010, value: 6956823603 },
            { year: 2020, value: 7794798739 },
            { year: 2024, value: 8100000000 },
        ],
        color: "#4CAF50", // Green
    },
    {
        id: "world-energy-production",
        name: "World Energy Production",
        description:
            "Total primary energy supply generated globally, measured in Watts. Target is Kardashev Tier 1.",
        category: "Technology",
        value: 1.9e13, // Approx 600 EJ/year ~ 1.9e13 Watts (using 2021/2022 data)
        target: 7e17, // 7x10^17 Watts (Kardashev Tier 1)
        unit: "Watts",
        chartType: "area",
        source: {
            name: "Our World in Data", // OWID often uses BP/Ember/IEA data
            url: "https://ourworldindata.org/energy-production-consumption",
            lastUpdated: "2024", // Placeholder - Verify on OWID
        },
        historical: [
            { year: 1900, value: 2.1e12 }, // ~22 EJ/year, based on Smil data
            { year: 1920, value: 3.2e12 }, // ~33 EJ/year
            { year: 1940, value: 4.0e12 }, // ~40 EJ/year
            { year: 1950, value: 5.5e12 }, // ~55 EJ/year
            { year: 1960, value: 7.5e12 }, // ~75 EJ/year
            { year: 1970, value: 1.1e13 }, // ~110 EJ/year
            { year: 1980, value: 1.3e13 }, // ~130 EJ/year
            { year: 1990, value: 1.4e13 }, // ~140 EJ/year
            { year: 2000, value: 1.5e13 }, // ~150 EJ/year
            { year: 2010, value: 1.7e13 }, // ~170 EJ/year
            { year: 2020, value: 1.85e13 }, // ~185 EJ/year, accounting for COVID dip
            { year: 2022, value: 1.9e13 }, // ~190 EJ/year
        ],
        color: "#FFC107", // Amber
    },
    {
        id: "global-temperature-change",
        name: "Global Temperature Change",
        description:
            "Average global surface temperature increase compared to pre-industrial levels (1850-1900). Target is Paris Agreement goal.",
        category: "Environment",
        value: 1.45, // Approx +1.45°C in 2023 (WMO)
        target: 1.5, // Target: <= 1.5°C increase
        unit: "°C",
        chartType: "line",
        source: {
            name: "Our World in Data", // OWID uses Berkeley Earth, NASA GISTEMP, etc.
            url: "https://ourworldindata.org/temperature-anomaly",
            lastUpdated: "2024", // Placeholder - Verify on OWID
        },
        historical: [
            { year: 2000, value: 0.64 },
            { year: 2010, value: 0.73 },
            { year: 2020, value: 1.02 },
            { year: 2023, value: 1.45 },
        ],
        color: "#F44336", // Red
    },
    {
        id: "global-aqi-pm25",
        name: "Air Quality (PM2.5)",
        description:
            "Global average concentration of fine particulate matter (PM2.5). Target is WHO guideline.",
        category: "Environment",
        value: 25, // Approx global average in recent years
        target: 5, // WHO annual guideline limit
        unit: "µg/m³",
        chartType: "line",
        source: {
            name: "Our World in Data",
            url: "https://ourworldindata.org/air-pollution",
            lastUpdated: "2024", // Placeholder - Verify on OWID
        },
        historical: [
            { year: 2010, value: 30 },
            { year: 2015, value: 28 },
            { year: 2020, value: 26 },
            { year: 2023, value: 25 },
        ],
        color: "#9E9E9E", // Grey
    },
    {
        id: "safely-managed-drinking-water",
        name: "Safely Managed Drinking Water",
        description:
            "Percentage of the global population using safely managed drinking water services.",
        category: "Health",
        value: 73, // 2022 data
        target: 100,
        unit: "%",
        chartType: "area",
        source: {
            name: "Our World in Data", // OWID uses WHO/UNICEF JMP data
            url: "https://ourworldindata.org/water-access",
            lastUpdated: "2024", // Placeholder - Verify on OWID
        },
        historical: [
            { year: 2000, value: 61 },
            { year: 2010, value: 67 },
            { year: 2015, value: 70 },
            { year: 2022, value: 73 },
        ],
        color: "#2196F3", // Blue
    },
    {
        id: "top-supercomputer-flops",
        name: "Global Compute (Leading Edge)",
        description:
            "Processing power of the world's fastest supercomputer, serving as a proxy for the leading edge of global compute capacity.",
        category: "Technology",
        value: 1.2e18, // Frontier ~1.2 ExaFLOPS (June 2024)
        target: 1e21, // Target: 1 ZettaFLOPS
        unit: "FLOPS",
        chartType: "line",
        source: {
            name: "TOP500.org (Proxy)",
            url: "https://www.top500.org/lists/top500/",
            lastUpdated: "2024",
        },
        historical: [
            { year: 1956, value: 1.8e4 }, // IBM NORC ~18 KFLOPS
            { year: 1964, value: 3e6 }, // CDC 6600 ~3 MFLOPS
            { year: 1976, value: 1.6e8 }, // Cray-1 ~160 MFLOPS
            { year: 1985, value: 1.9e9 }, // Cray-2 ~1.9 GFLOPS
            { year: 1993, value: 1.24e11 }, // Fujitsu Numerical Wind Tunnel ~124 GFLOPS
            { year: 1997, value: 1.34e12 }, // Intel ASCI Red ~1.34 TFLOPS
            { year: 2000, value: 7.23e12 }, // IBM ASCI White ~7.23 TFLOPS
            { year: 2002, value: 3.59e13 }, // NEC Earth Simulator ~35.9 TFLOPS
            { year: 2005, value: 2.81e14 }, // IBM Blue Gene/L ~281 TFLOPS
            { year: 2008, value: 1.11e15 }, // IBM Roadrunner ~1.11 PFLOPS
            { year: 2011, value: 1.05e16 }, // Fujitsu K Computer ~10.5 PFLOPS
            { year: 2013, value: 3.39e16 }, // NUDT Tianhe-2 ~33.9 PFLOPS
            { year: 2016, value: 9.3e16 }, // Sunway TaihuLight ~93 PFLOPS
            { year: 2018, value: 1.22e17 }, // IBM Summit ~122 PFLOPS
            { year: 2020, value: 4.42e17 }, // Fugaku ~442 PFLOPS
            { year: 2022, value: 1.2e18 }, // Frontier ~1.2 EFLOPS
        ],
        color: "#673AB7", // Deep Purple
    },
    {
        id: "ecological-footprint",
        name: "Ecological Footprint",
        description:
            "Humanity's demand on nature, measured in number of Earths required. Target is sustainability (1 Earth).",
        category: "Environment",
        value: 1.7, // Approx current estimate
        target: 1.0,
        unit: "Earths",
        chartType: "area",
        source: {
            name: "Our World in Data", // Uses Global Footprint Network data
            url: "https://ourworldindata.org/ecological-footprint",
            lastUpdated: "2024", // Placeholder - Verify on OWID
        },
        historical: [
            { year: 1970, value: 1.0 },
            { year: 2000, value: 1.4 },
            { year: 2010, value: 1.6 },
            { year: 2023, value: 1.7 },
        ],
        color: "#795548", // Brown
    },
    {
        id: "safely-managed-sanitation",
        name: "Safely Managed Sanitation",
        description:
            "Percentage of the global population using safely managed sanitation services.",
        category: "Health",
        value: 57, // 2022 data
        target: 100,
        unit: "%",
        chartType: "area",
        source: {
            name: "Our World in Data", // OWID uses WHO/UNICEF JMP data
            url: "https://ourworldindata.org/sanitation",
            lastUpdated: "2024", // Placeholder - Verify on OWID
        },
        historical: [
            { year: 2000, value: 28 },
            { year: 2010, value: 40 },
            { year: 2015, value: 47 },
            { year: 2022, value: 57 },
        ],
        color: "#00BCD4", // Cyan
    },
    {
        id: "global-obesity-overweight",
        name: "Obesity & Overweight Adults",
        description:
            "Percentage of adults (18+) globally who are overweight or obese.",
        category: "Health",
        value: 40, // Approx 40% (overweight + obese) based on WHO data/trends
        target: 15, // Example target for significant reduction
        unit: "%",
        chartType: "line",
        source: {
            name: "Our World in Data", // OWID uses NCD-RisC data
            url: "https://ourworldindata.org/obesity",
            lastUpdated: "2024", // Placeholder - Verify on OWID
        },
        historical: [
            { year: 1975, value: 21 }, // Based on NCD-RisC data
            { year: 1980, value: 23 }, // Based on NCD-RisC data
            { year: 1985, value: 25 }, // Based on NCD-RisC data
            { year: 1990, value: 27 }, // Based on NCD-RisC data
            { year: 1995, value: 30 }, // Based on NCD-RisC data
            { year: 2000, value: 33.7 }, // Based on NCD-RisC data
            { year: 2005, value: 36.5 }, // Based on NCD-RisC data
            { year: 2010, value: 38.5 }, // Based on NCD-RisC data
            { year: 2016, value: 39.8 }, // Last major WHO global report value
            { year: 2022, value: 40.5 }, // Based on NCD-RisC data
        ],
        color: "#FF9800", // Orange
    },
];
