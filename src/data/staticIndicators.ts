// src/data/staticIndicators.ts
import { ProgressIndicator } from "../types/dashboard";
import { ghiData2024 } from "./ghiData"; // Import GHI data
import { m2Data } from "./m2Data";

// Constants from original staticIndicators.ts
const costPerFlopHistorical: { year: number; value: number }[] = [
    { year: 1945, value: 2.2094e4 },
    { year: 1961, value: 196.472 },
    { year: 1964, value: 23.318 },
    { year: 1984, value: 5.6748e-2 },
    { year: 1997, value: 5.8762e-5 },
    { year: 2000, value: 1.855e-6 },
    { year: 2003, value: 1.4334e-7 },
    { year: 2007, value: 7.326e-8 },
    { year: 2011, value: 2.52e-9 },
    { year: 2012, value: 1.0272e-9 },
    { year: 2013, value: 2.926e-10 },
    { year: 2015, value: 1.041e-10 },
    { year: 2017, value: 7.7e-11 },
    { year: 2020, value: 3.82e-11 },
    { year: 2022, value: 2.08e-11 },
    { year: 2023, value: 1.29e-11 },
];

const costPerFlopIndicator: ProgressIndicator = {
    id: "cost-per-flop",
    name: "Cost per FLOP",
    description:
        "Estimated cost in USD (2024$) per floating-point operation per second.",
    category: "Technology",
    value: costPerFlopHistorical[costPerFlopHistorical.length - 1].value,
    target: 0,
    unit: "$/FLOP",
    displayPrecision: 3,
    chartType: "line",
    source: {
        name: "Wikipedia/Various",
        url: "https://en.wikipedia.org/wiki/FLOPS#Hardware_costs",
        lastUpdated: "2023-12-31", // Reflects latest data year 2023
    },
    historical: costPerFlopHistorical,
    color: "#FF5722",
};

const aiTrainingComputeHistorical: { year: number; value: number }[] = [
    { year: 1952, value: 2.0e6 },
    { year: 1957, value: 6.948949377361819e11 },
    { year: 1959, value: 4.284e11 },
    { year: 1962, value: 1.55925e12 },
    { year: 1963, value: 2.25e7 },
    { year: 1965, value: 1.08e6 },
    { year: 1966, value: 1.0591706e8 },
    { year: 1968, value: 6.9e16 },
    { year: 1969, value: 2.45e9 },
    { year: 1970, value: 1.805e11 },
    { year: 1973, value: 3.57e8 },
    { year: 1975, value: 5.76e6 },
    { year: 1976, value: 1.2e12 },
    { year: 1977, value: 6.9e16 },
    { year: 1979, value: 9.81e8 },
    { year: 1980, value: 1.955448e11 },
    { year: 1981, value: 4.096e9 },
    { year: 1982, value: 9.9e9 },
    { year: 1983, value: 3.24e8 },
    { year: 1984, value: 9.315e9 },
    { year: 1986, value: 3.888e11 },
    { year: 1987, value: 2.832800256e10 },
    { year: 1988, value: 2.96425e8 },
    { year: 1989, value: 1.0548576e10 },
    { year: 1990, value: 1.955448e11 },
    { year: 1991, value: 7.5474e10 },
    { year: 1992, value: 5.346e7 },
    { year: 1993, value: 1.2869570138112e13 },
    { year: 1994, value: 8.58730812676e11 },
    { year: 1995, value: 4.536e11 },
    { year: 1996, value: 7.2576e10 },
    { year: 1997, value: 9.6048e12 },
    { year: 2000, value: 5.181e13 },
    { year: 2001, value: 6.3e13 },
    { year: 2002, value: 1.446336e19 },
    { year: 2003, value: 6.339e15 },
    { year: 2004, value: 2.78208e15 },
    { year: 2005, value: 2.96425e8 },
    { year: 2006, value: 9.6048e12 },
    { year: 2007, value: 1.4494464e18 },
    { year: 2008, value: 1.15848e14 },
    { year: 2009, value: 9.6048e12 },
    { year: 2010, value: 1.30788e14 },
    { year: 2011, value: 1.422e16 },
    { year: 2012, value: 1.8144e11 },
    { year: 2013, value: 1.07e20 },
    { year: 2014, value: 5.6e19 },
    { year: 2015, value: 1.041408e19 },
    { year: 2016, value: 1.053486e16 },
    { year: 2017, value: 1.1e23 },
    { year: 2018, value: 1.8144e22 },
    { year: 2019, value: 1.17e24 },
    { year: 2020, value: 3.14e23 },
    { year: 2021, value: 8.1e22 },
    { year: 2022, value: 5.0000000001e25 },
    { year: 2023, value: 3.866e24 },
    { year: 2024, value: 4.64e26 },
];

const aiTrainingComputeIndicator: ProgressIndicator = {
    id: "ai-training-compute",
    name: "AI Training Compute",
    description:
        "Estimated training compute (FLOP) used for notable AI models over time.",
    category: "Technology",
    value: aiTrainingComputeHistorical[aiTrainingComputeHistorical.length - 1]
        .value,
    target: 1e30,
    unit: "FLOP",
    displayPrecision: 0,
    chartType: "line",
    source: {
        name: "Epoch AI",
        url: "https://epoch.ai/data/notable-ai-models",
        lastUpdated: "2024-12-31", // Reflects latest data year 2024
    },
    historical: aiTrainingComputeHistorical,
    color: "#9C27B0",
};

