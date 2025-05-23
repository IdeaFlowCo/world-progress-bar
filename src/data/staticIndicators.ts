// src/data/staticIndicators.ts
import { ProgressIndicator } from "../types/dashboard";
import { ghiData2024 } from "./ghiData"; // Import GHI data

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
    value: costPerFlopHistorical[costPerFlopHistorical.length - 1].value, // Latest value
    target: 0, // Target is effectively zero
    unit: "$/FLOP",
    chartType: "line", // Log scale might be appropriate here visually
    source: {
        name: "Wikipedia/Various",
        url: "https://en.wikipedia.org/wiki/FLOPS#Hardware_costs", // Source URL
        lastUpdated: "2024-04-30", // Date data was sourced
    },
    historical: costPerFlopHistorical,
    color: "#FF5722", // Deep Orange
};

const aiTrainingComputeHistorical: { year: number; value: number }[] = [
    { year: 1952, value: 2.0e6 }, // SNARC
    { year: 1957, value: 6.948949377361819e11 }, // Perceptron Mark I
    { year: 1959, value: 4.284e11 }, // Samuel Neural Checkers
    { year: 1962, value: 1.55925e12 }, // Linear Decision Functions
    { year: 1963, value: 2.25e7 }, // Print Recognition Logic
    { year: 1965, value: 1.08e6 }, // Heuristic Reinforcement Learning
    { year: 1966, value: 1.0591706e8 }, // LTE speaker verification system
    { year: 1968, value: 6.9e16 }, // GLEE
    { year: 1969, value: 2.45e9 }, // Decision tree adaline
    { year: 1970, value: 1.805e11 }, // Graph-based structural reasoning
    { year: 1973, value: 3.57e8 }, // Piecewise linear model
    { year: 1975, value: 5.76e6 }, // Cognitron
    { year: 1976, value: 1.2e12 }, // Statistical continuous speech recognizer
    { year: 1977, value: 6.9e16 }, // TD(0)
    { year: 1979, value: 9.81e8 }, // Internal functionality of visual invariants
    { year: 1980, value: 1.955448e11 }, // Neocognitron
    { year: 1981, value: 4.096e9 }, // Kohonen network
    { year: 1982, value: 9.9e9 }, // Hopfield network
    { year: 1983, value: 3.24e8 }, // ASE+ACE
    { year: 1984, value: 9.315e9 }, // Hierarchical Cognitron
    { year: 1986, value: 3.888e11 }, // Distributed representation NN
    { year: 1987, value: 2.832800256e10 }, // NetTalk (transcription)
    { year: 1988, value: 2.96425e8 }, // MLN-ASR
    { year: 1989, value: 1.0548576e10 }, // ALVINN
    { year: 1990, value: 1.955448e11 }, // RAAM
    { year: 1991, value: 7.5474e10 }, // Weight Decay
    { year: 1992, value: 5.346e7 }, // Cancer drug mechanism prediction
    { year: 1993, value: 1.2869570138112e13 }, // Siamese-TDNN
    { year: 1994, value: 8.58730812676e11 }, // NeuroChess
    { year: 1995, value: 4.536e11 }, // Mixture of linear models
    { year: 1996, value: 7.2576e10 }, // System 11
    { year: 1997, value: 9.6048e12 }, // Sparse Vision Encoding
    { year: 2000, value: 5.181e13 }, // PoE MNIST
    { year: 2001, value: 6.3e13 }, // Decision tree (classification)
    { year: 2002, value: 1.446336e19 }, // DeepStack
    { year: 2003, value: 6.339e15 }, // NPLM
    { year: 2004, value: 2.78208e15 }, // LMICA
    { year: 2005, value: 2.96425e8 }, // SACHS
    { year: 2006, value: 9.6048e12 }, // Sparse Energy-Based Model
    { year: 2007, value: 1.4494464e18 }, // SB-LM
    { year: 2008, value: 1.15848e14 }, // Hierarchical LM
    { year: 2009, value: 9.6048e12 }, // Sparse coding model for V1 receptive fields
    { year: 2010, value: 1.30788e14 }, // MCDNN (MNIST)
    { year: 2011, value: 1.422e16 }, // Recursive sentiment autoencoder
    { year: 2012, value: 1.8144e11 }, // GPT-1
    { year: 2013, value: 1.07e20 }, // DNABERT
    { year: 2014, value: 5.6e19 }, // Seq2Seq LSTM
    { year: 2015, value: 1.041408e19 }, // ResNet-152 (ImageNet)
    { year: 2016, value: 1.053486e16 }, // NAS with base 8 and shared embeddings
    { year: 2017, value: 1.1e23 }, // OpenVLA
    { year: 2018, value: 1.8144e22 }, // LUKE
    { year: 2019, value: 1.17e24 }, // Turing-NLG
    { year: 2020, value: 3.14e23 }, // GPT-3 175B (davinci)
    { year: 2021, value: 8.1e22 }, // ByT5-XXL
    { year: 2022, value: 5.0000000001e25 }, // Gemini 1.0 Ultra
    { year: 2023, value: 3.866e24 }, // Claude 2
    { year: 2024, value: 4.64e26 }, // Grok-3
    { year: 2025, value: 5.18400000000001e25 }, // Llama 4 Behemoth
];

