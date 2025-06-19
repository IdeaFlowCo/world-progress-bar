import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatNumberWithSI(
    num: number | undefined | null,
    unit: string,
    precision: number = 2
): string {
    if (num === null || num === undefined) return "";

    // --- Special Handling for People ---
    if (unit.toLowerCase() === "people") {
        if (Math.abs(num) >= 1e9) {
            const value = (num / 1e9).toFixed(precision);
            return `${parseFloat(value).toString()} billion people`;
        }
        if (Math.abs(num) >= 1e6) {
            const value = (num / 1e6).toFixed(precision);
            return `${parseFloat(value).toString()} million people`;
        }
        // Format with commas, no decimals for < 1 million
        return `${formatNumberWithCommas(num, { precision: 0 })} people`;
    }

    // --- Special Handling for very small currency values ---
    // Use scientific notation for absolute values less than 0.001 for currency
    if (unit.startsWith("$") && Math.abs(num) > 0 && Math.abs(num) < 1e-3) {
        return `${num.toExponential(precision)} ${unit}`;
    }

    const tiers = [
        { value: 1e24, symbol: "Y" }, // Yotta
        { value: 1e21, symbol: "Z" }, // Zetta
        { value: 1e18, symbol: "E" }, // Exa
        { value: 1e15, symbol: "P" }, // Peta
        { value: 1e12, symbol: "T" }, // Tera
        { value: 1e9, symbol: "G" }, // Giga
        { value: 1e6, symbol: "M" }, // Mega
        { value: 1e3, symbol: "k" }, // Kilo
        { value: 1, symbol: "" }, // Base
        { value: 1e-3, symbol: "m" }, // Milli
        { value: 1e-6, symbol: "μ" }, // Micro
        { value: 1e-9, symbol: "n" }, // Nano
        { value: 1e-12, symbol: "p" }, // Pico
        { value: 1e-15, symbol: "f" }, // Femto
    ];

    // Find the highest tier the number is greater than or equal to
    const tier = tiers.find((t) => Math.abs(num) >= t.value);

    // Apply SI prefix if not base tier and not handled above
    if (tier && tier.value !== 1) {
        const value = (num / tier.value).toFixed(precision);
        // Remove trailing zeros and potential trailing decimal point
        const formattedValue = parseFloat(value).toString();
        return `${formattedValue} ${tier.symbol}${unit}`;
    }

    // Handle numbers between the smallest prefix (femto) and 1, or exactly 0
    if (Math.abs(num) > 0 && Math.abs(num) < 1) {
        // Use scientific notation if smaller than micro (1e-6)
        if (Math.abs(num) < 1e-6) {
            return `${num.toExponential(precision)} ${unit}`;
        }
        // Otherwise, use fixed notation with more precision for small numbers
        // Ensure at least 'precision' digits, but maybe more if needed to show value
        const fixedPrecision = Math.max(
            precision,
            -Math.floor(Math.log10(Math.abs(num)))
        );
        return `${num.toFixed(fixedPrecision)} ${unit}`;
    }

    // For numbers >= 1 or exactly 0, format with specified precision
    // Only add commas for numbers in a reasonable range (not too large)
    if (Math.abs(num) >= 10000 && Math.abs(num) < 1e15) {
        return `${formatNumberWithCommas(num, { precision })} ${unit}`;
    }
    
    // For smaller numbers or very large numbers, use standard formatting
    const fixedValue = num.toFixed(precision);
    const formattedBaseValue = parseFloat(fixedValue).toString();
    return `${formattedBaseValue} ${unit}`;
}

export function formatValueWithDisplayPrecision(
    value: number,
    precision?: number,
    useCommas: boolean = true
): string {
    // Only use commas for "normal" numbers (not too small, not too large)
    // Skip commas for very small numbers that might need scientific notation
    if (Math.abs(value) < 0.01 && value !== 0) {
        // For very small numbers, use standard precision without commas
        if (typeof precision === "number") {
            return value.toFixed(precision);
        }
        return value.toString();
    }
    
    // Skip commas for very large numbers that might be better in scientific notation
    if (Math.abs(value) >= 1e15) {
        return value.toExponential(precision !== undefined ? precision : 2);
    }
    
    // For "normal" range numbers, use comma formatting
    return formatNumberWithCommas(value, { 
        precision, 
        useThousandsSeparator: useCommas 
    });
}

export function formatNumberWithCommas(
    value: number,
    options?: {
        precision?: number;
        useThousandsSeparator?: boolean;
    }
): string {
    const { precision, useThousandsSeparator = true } = options || {};
    
    // Use toLocaleString for proper formatting with commas
    return value.toLocaleString(undefined, {
        minimumFractionDigits: precision,
        maximumFractionDigits: precision !== undefined ? precision : (Number.isInteger(value) ? 0 : 2),
        useGrouping: useThousandsSeparator
    });
}