const solarCostHistorical: { year: number; value: number }[] = [
    { year: 1975, value: 130.70473 },
    { year: 1976, value: 98.34036 },
    { year: 1977, value: 71.74392 },
    { year: 1978, value: 50.75924 },
    { year: 1979, value: 42.64987 },
    { year: 1980, value: 36.14291 },
    { year: 1981, value: 28.896935 },
    { year: 1982, value: 25.963253 },
    { year: 1983, value: 20.960136 },
    { year: 1984, value: 19.476036 },
    { year: 1985, value: 17.003012 },
    { year: 1986, value: 14.06487 },
    { year: 1987, value: 11.957518 },
    { year: 1988, value: 11.168822 },
    { year: 1989, value: 11.54249 },
    { year: 1990, value: 11.93852 },
    { year: 1991, value: 11.059409 },
    { year: 1992, value: 10.303393 },
    { year: 1993, value: 9.635484 },
    { year: 1994, value: 9.114998 },
    { year: 1995, value: 8.427791 },
    { year: 1996, value: 7.879105 },
    { year: 1997, value: 7.8516297 },
    { year: 1998, value: 7.075107 },
    { year: 1999, value: 6.5357065 },
    { year: 2000, value: 6.413889 },
    { year: 2001, value: 6.2051206 },
    { year: 2002, value: 5.6747065 },
    { year: 2003, value: 5.3948364 },
    { year: 2004, value: 4.520986 },
    { year: 2005, value: 4.569292 },
    { year: 2006, value: 4.9804997 },
    { year: 2007, value: 5.017387 },
    { year: 2008, value: 4.5726914 },
    { year: 2009, value: 3.0563195 },
    { year: 2010, value: 2.388455 },
    { year: 2011, value: 1.9594005 },
    { year: 2012, value: 1.0559267 },
    { year: 2013, value: 0.81395847 },
    { year: 2014, value: 0.75022864 },
    { year: 2015, value: 0.697721 },
    { year: 2016, value: 0.64478046 },
    { year: 2017, value: 0.5409895 },
    { year: 2018, value: 0.48153684 },
    { year: 2019, value: 0.44111046 },
    { year: 2020, value: 0.34971163 },
    { year: 2021, value: 0.31517783 },
    { year: 2022, value: 0.34740946 },
    { year: 2023, value: 0.3056964 },
];

const solarCostIndicator: ProgressIndicator = {
    id: "solar-cost-per-watt",
    name: "Solar Cost per Watt",
    description: "Price of solar photovoltaic modules per watt (in 2023 USD).",
    category: "Environment",
    value: solarCostHistorical[solarCostHistorical.length - 1].value,
    target: 0.1,
    unit: "$/Watt",
    displayPrecision: 3,
    chartType: "line",
    source: {
        name: "Our World in Data (Lafond et al., 2022; IEA; IRENA)",
        url: "https://ourworldindata.org/grapher/solar-pv-prices-vs-cumulative-capacity",
        lastUpdated: "2023-12-31", // Reflects latest data year 2023
    },
    historical: solarCostHistorical,
    color: "#FFEB3B",
};

const globalGDPHistorical: { year: number; value: number }[] = [
    { year: 1, value: 0.2477 },
    { year: 1000, value: 0.284845 },
    { year: 1500, value: 0.583567 },
    { year: 1600, value: 0.778676 },
    { year: 1700, value: 0.872006 },
    { year: 1820, value: 1.629764 },
    { year: 1850, value: 2.145094 },
    { year: 1870, value: 2.722541 },
    { year: 1900, value: 4.859288 },
    { year: 1920, value: 6.691714 },
    { year: 1940, value: 10.605461 },
    { year: 1950, value: 11.735313 },
    { year: 1960, value: 18.498559 },
    { year: 1970, value: 30.431235 },
    { year: 1980, value: 44.356639 },
    { year: 1990, value: 59.683241845519 },
    { year: 1991, value: 60.179640681588 },
    { year: 1992, value: 60.94665993961 },
    { year: 1993, value: 61.864460862479 },
    { year: 1994, value: 63.502839668307 },
    { year: 1995, value: 65.45600621173 },
    { year: 1996, value: 67.866915606348 },
    { year: 1997, value: 70.542423492905 },
    { year: 1998, value: 72.304024180597 },
    { year: 1999, value: 74.913465980237 },
    { year: 2000, value: 78.498116951721 },
    { year: 2001, value: 80.389086115142 },
    { year: 2002, value: 82.59253846134 },
    { year: 2003, value: 85.613945918094 },
    { year: 2004, value: 90.006680388487 },
    { year: 2005, value: 94.114218698679 },
    { year: 2006, value: 98.997584880647 },
    { year: 2007, value: 104.138586822251 },
    { year: 2008, value: 107.031545827977 },
    { year: 2009, value: 106.267684213747 },
    { year: 2010, value: 111.673083587202 },
    { year: 2011, value: 116.057188417729 },
    { year: 2012, value: 119.652160445026 },
    { year: 2013, value: 123.521031707236 },
    { year: 2014, value: 127.741620077233 },
    { year: 2015, value: 131.974388543721 },
    { year: 2016, value: 136.254639900253 },
    { year: 2017, value: 141.437674595156 },
    { year: 2018, value: 146.593661948011 },
    { year: 2019, value: 150.88487299772 },
    { year: 2020, value: 146.612584913446 },
    { year: 2021, value: 156.069829566399 },
    { year: 2022, value: 161.375691957332 },
    { year: 2023, value: 166.646563670723 },
];