const aiTrainingComputeIndicator: ProgressIndicator = {
    id: "ai-training-compute",
    name: "AI Training Compute",
    description:
        "Estimated training compute (FLOP) used for notable AI models over time.",
    category: "Technology",
    value: aiTrainingComputeHistorical[aiTrainingComputeHistorical.length - 1]
        .value, // Latest value
    target: 1e30, // Example target (YottaFLOP scale)
    unit: "FLOP",
    chartType: "line", // Log scale is essential
    source: {
        name: "Epoch AI",
        url: "https://epoch.ai/data/notable-ai-models",
        lastUpdated: "2025-05-01", // From the Epoch AI page
    },
    historical: aiTrainingComputeHistorical,
    color: "#9C27B0", // Purple
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
    value: solarCostHistorical[solarCostHistorical.length - 1].value, // Latest value
    target: 0.1, // Example target
    unit: "$/Watt",
    chartType: "line",
    source: {
        name: "Our World in Data (Lafond et al., 2022; IEA; IRENA)",
        url: "https://ourworldindata.org/grapher/solar-pv-prices-vs-cumulative-capacity",
        lastUpdated: "2024-05-01", // Date data provided
    },
    historical: solarCostHistorical,
    color: "#FFEB3B", // Yellow
};

// Parsed and formatted historical data for Global GDP
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

// Define the new indicator object
const globalGDPIndicator: ProgressIndicator = {
    id: "global-gdp",
    name: "Global GDP",
    description:
        "Gross domestic product (GDP) is a measure of the total value added from the production of goods and services globally each year. Adjusted for inflation and differences in living costs (international-$ at 2021 prices).",
    category: "Economy",
    value: globalGDPHistorical[globalGDPHistorical.length - 1].value, // Latest value
    // target: undefined, // No specific target defined
    unit: "$ Trillions",
    chartType: "line",
    source: {
        name: "Our World in Data (Maddison, World Bank)",
        url: "https://ourworldindata.org/grapher/global-gdp-over-the-long-run",
        lastUpdated: "2025-05-01", // Date data provided by user
    },
    historical: globalGDPHistorical,
    color: "#03A9F4", // Light Blue
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
    ].value, // Latest value
    target: 85, // Example target
    unit: "years",
    chartType: "line",
    source: {
        name: "Our World in Data (OWID)",
        url: "https://api.ourworldindata.org/v1/indicators/1002268.data.json", // Specific API endpoint used
        lastUpdated: "2025-04-30", // Date data was fetched
    },
    historical: globalLifeExpectancyHistorical,
    color: "#4CAF50", // Green
};

