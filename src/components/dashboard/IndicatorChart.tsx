import {
    LineChart,
    Line,
    BarChart,
    Bar,
    AreaChart,
    Area,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { ProgressIndicator } from "@/types/dashboard";
import { formatNumberWithSI } from "@/lib/utils";

// Helper function to generate sensible year ticks for the XAxis
const getYearTicks = (
    historicalData: { year: number; value: number }[] // Changed 'any' to 'number'
): number[] => {
    if (!historicalData || historicalData.length === 0) {
        return [];
    }
    const years = historicalData.map((item) => item.year);
    const minYear = Math.min(...years);
    const maxYear = Math.max(...years);
    const yearRange = maxYear - minYear;

    // Handle case with only one data point
    if (yearRange === 0) {
        return [minYear];
    }

    // Determine interval based on range for readability
    let interval = 1;
    if (yearRange > 100) interval = 20;
    else if (yearRange > 50) interval = 10;
    else if (yearRange > 20) interval = 5;
    else if (yearRange > 10) interval = 2;

    const ticks: Set<number> = new Set();

    // Add the first year
    ticks.add(minYear);

    // Add ticks at intervals, starting from the first interval boundary >= minYear
    let currentTick = Math.ceil(minYear / interval) * interval;
    while (currentTick < maxYear) {
        if (currentTick > minYear) {
            // Ensure ticks are within the actual range and > minYear
            ticks.add(currentTick);
        }
        currentTick += interval;
        // Safety break for potential infinite loops with interval 0 or negative, though interval logic prevents this.
        if (interval <= 0) break;
    }

    // Add the last year
    ticks.add(maxYear);

    return Array.from(ticks).sort((a, b) => a - b);
};

interface IndicatorChartProps {
    indicator: ProgressIndicator;
    height?: number;
}

export const IndicatorChart = ({
    indicator,
    height = 150,
}: IndicatorChartProps) => {
    const color = indicator.color || "#06B6D4";

    // Determine if this is a percentage-based indicator
    const isPercentage = indicator.unit === "%" || indicator.unit === "percent";

    // Check if log scale should be used
    const useLogScale =
        indicator.id === "world-energy-production" ||
        indicator.id === "top-supercomputer-flops" ||
        indicator.id === "cost-per-flop" ||
        indicator.id === "ai-training-compute"; // Added ai-training-compute

    // Set domain max value - cap at 100 if it's a percentage
    const getYAxisDomain = () => {
        // For percentage values, cap at 100
        if (isPercentage) {
            return [0, 100];
        }

        // For other values, calculate a reasonable upper bound
        // Find the maximum value in historical data
        const maxHistorical = Math.max(
            ...indicator.historical.map((item) => item.value)
        );
        const targetValue = indicator.target || 0;

        // Use whichever is greater: the max historical value or the target value
        const maxValue = Math.max(maxHistorical, targetValue);

        // Add a 10% buffer to the maximum for better visualization
        // For log scale, domain needs to be derived differently, often [min > 0, max]
        if (useLogScale) {
            // Find min and max, ensuring min is positive for log scale
            const values = indicator.historical
                .map((item) => item.value)
                .concat(indicator.value, indicator.target || indicator.value)
                .filter((v) => v > 0); // Filter out non-positive values for log scale

            // Handle case where there are no positive values
            if (values.length === 0) {
                return [0.1, 1]; // Default domain if no positive data
            }

            const minValue = Math.min(...values);
            const maxValue = Math.max(...values);

            // Ensure minValue is slightly smaller than the actual min for visibility if needed,
            // but recharts usually handles this. Let's stick to the actual min/max.
            // Add a buffer to the max value.
            return [minValue, maxValue * 1.1];
        }

        return [0, Math.ceil(maxValue * 1.1)];
    };

    // Formatter for Y-axis ticks, especially for log scale
    const yAxisTickFormatter = (value: number) => {
        if (useLogScale) {
            // Use SI formatter for large numbers on log axis
            return formatNumberWithSI(value, indicator.unit, 0); // Use 0 precision for cleaner axis
        }
        if (isPercentage) {
            return `${value}%`;
        }
        return String(value);
    };

    // Formatter for Tooltip
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Recharts tooltip props type is complex
    const tooltipFormatter = (value: number, name: string, props: any) => {
        // Use SI formatter for large numbers in tooltip
        // TODO: Improve typing for props if possible, e.g., props: { payload?: Record<string, any> }
        if (indicator.unit === "Watts" || indicator.unit === "FLOPS") {
            return [formatNumberWithSI(value, indicator.unit, 2), "Value"]; // Show unit in tooltip
        }
        // Default formatting
        return [`${value}${isPercentage ? "%" : ""}`, "Value"];
    };

    // Calculate ticks for the year axis
    const yearTicks = getYearTicks(indicator.historical);

    const renderChart = () => {
        switch (indicator.chartType) {
            case "line":
                return (
                    <LineChart data={indicator.historical}>
                        <XAxis
                            dataKey="year"
                            type="number" // Treat year as a continuous number
                            domain={["dataMin", "dataMax"]} // Scale axis from min to max year
                            allowDataOverflow={true} // Ensure domain covers the full range
                            ticks={yearTicks} // Use calculated ticks
                            tick={{ fontSize: 10, fill: "#94A3B8" }}
                            axisLine={{ stroke: "#334155" }}
                            tickLine={{ stroke: "#334155" }}
                        />
                        <YAxis
                            scale={useLogScale ? "log" : "auto"}
                            domain={getYAxisDomain()}
                            allowDataOverflow={true}
                            tickFormatter={yAxisTickFormatter}
                            tick={{ fontSize: 10, fill: "#94A3B8" }}
                            axisLine={{ stroke: "#334155" }}
                            tickLine={{ stroke: "#334155" }}
                            width={useLogScale ? 50 : 30}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "rgba(15, 23, 42, 0.9)",
                                border: "1px solid #334155",
                                borderRadius: "6px",
                                fontSize: "12px",
                            }}
                            formatter={tooltipFormatter}
                        />
                        <Line
                            type="monotone"
                            dataKey="value"
                            stroke={color}
                            strokeWidth={2}
                            dot={false} // Hide default dots
                            activeDot={{ r: 5, fill: color, stroke: "#0F172A" }} // Show dot only on hover
                        />
                    </LineChart>
                );

            case "bar":
                return (
                    <BarChart data={indicator.historical}>
                        <XAxis
                            dataKey="year"
                            type="number" // Treat year as a continuous number
                            domain={["dataMin", "dataMax"]} // Scale axis from min to max year
                            allowDataOverflow={true} // Ensure domain covers the full range
                            ticks={yearTicks} // Use calculated ticks
                            tick={{ fontSize: 10, fill: "#94A3B8" }}
                            axisLine={{ stroke: "#334155" }}
                            tickLine={{ stroke: "#334155" }}
                        />
                        <YAxis
                            scale={useLogScale ? "log" : "auto"}
                            domain={getYAxisDomain()}
                            allowDataOverflow={true}
                            tickFormatter={yAxisTickFormatter}
                            tick={{ fontSize: 10, fill: "#94A3B8" }}
                            axisLine={{ stroke: "#334155" }}
                            tickLine={{ stroke: "#334155" }}
                            width={useLogScale ? 50 : 30}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "rgba(15, 23, 42, 0.9)",
                                border: "1px solid #334155",
                                borderRadius: "6px",
                                fontSize: "12px",
                            }}
                            formatter={tooltipFormatter}
                        />
                        <Bar
                            dataKey="value"
                            fill={color}
                            radius={[4, 4, 0, 0]}
                        />
                    </BarChart>
                );

            case "area":
                return (
                    <AreaChart data={indicator.historical}>
                        <XAxis
                            dataKey="year"
                            type="number" // Treat year as a continuous number
                            domain={["dataMin", "dataMax"]} // Scale axis from min to max year
                            allowDataOverflow={true} // Ensure domain covers the full range
                            ticks={yearTicks} // Use calculated ticks
                            tick={{ fontSize: 10, fill: "#94A3B8" }}
                            axisLine={{ stroke: "#334155" }}
                            tickLine={{ stroke: "#334155" }}
                        />
                        <YAxis
                            scale={useLogScale ? "log" : "auto"}
                            domain={getYAxisDomain()}
                            allowDataOverflow={true}
                            tickFormatter={yAxisTickFormatter}
                            tick={{ fontSize: 10, fill: "#94A3B8" }}
                            axisLine={{ stroke: "#334155" }}
                            tickLine={{ stroke: "#334155" }}
                            width={useLogScale ? 50 : 30}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "rgba(15, 23, 42, 0.9)",
                                border: "1px solid #334155",
                                borderRadius: "6px",
                                fontSize: "12px",
                            }}
                            formatter={tooltipFormatter}
                        />
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke={color}
                            fill={color}
                            fillOpacity={0.3}
                        />
                    </AreaChart>
                );

            case "pie": {
                // For pie charts, we'll compare current value to target or max possible
                const pieData = [
                    { name: "Current", value: indicator.value },
                    {
                        name: "Remaining",
                        value:
                            (indicator.target ||
                                (isPercentage ? 100 : indicator.value * 2)) -
                            indicator.value,
                    },
                ];

                return (
                    <PieChart>
                        <Pie
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            innerRadius={40}
                            outerRadius={60}
                            paddingAngle={2}
                            dataKey="value"
                        >
                            <Cell key={`cell-0`} fill={color} />
                            <Cell key={`cell-1`} fill="#334155" />
                        </Pie>
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "rgba(15, 23, 42, 0.9)",
                                border: "1px solid #334155",
                                borderRadius: "6px",
                                fontSize: "12px",
                            }}
                            formatter={tooltipFormatter}
                        />
                    </PieChart>
                );
            }
            default:
                return (
                    <div className="text-center">Chart type not supported</div>
                );
        }
    };

    return (
        <ResponsiveContainer width="100%" height={height}>
            {renderChart()}
        </ResponsiveContainer>
    );
};