const globalGDPIndicator: ProgressIndicator = {
    id: "global-gdp",
    name: "Global GDP",
    description:
        "Global Gross Domestic Product in trillions of constant 2017 international dollars.",
    category: "Economy",
    value: globalGDPHistorical[globalGDPHistorical.length - 1].value,
    target: 200,
    unit: "Trillion $",
    displayPrecision: 2,
    chartType: "line",
    source: {
        name: "Our World in Data (Maddison Project Database 2020 & IMF WEO (Oct 2023))",
        url: "https://ourworldindata.org/grapher/global-gdp-over-the-long-run",
        lastUpdated: "2023-10-01", // Reflects latest data year 2023
    },
    historical: globalGDPHistorical,
    color: "#4CAF50",
};

const globalLifeExpectancyHistorical: { year: number; value: number }[] = [
    { year: 1770, value: 28.5 },
    { year: 1800, value: 28.5 },
    { year: 1820, value: 29 },
    { year: 1850, value: 29.3 },
    { year: 1870, value: 29.7 },
    { year: 1900, value: 32 },
    { year: 1913, value: 34.1 },
    { year: 1950, value: 46.3944 },
    { year: 1951, value: 47.1259 },
    { year: 1952, value: 48.2183 },
    { year: 1953, value: 48.809 },
    { year: 1954, value: 49.6514 },
    { year: 1955, value: 50.2055 },
    { year: 1956, value: 50.7373 },
    { year: 1957, value: 51.0636 },
    { year: 1958, value: 51.6151 },
    { year: 1959, value: 49.5818 },
    { year: 1960, value: 47.8198 },
    { year: 1961, value: 50.3459 },
    { year: 1962, value: 53.2416 },
    { year: 1963, value: 53.7161 },
    { year: 1964, value: 54.2603 },
    { year: 1965, value: 53.9975 },
    { year: 1966, value: 54.5644 },
    { year: 1967, value: 55.0678 },
    { year: 1968, value: 55.6181 },
    { year: 1969, value: 55.9999 },
    { year: 1970, value: 56.2664 },
    { year: 1971, value: 56.0193 },
    { year: 1972, value: 57.2155 },
    { year: 1973, value: 57.6923 },
    { year: 1974, value: 58.0614 },
    { year: 1975, value: 58.2681 },
    { year: 1976, value: 58.5754 },
    { year: 1977, value: 59.1539 },
    { year: 1978, value: 59.5129 },
    { year: 1979, value: 60.1571 },
    { year: 1980, value: 60.502 },
    { year: 1981, value: 60.9187 },
    { year: 1982, value: 61.3435 },
    { year: 1983, value: 61.5211 },
    { year: 1984, value: 61.8663 },
    { year: 1985, value: 62.2092 },
    { year: 1986, value: 62.7297 },
    { year: 1987, value: 63.1809 },
    { year: 1988, value: 63.3672 },
    { year: 1989, value: 63.7817 },
    { year: 1990, value: 63.955 },
    { year: 1991, value: 64.0642 },
    { year: 1992, value: 64.2879 },
    { year: 1993, value: 64.4334 },
    { year: 1994, value: 64.2995 },
    { year: 1995, value: 64.8817 },
    { year: 1996, value: 65.1995 },
    { year: 1997, value: 65.5406 },
    { year: 1998, value: 65.7408 },
    { year: 1999, value: 66.0412 },
    { year: 2000, value: 66.4333 },
    { year: 2001, value: 66.7531 },
    { year: 2002, value: 67.068 },
    { year: 2003, value: 67.4015 },
    { year: 2004, value: 67.7449 },
    { year: 2005, value: 68.1405 },
    { year: 2006, value: 68.6137 },
    { year: 2007, value: 69.0316 },
    { year: 2008, value: 69.3017 },
    { year: 2009, value: 69.6812 },
    { year: 2010, value: 70.089 },
    { year: 2011, value: 70.4033 },
    { year: 2012, value: 70.824 },
    { year: 2013, value: 71.1417 },
    { year: 2014, value: 71.4038 },
    { year: 2015, value: 71.606 },
    { year: 2016, value: 71.8768 },
    { year: 2017, value: 72.067 },
    { year: 2018, value: 72.3885 },
    { year: 2019, value: 72.6093 },
    { year: 2020, value: 71.9166 },
    { year: 2021, value: 70.865 },
    { year: 2022, value: 72.6398 },
    { year: 2023, value: 73.1694 },
];

const globalLifeExpectancyIndicator: ProgressIndicator = {
    id: "global-life-expectancy",
    name: "Global Life Expectancy",
    description: "Average life expectancy at birth across the world.",
    category: "Health",
    value: globalLifeExpectancyHistorical[
        globalLifeExpectancyHistorical.length - 1
    ].value,
    target: 85,
    unit: "years",
    displayPrecision: 1,
    chartType: "line",
    source: {
        name: "Our World in Data (UN WPP, IHME)", // IHME also a major source for OWID here
        url: "https://ourworldindata.org/life-expectancy",
        lastUpdated: "2023-12-31", // Reflects latest data year 2023
    },
    historical: globalLifeExpectancyHistorical,
    color: "#4CAF50",
};