// Gender Inequality Index Data (Corrected)
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
    ].value, // Latest value
    target: 0.1, // Lower is better, target is < 0.1
    unit: "Index Score", // GII is an index
    chartType: "line",
    source: {
        name: "Our World in Data (Human Development Report)",
        url: "https://ourworldindata.org/grapher/gender-inequality-index-from-the-human-development-report",
        lastUpdated: "2025-05-01", // Date data was sourced by user
    },
    historical: genderInequalityIndexHistorical,
    color: "#E91E63", // Pink
};

// Define the Global Happiness Index indicator
const globalHappinessIndicator: ProgressIndicator = {
    id: "global-happiness-index",
    name: "Global Happiness Index (2024)",
    description:
        "World Happiness Report score (Ladder score) indicating subjective well-being.",
    category: "Social",
    value: 7.736, // Value for Finland (highest) as a placeholder 'current' value
    target: 8.0, // Example target score
    unit: "Score",
    chartType: "bar", // Placeholder chart type, primarily for map view
    source: {
        name: "World Happiness Report 2024 (User Provided)",
        url: "https://worldhappiness.report/", // General URL
        lastUpdated: "2025-05-01",
    },
    // No historical line data provided, map data is in ghiData.ts
    mapData: ghiData2024, // Link to the map data
    color: "#FFCA28", // Amber/Gold color
    historical: [], // Add empty historical array to satisfy type
};

