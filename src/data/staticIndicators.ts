// src/data/staticIndicators.ts
import { ProgressIndicator } from "../types/dashboard";

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

// Append the new indicator to the existing staticIndicators array
export const staticIndicators: ProgressIndicator[] = [
    costPerFlopIndicator,
    aiTrainingComputeIndicator,
    globalLifeExpectancyIndicator, // Added the new indicator
    // Add other non-API indicators here if needed
];