const genderInequalityIndexHistorical: { year: number; value: number }[] = [
    { year: 1990, value: 0.4240022895 },
    { year: 1991, value: 0.4192736802 },
    { year: 1992, value: 0.4147799139 },
    { year: 1993, value: 0.4155122675 },
    { year: 1994, value: 0.4143201709 },
    { year: 1995, value: 0.4348497607 },
    { year: 1996, value: 0.4299137706 },
    { year: 1997, value: 0.4246037026 },
    { year: 1998, value: 0.4271796613 },
    { year: 1999, value: 0.4226635479 },
    { year: 2000, value: 0.4268457586 },
    { year: 2001, value: 0.4204117904 },
    { year: 2002, value: 0.4155694577 },
    { year: 2003, value: 0.4160543272 },
    { year: 2004, value: 0.4100980632 },
    { year: 2005, value: 0.4101359253 },
    { year: 2006, value: 0.4015093834 },
    { year: 2007, value: 0.3917406796 },
    { year: 2008, value: 0.392260301 },
    { year: 2009, value: 0.3881212284 },
    { year: 2010, value: 0.3878306755 },
    { year: 2011, value: 0.3831563135 },
    { year: 2012, value: 0.3768367137 },
    { year: 2013, value: 0.3677382772 },
    { year: 2014, value: 0.3640856492 },
    { year: 2015, value: 0.3616413936 },
    { year: 2016, value: 0.3555229328 },
    { year: 2017, value: 0.3477355218 },
    { year: 2018, value: 0.3490217308 },
    { year: 2019, value: 0.3451920909 },
    { year: 2020, value: 0.3425298184 },
    { year: 2021, value: 0.3429947395 },
    { year: 2022, value: 0.3383485432 },
];

const genderInequalityIndexIndicator: ProgressIndicator = {
    id: "gender-inequality-index",
    name: "Gender Inequality Index (GII)",
    description:
        "GII is a composite metric of gender inequality using three dimensions: reproductive health, empowerment and the labour market.",
    category: "Social",
    value: genderInequalityIndexHistorical[
        genderInequalityIndexHistorical.length - 1
    ].value,
    target: 0.1,
    unit: "Index Score",
    displayPrecision: 3,
    chartType: "line",
    source: {
        name: "Our World in Data (UNDP HDR)", // UNDP Human Development Report
        url: "https://ourworldindata.org/grapher/gender-inequality-index-from-the-human-development-report",
        lastUpdated: "2023-03-13", // Date of 2021/2022 HDR release (containing 2022 GII data)
    },
    historical: genderInequalityIndexHistorical,
    color: "#E91E63",
};

const globalHappinessIndicator: ProgressIndicator = {
    id: "global-happiness-index",
    name: "Global Happiness Index (2024)",
    description:
        "World Happiness Report score (Ladder score) indicating subjective well-being. Shows data for highest scoring country (Finland).",
    category: "Social",
    value: 7.741, // WHR 2024 value for Finland (page 20 of report pdf)
    target: 8.0,
    unit: "Score",
    displayPrecision: 3,
    chartType: "bar", // Intended for map, but historical can be line
    source: {
        name: "World Happiness Report 2024",
        url: "https://worldhappiness.report/ed/2024/",
        lastUpdated: "2024-03-20", // Publication date of WHR 2024
    },
    mapData: ghiData2024,
    color: "#FFCA28",
    historical: [
        // Historical data for highest scoring country (Finland) from various WHR editions
        { year: 2020, value: 7.809 }, // WHR 2020 (Finland)
        { year: 2021, value: 7.842 }, // WHR 2021 (Finland)
        { year: 2022, value: 7.821 }, // WHR 2022 (Finland)
        { year: 2023, value: 7.804 }, // WHR 2023 (Finland)
        { year: 2024, value: 7.741 }, // WHR 2024 (Finland)
    ],
};