// Combined list of all indicators
export const staticIndicators: ProgressIndicator[] = [
    // Indicators originally in staticIndicators.ts
    costPerFlopIndicator,
    aiTrainingComputeIndicator,
    globalGDPIndicator, // Added Global GDP
    globalLifeExpectancyIndicator,
    solarCostIndicator, // Added Solar Cost

    // Indicators originally in initialIndicators.ts
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
        value: 241.116670627, // 2023 value
        target: 20, // Keeping previous target
        unit: "billion tons",
        chartType: "bar",
        source: {
            name: "Our World in Data",
            url: "https://ourworldindata.org/co2-emissions",
            lastUpdated: "2024-05-01", // Reflects data up to 2023
        },
        historical: [
            { year: 1750, value: 0.055835622 },
            { year: 1751, value: 0.056443374 },
            { year: 1752, value: 0.057031008 },
            { year: 1753, value: 0.05766294 },
            { year: 1754, value: 0.05840148 },
            { year: 1755, value: 0.058760808 },
            { year: 1756, value: 0.059459484 },
            { year: 1757, value: 0.060563616 },
            { year: 1758, value: 0.061298148 },
            { year: 1759, value: 0.062033124 },
            { year: 1760, value: 0.063085986 },
            { year: 1761, value: 0.06448731 },
            { year: 1762, value: 0.065713188 },
            { year: 1763, value: 0.067149552 },
            { year: 1764, value: 0.068381892 },
            { year: 1765, value: 0.069860916 },
            { year: 1766, value: 0.07125648 },
            { year: 1767, value: 0.072915054 },
            { year: 1768, value: 0.074801616 },
            { year: 1769, value: 0.076680444 },
            { year: 1770, value: 0.078583296 },
            { year: 1771, value: 0.080216928 },
            { year: 1772, value: 0.081741042 },
            { year: 1773, value: 0.082848828 },
            { year: 1774, value: 0.08407449 },
            { year: 1775, value: 0.08603352 },
            { year: 1776, value: 0.087924744 },
            { year: 1777, value: 0.089757222 },
            { year: 1778, value: 0.091460898 },
            { year: 1779, value: 0.09321141 },
            { year: 1780, value: 0.095272356 },
            { year: 1781, value: 0.097406298 },
            { year: 1782, value: 0.099485724 },
            { year: 1783, value: 0.102376512 },
            { year: 1784, value: 0.104826552 },
            { year: 1785, value: 0.107787104 },
            { year: 1786, value: 0.110681312 },
            { year: 1787, value: 0.113151116 },
            { year: 1788, value: 0.115713704 },
            { year: 1789, value: 0.11917688 },
            { year: 1790, value: 0.1223849 },
            { year: 1791, value: 0.125586836 },
            { year: 1792, value: 0.13157162 },
            { year: 1793, value: 0.133779906 },
            { year: 1794, value: 0.135114272 },
            { year: 1795, value: 0.133887812 },
            { year: 1796, value: 0.13272459 },
            { year: 1797, value: 0.132536804 },
            { year: 1798, value: 0.138631914 },
            { year: 1799, value: 0.164907582 },
            { year: 1800, value: 0.196280816 },
            { year: 1801, value: 0.191377692 },
            { year: 1802, value: 0.241280254 },
            { year: 1803, value: 0.176633804 },
            { year: 1804, value: 0.189944554 },
            { year: 1805, value: 0.186825268 },
            { year: 1806, value: 0.1955559 },
            { year: 1807, value: 0.216444214 },
            { year: 1808, value: 0.212197394 },
            { year: 1809, value: 0.21719061 },
            { year: 1810, value: 0.23611229 },
            { year: 1811, value: 0.24015801 },
            { year: 1812, value: 0.243911774 },
            { year: 1813, value: 0.246186936 },
            { year: 1814, value: 0.252228138 },
            { year: 1815, value: 0.260312626 },
            { year: 1816, value: 0.271644874 },
            { year: 1817, value: 0.294211498 },
            { year: 1818, value: 0.306783748 },
            { year: 1819, value: 0.304046026 },
            { year: 1820, value: 0.302799624 },
            { year: 1821, value: 0.310690016 },
            { year: 1822, value: 0.322389342 },
            { year: 1823, value: 0.336330788 },
            { year: 1824, value: 0.343458856 },
            { year: 1825, value: 0.362104112 },
            { year: 1826, value: 0.365645654 },
            { year: 1827, value: 0.391521396 },
            { year: 1828, value: 0.396891822 },
            { year: 1829, value: 0.394238 },
            { year: 1830, value: 0.529736521 },
            { year: 1831, value: 0.494967356 },
            { year: 1832, value: 0.486476861 },
            { year: 1833, value: 0.492409331 },
            { year: 1834, value: 0.525784552 },
            { year: 1835, value: 0.575722514 },
            { year: 1836, value: 0.631863074 },
            { year: 1837, value: 0.626531292 },
            { year: 1838, value: 0.62495237 },
            { year: 1839, value: 0.646811576 },
            { year: 1840, value: 0.701005438 },
            { year: 1841, value: 0.720451694 },
            { year: 1842, value: 0.762368242 },
            { year: 1843, value: 0.778603276 },
            { year: 1844, value: 0.833060768 },
            { year: 1845, value: 0.907885387 },
            { year: 1846, value: 0.920550298 },
            { year: 1847, value: 0.994367602 },
            { year: 1848, value: 1.007980842 },
            { year: 1849, value: 1.073413674 },
            { year: 1850, value: 1.534709213 },
            { year: 1851, value: 1.540458947 },
            { year: 1852, value: 1.606520269 },
            { year: 1853, value: 1.67693138 },
            { year: 1854, value: 1.973487663 },
            { year: 1855, value: 2.004829774 },
            { year: 1856, value: 2.143608759 },
            { year: 1857, value: 2.164329753 },
            { year: 1858, value: 2.197013672 },
            { year: 1859, value: 2.325470186 },
            { year: 1860, value: 2.558188633 },
            { year: 1861, value: 2.697123264 },
            { year: 1862, value: 2.747314763 },
            { year: 1863, value: 2.920872738 },
            { year: 1864, value: 3.151987215 },
            { year: 1865, value: 3.353429268 },
            { year: 1866, value: 3.464024703 },
            { year: 1867, value: 3.691412696 },
            { year: 1868, value: 3.781435343 },
            { year: 1869, value: 4.001229672 },
            { year: 1870, value: 4.082119975 },
            { year: 1871, value: 4.341461757 },
            { year: 1872, value: 4.782315111 },
            { year: 1873, value: 5.071029109 },
            { year: 1874, value: 4.745023917 },
            { year: 1875, value: 5.160846998 },
            { year: 1876, value: 5.243032628 },
            { year: 1877, value: 5.321638453 },
            { year: 1878, value: 5.367799299 },
            { year: 1879, value: 5.70488563 },
            { year: 1880, value: 6.440028572 },
            { year: 1881, value: 6.654098477 },
            { year: 1882, value: 6.99971055 },
            { year: 1883, value: 7.435890069 },
            { year: 1884, value: 7.4995813 },
            { year: 1885, value: 7.551176735 },
            { year: 1886, value: 7.643452879 },
            { year: 1887, value: 8.007365552 },
            { year: 1888, value: 8.802385352 },
            { year: 1889, value: 8.880367693 },
            { year: 1890, value: 9.589024115 },
            { year: 1891, value: 10.027956935 },
            { year: 1892, value: 10.067106596 },
            { year: 1893, value: 9.916993644 },
            { year: 1894, value: 10.359003112 },
            { year: 1895, value: 10.91204102 },
            { year: 1896, value: 11.29787311 },
            { year: 1897, value: 11.836434194 },
            { year: 1898, value: 12.440654024 },
            { year: 1899, value: 13.529832162 },
            { year: 1900, value: 14.237630791 },
            { year: 1901, value: 14.600510701 },
            { year: 1902, value: 14.910105867 },
            { year: 1903, value: 16.137478612 },
            { year: 1904, value: 16.34754168 },
            { year: 1905, value: 17.323071673 },
            { year: 1906, value: 18.058338085 },
            { year: 1907, value: 20.499348434 },
            { year: 1908, value: 19.863523679 },
            { year: 1909, value: 20.560240538 },
            { year: 1910, value: 21.461129222 },
            { year: 1911, value: 21.831769221 },
            { year: 1912, value: 22.899971935 },
            { year: 1913, value: 24.812261727 },
            { year: 1914, value: 22.454921358 },
            { year: 1915, value: 21.98603567 },
            { year: 1916, value: 23.65954871 },
            { year: 1917, value: 24.567972208 },
            { year: 1918, value: 24.005803206 },
            { year: 1919, value: 20.795162305 },
            { year: 1920, value: 24.260858468 },
            { year: 1921, value: 21.438247006 },
            { year: 1922, value: 22.607919116 },
            { year: 1923, value: 25.12209715 },
            { year: 1924, value: 25.597715113 },
            { year: 1925, value: 25.786014618 },
            { year: 1926, value: 24.979579784 },
            { year: 1927, value: 27.725211025 },
            { year: 1928, value: 27.649144518 },
            { year: 1929, value: 29.699534109 },
            { year: 1930, value: 27.516842602 },
            { year: 1931, value: 24.741798997 },
            { year: 1932, value: 22.432051988 },
            { year: 1933, value: 23.566711091 },
            { year: 1934, value: 25.658470857 },
            { year: 1935, value: 26.922647413 },
            { year: 1936, value: 29.410033387 },
            { year: 1937, value: 31.49787961 },
            { year: 1938, value: 29.920532865 },
            { year: 1939, value: 31.476907245 },
            { year: 1940, value: 34.287662577 },
            { year: 1941, value: 34.806547213 },
            { year: 1942, value: 34.365102296 },
            { year: 1943, value: 34.98257797 },
            { year: 1944, value: 35.312394118 },
            { year: 1945, value: 28.659505992 },
            { year: 1946, value: 31.425805133 },
            { year: 1947, value: 35.326885196 },
            { year: 1948, value: 37.351552767 },
            { year: 1949, value: 36.209016468 },
            { year: 1950, value: 40.298548802 },
            { year: 1951, value: 43.447142006 },
            { year: 1952, value: 44.134379838 },
            { year: 1953, value: 45.396717814 },
            { year: 1954, value: 46.613937304 },
            { year: 1955, value: 51.025598198 },
            { year: 1956, value: 54.357529406 },
            { year: 1957, value: 56.169195446 },
            { year: 1958, value: 57.728107065 },
            { year: 1959, value: 60.536217605 },
            { year: 1960, value: 64.219543073 },
            { year: 1961, value: 64.656533755 },
            { year: 1962, value: 67.131259402 },
            { year: 1963, value: 70.817047541 },
            { year: 1964, value: 74.638325405 },
            { year: 1965, value: 77.902119741 },
            { year: 1966, value: 81.556338788 },
            { year: 1967, value: 84.088270871 },
            { year: 1968, value: 88.668288562 },
            { year: 1969, value: 94.508997268 },
            { year: 1970, value: 102.066904075 },
            { year: 1971, value: 106.22678969 },
            { year: 1972, value: 111.030158993 },
            { year: 1973, value: 116.840434172 },
            { year: 1974, value: 116.633911916 },
            { year: 1975, value: 117.14156627 },
            { year: 1976, value: 123.752838481 },
            { year: 1977, value: 127.012725775 },
            { year: 1978, value: 130.935256695 },
            { year: 1979, value: 134.702307095 },
            { year: 1980, value: 134.06945078 },
            { year: 1981, value: 130.814322121 },
            { year: 1982, value: 129.955895742 },
            { year: 1983, value: 130.7788293 },
            { year: 1984, value: 134.950232987 },
            { year: 1985, value: 139.668710263 },
            { year: 1986, value: 141.475196589 },
            { year: 1987, value: 144.88799162 },
            { year: 1988, value: 150.191277458 },
            { year: 1989, value: 152.010755263 },
            { year: 1990, value: 154.633302536 },
            { year: 1991, value: 157.419000626 },
            { year: 1992, value: 151.842285803 },
            { year: 1993, value: 152.737063582 },
            { year: 1994, value: 153.499081105 },
            { year: 1995, value: 156.62280766 },
            { year: 1996, value: 161.032153618 },
            { year: 1997, value: 161.462972873 },
            { year: 1998, value: 160.566640411 },
            { year: 1999, value: 163.828610671 },
            { year: 2000, value: 168.010112467 },
            { year: 2001, value: 169.567208196 },
            { year: 2002, value: 172.974650886 },
            { year: 2003, value: 181.764615392 },
            { year: 2004, value: 187.514497098 },
            { year: 2005, value: 193.423928292 },
            { year: 2006, value: 199.677509236 },
            { year: 2007, value: 204.943292048 },
            { year: 2008, value: 208.095333712 },
            { year: 2009, value: 204.004613687 },
            { year: 2010, value: 215.482731617 },
            { year: 2011, value: 222.389491976 },
            { year: 2012, value: 225.593501904 },
            { year: 2013, value: 227.013332266 },
            { year: 2014, value: 227.470443049 },
            { year: 2015, value: 227.211443923 },
            { year: 2016, value: 227.301954177 },
            { year: 2017, value: 230.88149669 },
            { year: 2018, value: 235.257258768 },
            { year: 2019, value: 237.289377604 },
            { year: 2020, value: 225.815582743 },
            { year: 2021, value: 237.662363579 },
            { year: 2022, value: 238.962603255 },
            { year: 2023, value: 241.116670627 },
        ],
        color: "#64748B", // Previous color
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
    // Note: The 'top-supercomputer-flops' indicator was previously removed from initialIndicators.ts
    // If it needs to be included, it should be added here. Let's add it back for completeness.
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

    // Gender Inequality Index Data (Added)
    genderInequalityIndexIndicator,

    // Global Happiness Index (Added)
    globalHappinessIndicator,
];
