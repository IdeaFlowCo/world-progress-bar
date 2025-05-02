import { useState } from "react";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Pencil,
    Trash2,
    BarChart,
    ExternalLink,
    MoreVertical,
} from "lucide-react";
import { ProgressIndicator } from "@/types/dashboard";
import { EditIndicatorModal } from "./EditIndicatorModal";
import { IndicatorChart } from "./IndicatorChart";
import { formatNumberWithSI } from "@/lib/utils";

interface ProgressCardProps {
    indicator: ProgressIndicator;
    onUpdate: (indicator: ProgressIndicator) => void;
    onDelete: (id: string) => void;
}

export const ProgressCard = ({
    indicator,
    onUpdate,
    onDelete,
}: ProgressCardProps) => {
    const [showChart, setShowChart] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    // Determine if this indicator is measuring something where lower values are better
    const isLowerBetter = () => {
        return (
            indicator.name.toLowerCase().includes("poverty") ||
            indicator.name.toLowerCase().includes("mortality") ||
            // Add other indicators where lower is better
            indicator.id === "global-temperature-change" ||
            indicator.id === "global-aqi-pm25" ||
            indicator.id === "ecological-footprint" ||
            indicator.id === "global-obesity-overweight" ||
            indicator.id === "gender-inequality-index" // Added GII
        );
    };

    // Calculate progress percentage based on the indicator's target
    const calculateProgressPercentage = () => {
        const { target, value, unit, historical, id } = indicator;
        if (
            target === undefined ||
            target === null ||
            value === null ||
            value === undefined
        )
            return null;

        // Check if log scale should be used
        const useLogScale =
            id === "world-energy-production" ||
            id === "top-supercomputer-flops";

        // For indicators where lower is better
        if (isLowerBetter()) {
            // Determine the worst (highest) value as reference point
            const worstValue = Math.max(
                historical.length > 0
                    ? Math.max(...historical.map((h) => h.value))
                    : value * 1.5, // If no historical data, use 150% of current as baseline
                value * 1.2 // Ensure the worst is at least 20% worse than current
            );

            // Calculate how far we've come from the worst value toward the target
            // For example, if worst was 100, current is 60, and target is 0:
            // Progress would be (100-60)/(100-0) = 40%
            const distanceFromWorst = worstValue - value;
            const totalDistance = worstValue - target;

            // Ensure we don't divide by zero
            if (totalDistance <= 0) return value <= target ? 100 : 0;

            // Calculate percentage and clamp between 0-100
            return Math.min(
                Math.max(
                    Math.round((distanceFromWorst / totalDistance) * 100),
                    0
                ),
                100
            );
        }
        // For indicators where higher is better
        else {
            if (useLogScale) {
                // Define a sensible minimum non-zero start for log scale if first historical is zero or missing
                const logStartValue =
                    historical[0]?.value > 0
                        ? historical[0].value
                        : unit === "Watts"
                        ? 1e9
                        : 1e12; // 1 GW or 1 TFLOPS as default minimum

                // Ensure values are positive for log
                const currentValue = Math.max(value, 1e-9); // Use a tiny positive number if value is 0 or negative
                const targetValue = Math.max(target, 1e-9);
                const startValue = Math.max(logStartValue, 1e-9);

                // Avoid issues if start, current, or target are invalid for log scale or target <= start
                if (targetValue <= startValue || currentValue < startValue) {
                    // If target isn't greater than start, or current hasn't passed start
                    // Return 0 unless value already meets/exceeds target
                    return currentValue >= targetValue ? 100 : 0;
                }

                const logCurrent = Math.log10(currentValue);
                const logTarget = Math.log10(targetValue);
                const logStart = Math.log10(startValue);

                const percentage =
                    ((logCurrent - logStart) / (logTarget - logStart)) * 100;
                return Math.min(Math.max(Math.round(percentage), 0), 100); // Clamp between 0 and 100
            } else {
                // Original linear calculation
                // Ensure target is not zero to avoid division by zero
                if (target === 0) return value >= 0 ? 100 : 0;
                return Math.min(
                    Math.max(Math.round((value / target) * 100), 0),
                    100
                ); // Clamp between 0 and 100
            }
        }
    };

    const progressPercentage = calculateProgressPercentage();

    // Determine the color based on progress or value relative to target
    const getProgressColor = () => {
        const value = indicator.value;
        const target = indicator.target;

        if (target === undefined || target === null)
            return "bg-dashboard-accent1"; // No target, default color

        if (isLowerBetter()) {
            // For "lower is better" indicators, we use the same color scale
            // but based on our improved progress calculation
            if (progressPercentage === null) return "bg-dashboard-accent1";
            if (progressPercentage < 30) return "bg-red-500";
            if (progressPercentage < 70) return "bg-amber-500";
            return "bg-emerald-500";
        } else {
            // Original logic for "higher is better"
            if (progressPercentage === null) return "bg-dashboard-accent1";
            if (progressPercentage < 30) return "bg-red-500";
            if (progressPercentage < 70) return "bg-amber-500";
            return "bg-emerald-500";
        }
    };

    const getProgressColorClass = () => {
        const value = indicator.value;
        const target = indicator.target;

        if (target === undefined || target === null)
            return "text-dashboard-accent1"; // No target, default color

        if (isLowerBetter()) {
            // Use same color logic as progress bar for consistency
            if (progressPercentage === null) return "text-dashboard-accent1";
            if (progressPercentage < 30) return "text-red-500";
            if (progressPercentage < 70) return "text-amber-500";
            return "text-emerald-500";
        } else {
            // Original logic for "higher is better"
            if (progressPercentage === null) return "text-dashboard-accent1";
            if (progressPercentage < 30) return "text-red-500";
            if (progressPercentage < 70) return "text-amber-500";
            return "text-emerald-500";
        }
    };

    // Get appropriate display for target value
    const getTargetDisplay = () => {
        if (indicator.target === undefined || indicator.target === null)
            return null; // Check for undefined/null

        const targetValue =
            indicator.unit === "Watts" || indicator.unit === "FLOPS"
                ? formatNumberWithSI(indicator.target, indicator.unit)
                : `${indicator.target} ${indicator.unit}`;

        return (
            <div className="text-right">
                <span className="text-sm text-slate-400">
                    Target: {isLowerBetter() ? "≤" : "≥"} {targetValue}
                </span>
            </div>
        );
    };

    // Format the main value display based on unit
    let displayValue: string;
    let displayUnit: string = indicator.unit; // Default to indicator unit

    if (indicator.id === "global-gdp") {
        // Format as $X.Y Trillion (using SI prefix T)
        const formattedSI = formatNumberWithSI(indicator.value, "USD"); // Use 'USD' unit hint
        const valueParts = formattedSI.split(/\s+/); // e.g., ["90.1", "T"]
        displayValue = `$${valueParts[0]}`; // Add $ prefix
        displayUnit = valueParts.length > 1 ? valueParts[1] : ""; // Keep SI prefix (T for Trillion)
    } else if (indicator.id === "solar-cost-per-watt") {
        // Format as $X.YZ / Watt
        displayValue = `$${indicator.value.toFixed(2)}`; // Add $ prefix and format to 2 decimals
        displayUnit = "/ Watt"; // Set unit explicitly
    } else if (indicator.unit === "%") {
        displayValue = indicator.value.toFixed(1); // Format percentage to 1 decimal place
        displayUnit = "%"; // Ensure unit is just '%'
    } else if (indicator.unit === "Watts" || indicator.unit === "FLOPS") {
        const formattedSI = formatNumberWithSI(indicator.value, indicator.unit);
        const valueParts = formattedSI.split(/\s+/);
        displayValue = valueParts[0];
        displayUnit =
            valueParts.length > 1 ? valueParts.slice(1).join(" ") : "";
    } else if (indicator.id === "gender-inequality-index") {
        // Format GII to 3 decimal places
        displayValue = indicator.value.toFixed(3);
        displayUnit = indicator.unit; // Keep the original unit ("Index Score")
    } else {
        // For other units, use SI formatting for better precision and readability
        const formattedSI = formatNumberWithSI(indicator.value, indicator.unit);
        const valueParts = formattedSI.split(/\s+/);
        displayValue = valueParts[0];
        displayUnit =
            valueParts.length > 1 ? valueParts.slice(1).join(" ") : "";
    }

    // Conditionally shorten the description for Global GDP when chart is hidden
    let displayDescription = indicator.description;
    if (indicator.id === "global-gdp" && !showChart) {
        displayDescription =
            "Gross domestic product (GDP) is a measure of the total value added from the production of goods and services globally each year.";
    }

    return (
        <>
            <Card
                className={`glass-morphism overflow-hidden transition-all duration-300`}
            >
                <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                        <div>
                            <CardTitle className="text-lg font-medium">
                                {indicator.name}
                            </CardTitle>
                            <span className="text-xs bg-slate-700 px-2 py-0.5 rounded-full text-slate-200">
                                {indicator.category}
                            </span>
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8"
                                >
                                    <MoreVertical className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                    onClick={() => setShowChart(!showChart)}
                                >
                                    <BarChart className="mr-2 h-4 w-4" />
                                    {showChart ? "Hide Chart" : "Show Chart"}
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => setShowEditModal(true)}
                                >
                                    <Pencil className="mr-2 h-4 w-4" />
                                    Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => onDelete(indicator.id)}
                                    className="text-red-500"
                                >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </CardHeader>
                <CardContent className="pb-3">
                    <p className="text-sm text-slate-300 mb-4">
                        {displayDescription}
                    </p>

                    <div className="flex items-end justify-between mb-2">
                        <div>
                            <span
                                className={`text-3xl font-bold ${getProgressColorClass()}`}
                            >
                                {displayValue}
                            </span>
                            {displayUnit && (
                                <span className="text-sm ml-1 text-slate-300">
                                    {displayUnit}
                                </span>
                            )}
                        </div>
                        {getTargetDisplay()}
                    </div>

                    {/* Only show progress bar for indicators that have targets */}
                    {indicator.target !== undefined &&
                        indicator.target !== null && (
                            <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden mt-2">
                                <div
                                    className={`h-full ${getProgressColor()} transition-all duration-1000`}
                                    style={{
                                        // If lower is better AND progress is poor (red), show full bar
                                        width:
                                            isLowerBetter() &&
                                            getProgressColor() === "bg-red-500"
                                                ? "100%"
                                                : `${progressPercentage}%`,
                                    }}
                                />
                            </div>
                        )}

                    {showChart && (
                        <div className="mt-4 h-[160px]">
                            <IndicatorChart indicator={indicator} />
                        </div>
                    )}
                </CardContent>
                <CardFooter className="pt-0 text-xs text-slate-400 flex justify-between">
                    <div>Last update: {indicator.source.lastUpdated}</div>
                    <a
                        href={indicator.source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center hover:text-dashboard-accent1 transition-colors"
                    >
                        {indicator.source.name}
                        <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                </CardFooter>
            </Card>

            <EditIndicatorModal
                isOpen={showEditModal}
                onClose={() => setShowEditModal(false)}
                indicator={indicator}
                onUpdate={onUpdate}
            />
        </>
    );
};