// Combined list of all indicators
export const staticIndicators: ProgressIndicator[] = [
    costPerFlopIndicator,
    aiTrainingComputeIndicator,
    globalGDPIndicator,
    globalLifeExpectancyIndicator,
    solarCostIndicator,
    {
        id: "global-literacy",
        name: "Global Literacy Rate",
        description:
            "Percentage of the global population aged 15 and above who can read and write.",
        category: "Education",
        value: 87.0, // OWID via UNESCO, 2022 data
        target: 100,
        unit: "%",
        displayPrecision: 1,
        chartType: "line",
        source: {
            name: "Our World in Data (UNESCO UIS)",
            url: "https://ourworldindata.org/literacy",
            lastUpdated: "2024-03-01", // Approx date when 2022 UIS data might be consolidated by OWID
        },
        historical: [
            { year: 1970, value: 55.7 }, // UNESCO data via OWID
            { year: 1980, value: 68.9 },
            { year: 1990, value: 75.2 },
            { year: 2000, value: 81.7 },
            { year: 2010, value: 84.1 },
            { year: 2020, value: 86.8 },
            { year: 2022, value: 87.0 }, // Latest UNESCO via OWID for 2022
        ],
        color: "#06B6D4",
    },
    {
        id: "renewable-energy",
        name: "Renewable Energy Share",
        description:
            "Share of gross final energy consumption from renewable sources.",
        category: "Environment",
        value: 20.4, // IEA Key World Energy Statistics 2023 (for 2021 data, total final consumption)
        // Ember shows ~30% of electricity for 2023. This is for TOTAL energy.
        target: 60,
        unit: "%",
        displayPrecision: 1,
        chartType: "area",
        source: {
            name: "Our World in Data (IEA, Ember, REN21)",
            url: "https://ourworldindata.org/renewable-energy",
            lastUpdated: "2023-09-01", // For IEA KWES 2023 (with 2021/2022 data)
        },
        historical: [
            // Based on IEA data for share in Total Final Consumption
            { year: 1990, value: 17.8 },
            { year: 2000, value: 17.0 },
            { year: 2010, value: 18.0 },
            { year: 2015, value: 19.1 },
            { year: 2020, value: 20.1 }, // IEA data for 2020
            { year: 2021, value: 20.4 }, // IEA data for 2021
        ],
        color: "#22C55E",
    },
    {
        id: "extreme-poverty",
        name: "Extreme Poverty ($2.15 a day)",
        description:
            "Percentage of global population living on less than $2.15 per day (2017 PPP).",
        category: "Economy",
        value: 8.5, // World Bank, 2022 estimate
        target: 0,
        unit: "%",
        displayPrecision: 1,
        chartType: "bar",
        source: {
            name: "Our World in Data (World Bank PovcalNet)",
            url: "https://ourworldindata.org/extreme-poverty",
            lastUpdated: "2023-10-04", // World Bank Poverty and Shared Prosperity Report 2023 with 2022 estimates
        },
        historical: [
            { year: 1990, value: 37.8 },
            { year: 2000, value: 28.0 },
            { year: 2010, value: 16.2 },
            { year: 2015, value: 11.2 },
            { year: 2019, value: 8.4 }, // Last pre-COVID full data year for PovcalNet
            { year: 2022, value: 8.5 }, // World Bank estimate for 2022
        ],
        color: "#F59E0B",
    },
    {
        id: "internet-access",
        name: "Internet Penetration",
        description: "Percentage of global population using the internet.",
        category: "Technology",
        value: 67.0, // ITU data for 2023
        target: 95,
        unit: "%",
        displayPrecision: 1,
        chartType: "area",
        source: {
            name: "Our World in Data (ITU)",
            url: "https://ourworldindata.org/internet",
            lastUpdated: "2023-12-01", // ITU data for 2023 often released end of year
        },
        historical: [
            { year: 2000, value: 6.8 },
            { year: 2005, value: 15.8 },
            { year: 2010, value: 29.1 },
            { year: 2015, value: 40.7 },
            { year: 2020, value: 58.8 },
            { year: 2023, value: 67.0 }, // ITU estimate for 2023
        ],
        color: "#8B5CF6",
    },
    {
        id: "child-mortality",
        name: "Child Mortality Rate",
        description: "Deaths of children under 5 years per 1,000 live births.",
        category: "Health",
        value: 37, // UN IGME 2022
        target: 20, // SDG Target 3.2 is 25 by 2030
        unit: "per 1,000",
        displayPrecision: 0,
        chartType: "line",
        source: {
            name: "Our World in Data (UN IGME)",
            url: "https://ourworldindata.org/child-mortality",
            lastUpdated: "2024-01-01", // UN IGME report with 2022 data released early 2024
        },
        historical: [
            { year: 1990, value: 93.0 },
            { year: 2000, value: 76.1 },
            { year: 2010, value: 56.4 },
            { year: 2015, value: 43.2 },
            { year: 2020, value: 38.0 },
            { year: 2022, value: 37.0 }, // UN IGME 2022 data
        ],
        color: "#EF4444",
    },
    {
        id: "co2-emissions",
        name: "Global CO2 Emissions (Fossil Fuels & Industry)",
        description:
            "Annual global carbon dioxide emissions from fossil fuels and industry.",
        category: "Environment",
        value: 37.15, // Global Carbon Project 2022 data
        target: 20,
        unit: "billion tons",
        displayPrecision: 2,
        chartType: "bar",
        source: {
            name: "Our World in Data (Global Carbon Project)",
            url: "https://ourworldindata.org/co2-emissions",
            lastUpdated: "2023-12-05", // GCP 2023 report (with 2022 data, and 2023 estimates)
        },
        historical: [
            { year: 1990, value: 22.68 },
            { year: 2000, value: 25.48 },
            { year: 2010, value: 33.13 },
            { year: 2019, value: 37.08 },
            { year: 2020, value: 35.03 },
            { year: 2021, value: 36.83 },
            { year: 2022, value: 37.15 },
        ],
        color: "#64748B",
    },
    {
        id: "scientific-publications",
        name: "Scientific Publications",
        description:
            "Annual number of peer-reviewed scientific papers published worldwide.",
        category: "Science",
        value: 2.95, // SCImago Journal Rank (SJR) for 2022 (approx, can vary by DB)
        unit: "million papers",
        displayPrecision: 2,
        chartType: "line",
        source: {
            name: "Our World in Data (SCImago, Scopus, WoS)",
            url: "https://ourworldindata.org/grapher/articles-published-in-scientific-journals",
            lastUpdated: "2023-12-31", // Reflecting availability of 2022 data from SCImago/Scopus
        },
        historical: [
            { year: 2000, value: 1.09 },
            { year: 2005, value: 1.46 },
            { year: 2010, value: 1.89 },
            { year: 2015, value: 2.36 },
            { year: 2020, value: 2.84 },
            { year: 2022, value: 2.95 }, // Based on SJR/Scopus data trends for 2022
        ],
        color: "#06B6D4",
    },
    {
        id: "global-population",
        name: "Global Population",
        description: "Total number of humans on Earth.",
        category: "Social",
        value: 8045311447, // UN WPP 2022 Revision estimate for 2023 mid-year
        unit: "people",
        displayPrecision: 0,
        chartType: "line",
        source: {
            name: "Our World in Data (UN Population Division, WPP 2022)",
            url: "https://ourworldindata.org/population-growth",
            lastUpdated: "2023-07-01", // Approx mid-year for UN WPP estimates
        },
        historical: [
            { year: 2000, value: 6143493823 },
            { year: 2010, value: 6956823603 },
            { year: 2020, value: 7794798739 },
            { year: 2023, value: 8045311447 },
        ],
        color: "#4CAF50",
    },
    {
        id: "world-energy-production",
        name: "World Total Primary Energy Supply",
        description: "Total primary energy supply generated globally.",
        category: "Technology",
        value: 1.9e13, // Based on IEA 2022 data (approx 600 EJ)
        target: 7e17,
        unit: "Watts", // (1 EJ/year = 3.17e10 Watts)
        displayPrecision: 2,
        chartType: "area",
        source: {
            name: "Our World in Data (IEA)",
            url: "https://ourworldindata.org/energy-production-consumption",
            lastUpdated: "2023-09-01", // IEA KWES 2023 (with 2022 data)
        },
        historical: [
            // Watts, converted from EJ/year (IEA data)
            { year: 1990, value: 1.39e13 }, // ~440 EJ/yr
            { year: 2000, value: 1.5e13 }, // ~473 EJ/yr
            { year: 2010, value: 1.71e13 }, // ~540 EJ/yr
            { year: 2019, value: 1.88e13 }, // ~595 EJ/yr
            { year: 2020, value: 1.82e13 }, // ~574 EJ/yr (COVID dip)
            { year: 2021, value: 1.89e13 }, // ~597 EJ/yr
            { year: 2022, value: 1.9e13 }, // ~600 EJ/yr (IEA Key World Energy Statistics 2023)
        ],
        color: "#FFC107",
    },
    {
        id: "global-temperature-change",
        name: "Global Temperature Anomaly",
        description:
            "Average global surface temperature increase compared to pre-industrial levels (1850-1900 average).",
        category: "Environment",
        value: 1.48, // Copernicus/WMO reported value for 2023
        target: 1.5,
        unit: "°C",
        displayPrecision: 2,
        chartType: "line",
        source: {
            name: "Copernicus/WMO (via OWID)",
            url: "https://ourworldindata.org/temperature-anomaly",
            lastUpdated: "2024-01-09", // Copernicus/WMO 2023 announcement
        },
        historical: [
            { year: 2000, value: 0.64 },
            { year: 2010, value: 0.73 },
            { year: 2016, value: 1.01 },
            { year: 2020, value: 1.02 },
            { year: 2023, value: 1.48 },
        ],
        color: "#F44336",
    },
    {
        id: "global-aqi-pm25",
        name: "Air Quality (PM2.5 Exposure)",
        description:
            "Global average population-weighted exposure to fine particulate matter (PM2.5). Target is WHO guideline.",
        category: "Environment",
        value: 28.7, // State of Global Air 2020 report (for 2019 data)
        target: 5,
        unit: "µg/m³",
        displayPrecision: 1,
        chartType: "line",
        source: {
            name: "Our World in Data (State of Global Air / IHME)",
            url: "https://ourworldindata.org/air-pollution",
            lastUpdated: "2022-03-01", // Reflects SoGA 2020 report (2019 data) publication period
        },
        historical: [
            // Population-weighted annual average PM2.5 exposure
            { year: 2010, value: 32.8 },
            { year: 2015, value: 30.1 },
            { year: 2019, value: 28.7 }, // SoGA data
        ],
        color: "#9E9E9E",
    },
    {
        id: "safely-managed-drinking-water",
        name: "Safely Managed Drinking Water",
        description:
            "Percentage of the global population using safely managed drinking water services.",
        category: "Health",
        value: 73,
        target: 100,
        unit: "%",
        displayPrecision: 0,
        chartType: "area",
        source: {
            name: "Our World in Data (WHO/UNICEF JMP)",
            url: "https://ourworldindata.org/water-access",
            lastUpdated: "2023-07-06", // JMP 2023 report (with 2022 data) publication
        },
        historical: [
            { year: 2000, value: 61 },
            { year: 2010, value: 67 },
            { year: 2015, value: 70 },
            { year: 2020, value: 73 },
            { year: 2022, value: 73 },
        ],
        color: "#2196F3",
    },
    {
        id: "ecological-footprint",
        name: "Ecological Footprint",
        description:
            "Humanity's demand on nature, measured in number of Earths required. Target is sustainability (1 Earth).",
        category: "Environment",
        value: 1.75, // Global Footprint Network - Earth Overshoot Day 2023 implies demand of 1.75 Earths
        target: 1.0,
        unit: "Earths",
        displayPrecision: 2,
        chartType: "area",
        source: {
            name: "Global Footprint Network (Earth Overshoot Day)",
            url: "https://www.overshootday.org/",
            lastUpdated: "2023-08-02", // Earth Overshoot Day 2023
        },
        historical: [
            { year: 1971, value: 1.0 }, // Approx when footprint crossed 1 Earth
            { year: 2000, value: 1.37 },
            { year: 2010, value: 1.64 },
            { year: 2017, value: 1.73 },
            { year: 2023, value: 1.75 }, // Based on Earth Overshoot Day 2023 calculation
        ],
        color: "#795548",
    },
    {
        id: "safely-managed-sanitation",
        name: "Safely Managed Sanitation",
        description:
            "Percentage of the global population using safely managed sanitation services.",
        category: "Health",
        value: 57,
        target: 100,
        unit: "%",
        displayPrecision: 0,
        chartType: "area",
        source: {
            name: "Our World in Data (WHO/UNICEF JMP)",
            url: "https://ourworldindata.org/sanitation",
            lastUpdated: "2023-07-06", // JMP 2023 report (with 2022 data) publication
        },
        historical: [
            { year: 2000, value: 28 },
            { year: 2010, value: 40 },
            { year: 2015, value: 47 },
            { year: 2020, value: 54 },
            { year: 2022, value: 57 },
        ],
        color: "#00BCD4",
    },
    {
        id: "global-obesity-overweight",
        name: "Obesity & Overweight Adults (BMI ≥ 25)",
        description:
            "Percentage of adults (18+) globally who are overweight (BMI ≥ 25, includes obesity).",
        category: "Health",
        value: 43, // WHO Global Health Observatory, 2022 data for overweight (incl. obesity)
        target: 30,
        unit: "%",
        displayPrecision: 1,
        chartType: "line",
        source: {
            name: "Our World in Data (WHO Global Health Observatory, NCD-RisC)",
            url: "https://ourworldindata.org/obesity",
            lastUpdated: "2024-03-01", // WHO data for 2022 published around this time
        },
        historical: [
            // WHO data for adults (18+) BMI >= 25 kg/m²
            { year: 1975, value: 22.9 },
            { year: 1990, value: 28.7 },
            { year: 2000, value: 33.7 },
            { year: 2010, value: 38.5 },
            { year: 2016, value: 39.8 },
            { year: 2022, value: 43.0 },
        ],
        color: "#FF9800",
    },
    {
        id: "top-supercomputer-flops",
        name: "Top Supercomputer Performance (Rmax)",
        description:
            "Processing power (Rmax FLOPS) of the world's fastest supercomputer.",
        category: "Technology",
        value: 1.194e18, // Frontier (Nov 2023 list, Rmax)
        target: 1e21,
        unit: "FLOPS",
        displayPrecision: 3,
        chartType: "line",
        source: {
            name: "TOP500.org",
            url: "https://www.top500.org/lists/top500/",
            lastUpdated: "2023-11-01", // Reflecting Nov 2023 list publication
        },
        historical: [
            { year: 1993, value: 5.97e10 },
            { year: 1997, value: 1.068e12 },
            { year: 2002, value: 3.586e13 },
            { year: 2008, value: 1.026e15 },
            { year: 2011, value: 8.162e15 },
            { year: 2013, value: 3.386e16 },
            { year: 2016, value: 9.301e16 },
            { year: 2018, value: 1.486e17 },
            { year: 2020, value: 4.42e17 },
            { year: 2022, value: 1.102e18 },
            { year: 2023, value: 1.194e18 },
        ],
        color: "#673AB7",
    },
    genderInequalityIndexIndicator,
    globalHappinessIndicator,
    {
        id: "bitcoin-market-cap",
        name: "Bitcoin Market Cap",
        description: "Total market capitalization of Bitcoin.",
        category: "Economy",
        value: 827.5,
        unit: "$ Billions",
        displayPrecision: 1,
        chartType: "line",
        source: {
            name: "CoinMarketCap",
            url: "https://coinmarketcap.com/currencies/bitcoin/",
            lastUpdated: "2023-12-31",
        },
        historical: [
            { year: 2013, value: 13.7 },
            { year: 2014, value: 4.5 },
            { year: 2015, value: 6.3 },
            { year: 2016, value: 15.5 },
            { year: 2017, value: 226.8 },
            { year: 2018, value: 64.8 },
            { year: 2019, value: 130.5 },
            { year: 2020, value: 539.3 },
            { year: 2021, value: 876.1 },
            { year: 2022, value: 318.0 },
            { year: 2023, value: 827.5 },
        ],
        color: "#F7931A",
    },
    {
        id: "bitcoin-price",
        name: "Bitcoin Price (USD)",
        description: "Price of Bitcoin in USD.",
        category: "Economy",
        value: 42265,
        unit: "$",
        displayPrecision: 0,
        chartType: "line",
        source: {
            name: "CoinMarketCap",
            url: "https://coinmarketcap.com/currencies/bitcoin/",
            lastUpdated: "2023-12-31",
        },
        historical: [
            { year: 2013, value: 754 },
            { year: 2014, value: 314 },
            { year: 2015, value: 426 },
            { year: 2016, value: 963 },
            { year: 2017, value: 13880 },
            { year: 2018, value: 3742 },
            { year: 2019, value: 7193 },
            { year: 2020, value: 29001 },
            { year: 2021, value: 46306 },
            { year: 2022, value: 16547 },
            { year: 2023, value: 42265 },
        ],
        color: "#FFB300",
    },
    {
        id: "us-inflation-rate",
        name: "US Inflation Rate (CPI YoY)",
        description:
            "Year-over-year consumer price inflation in the United States.",
        category: "Economy",
        value: 3.4,
        unit: "%",
        displayPrecision: 1,
        chartType: "line",
        source: {
            name: "BLS CPI",
            url: "https://www.bls.gov/cpi/",
            lastUpdated: "2024-01-11",
        },
        historical: [
            { year: 2015, value: 0.1 },
            { year: 2016, value: 1.3 },
            { year: 2017, value: 2.1 },
            { year: 2018, value: 2.4 },
            { year: 2019, value: 1.8 },
            { year: 2020, value: 1.2 },
            { year: 2021, value: 7.0 },
            { year: 2022, value: 6.5 },
            { year: 2023, value: 3.4 },
        ],
        color: "#C2185B",
    },
    {
        id: "global-inflation-rate",
        name: "Global Inflation Rate",
        description: "Weighted-average global consumer price inflation.",
        category: "Economy",
        value: 6.9,
        unit: "%",
        displayPrecision: 1,
        chartType: "line",
        source: {
            name: "IMF World Economic Outlook",
            url: "https://www.imf.org/en/Publications/WEO",
            lastUpdated: "2023-10-01",
        },
        historical: [
            { year: 2015, value: 3.4 },
            { year: 2016, value: 3.0 },
            { year: 2017, value: 3.5 },
            { year: 2018, value: 3.6 },
            { year: 2019, value: 3.5 },
            { year: 2020, value: 3.2 },
            { year: 2021, value: 4.7 },
            { year: 2022, value: 8.7 },
            { year: 2023, value: 6.9 },
        ],
        color: "#E64A19",
    },
    {
        id: "global-violent-crime-rate",
        name: "Global Violent Crime (Homicide Rate)",
        description: "Estimated global homicide rate per 100,000 population.",
        category: "Social",
        value: 6.3,
        unit: "per 100k",
        displayPrecision: 1,
        chartType: "line",
        source: {
            name: "UNODC Homicide Statistics",
            url: "https://dataunodc.un.org/content/homicide-rate",
            lastUpdated: "2023-07-10",
        },
        historical: [
            { year: 2010, value: 6.2 },
            { year: 2015, value: 6.0 },
            { year: 2018, value: 6.1 },
            { year: 2019, value: 6.0 },
            { year: 2020, value: 6.2 },
            { year: 2021, value: 6.3 },
        ],
        color: "#607D8B",
    },
    {
        id: "global-unemployment-rate",
        name: "Global Unemployment Rate",
        description: "Share of the global labor force that is unemployed.",
        category: "Economy",
        value: 5.5,
        unit: "%",
        displayPrecision: 1,
        chartType: "line",
        source: {
            name: "ILOSTAT (ILO Modelled Estimates)",
            url: "https://ilostat.ilo.org/data/",
            lastUpdated: "2024-01-17",
        },
        historical: [
            { year: 2015, value: 5.6 },
            { year: 2016, value: 5.5 },
            { year: 2017, value: 5.5 },
            { year: 2018, value: 5.4 },
            { year: 2019, value: 5.4 },
            { year: 2020, value: 6.5 },
            { year: 2021, value: 6.2 },
            { year: 2022, value: 5.8 },
            { year: 2023, value: 5.5 },
        ],
        color: "#3F51B5",
    },
    {
        id: "global-suicide-rate",
        name: "Global Suicide Rate",
        description: "Age-standardised suicide deaths per 100,000 population.",
        category: "Health",
        value: 9.2,
        unit: "per 100k",
        displayPrecision: 1,
        chartType: "line",
        source: {
            name: "WHO Global Health Estimates",
            url: "https://www.who.int/data/gho/data/themes/mental-health/suicide-rates",
            lastUpdated: "2021-06-17",
        },
        historical: [
            { year: 2000, value: 12.8 },
            { year: 2005, value: 11.9 },
            { year: 2010, value: 11.0 },
            { year: 2015, value: 10.1 },
            { year: 2019, value: 9.2 },
        ],
        color: "#9C27B0",
    },
    {
        id: "us-m2-money-supply",
        name: "US Money Supply (M2)",
        description:
            "Federal Reserve M2 monetary aggregate (seasonally adjusted), data from FRED.",
        category: "Economy",
        value: m2Data[m2Data.length - 1].m2sl, // Latest value
        unit: "$ Billions",
        displayPrecision: 1,
        chartType: "line",
        source: {
            name: "Federal Reserve FRED (M2SL)",
            url: "https://fred.stlouisfed.org/series/M2SL",
            lastUpdated: m2Data[m2Data.length - 1].observation_date, // Latest date
        },
        historical: (() => {
            const yearlyData: { year: number; value: number }[] = [];
            const years = new Set<number>();
            m2Data.forEach((entry) => {
                const year = parseInt(entry.observation_date.substring(0, 4));
                if (!years.has(year)) {
                    yearlyData.push({ year, value: entry.m2sl });
                    years.add(year);
                }
            });
            return yearlyData;
        })(),
        color: "#4CAF50",
    },
];
