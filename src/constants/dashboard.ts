// Chart configuration constants
export const CHART_CONSTANTS = {
    DEFAULT_HEIGHT: 300,
    AXIS_TICK_SIZE: 5,
    AXIS_PADDING: { left: 10, right: 10 },
    PERCENTAGE_MAX: 100,
    DEFAULT_COLOR: "#06B6D4",
} as const;

// Map view constants
export const MAP_CONSTANTS = {
    WORLD_ATLAS_URL: "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json",
    DEFAULT_VIEW: "hdi",
    ZOOM_BOUNDS: {
        MIN: 1,
        MAX: 8,
    },
    NO_DATA_COLOR: "#666",
    STROKE_WIDTH: {
        DEFAULT: 0.2,
        HOVER: 0.6,
        HIGHLIGHTED: 0.8,
        HIGHLIGHTED_HOVER: 1.2,
    },
    HIGHLIGHT_COLOR: "#FFD700",
    DEFAULT_STROKE_COLOR: "#FFF",
} as const;

// Progress calculation constants
export const PROGRESS_CONSTANTS = {
    DEFAULT_START_YEAR: 2000,
    REFERENCE_YEAR_LIFE_EXPECTANCY: 1950,
    REFERENCE_VALUE_LIFE_EXPECTANCY: 48,
    GOAL_LIFE_EXPECTANCY: 85,
    DEFAULT_YEAR_RANGE: 10,
} as const;

// Color scales for different indicators
export const COLOR_SCALES = {
    HDI: {
        DOMAIN: [0.3, 0.6, 0.8, 0.95],
        RANGE: ["#fee08b", "#fdae61", "#f46d43", "#d73027"],
    },
    GHI: {
        DOMAIN: [2, 4, 6, 7.5],
        RANGE: ["#fee08b", "#fdae61", "#f46d43", "#d73027"].reverse(),
    },
} as const;

// Legend configuration
export const LEGEND_CONFIG = {
    HDI: [
        { min: 0, max: 0.3, label: "< 0.3" },
        { min: 0.3, max: 0.6, label: "0.3 - 0.6" },
        { min: 0.6, max: 0.8, label: "0.6 - 0.8" },
        { min: 0.8, max: 0.95, label: "0.8 - 0.95" },
        { min: 0.95, max: 1, label: "> 0.95" },
    ],
    GHI: [
        { min: 0, max: 4, label: "< 4" },
        { min: 4, max: 6, label: "4 - 6" },
        { min: 6, max: 7.5, label: "6 - 7.5" },
        { min: 7.5, max: 10, label: "> 7.5" },
    ],
} as const;

// Animation durations
export const ANIMATION_DURATIONS = {
    CHART_TRANSITION: 300,
    TOOLTIP_DELAY: 100,
} as const;