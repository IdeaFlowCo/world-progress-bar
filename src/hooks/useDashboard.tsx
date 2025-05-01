// src/hooks/useDashboard.tsx
import { useState, useCallback, useEffect } from "react";
import { toast } from "sonner";
import {
    ProgressIndicator,
    DashboardView,
    CategoryFilter,
} from "../types/dashboard";
import {
    fetchWorldBankIndicator,
    worldBankIndicatorCodes,
} from "../lib/worldbank";
import { staticIndicators } from "../data/staticIndicators"; // Import static indicators

export function useDashboard() {
    // Initialize state with empty array
    const [indicators, setIndicators] = useState<ProgressIndicator[]>([]);
    const [view, setView] = useState<DashboardView>("cards");
    const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("All");
    const [searchQuery, setSearchQuery] = useState("");
    // Set isLoading to true initially while fetching
    const [isLoading, setIsLoading] = useState(true);

    // Fetch data on component mount
    useEffect(() => {
        const loadIndicators = async () => {
            setIsLoading(true);
            let fetchedIndicators: ProgressIndicator[] = []; // Initialize outside try
            try {
                const results = await Promise.allSettled(
                    worldBankIndicatorCodes.map(fetchWorldBankIndicator)
                );

                fetchedIndicators = results // Assign inside try
                    .filter(
                        (
                            result
                        ): result is PromiseFulfilledResult<ProgressIndicator> =>
                            result.status === "fulfilled" &&
                            result.value !== null
                    )
                    .map((result) => result.value);

                // Adjust warning/error messages based on fetched indicators only
                const fetchedCount = fetchedIndicators.length;
                const expectedFetchedCount = worldBankIndicatorCodes.length;
                if (
                    fetchedCount === 0 &&
                    results.some((r) => r.status === "rejected")
                ) {
                    toast.error(
                        "Failed to load indicator data from World Bank API."
                    );
                } else if (fetchedCount < expectedFetchedCount) {
                    toast.warning(
                        "Some World Bank indicator data could not be loaded."
                    );
                }
            } catch (error) {
                console.error("Error loading dashboard indicators:", error);
                toast.error("Failed to load indicator data.");
                // Keep fetchedIndicators as empty array if API fails completely
            } finally {
                // Get IDs of fetched indicators to avoid duplicates
                const fetchedIds = new Set(
                    fetchedIndicators.map((ind) => ind.id)
                );

                // Filter static indicators to remove any that were already fetched
                const uniqueStaticIndicators = staticIndicators.filter(
                    (ind) => !fetchedIds.has(ind.id)
                );

                // Combine fetched indicators with the filtered static ones
                const combinedIndicators = [
                    ...fetchedIndicators,
                    ...uniqueStaticIndicators,
                ];
                setIndicators(combinedIndicators);
                setIsLoading(false); // Set loading false after everything is done
            }
        };

        loadIndicators();
    }, []); // Empty dependency array ensures this runs only once on mount

    // Add a new indicator
    const addIndicator = useCallback((indicator: ProgressIndicator) => {
        setIndicators((prev) => [...prev, indicator]);
        toast.success(`Added new indicator: ${indicator.name}`);
    }, []);

    // Update an existing indicator
    const updateIndicator = useCallback((indicator: ProgressIndicator) => {
        setIndicators((prev) =>
            prev.map((item) => (item.id === indicator.id ? indicator : item))
        );
        toast.success(`Updated indicator: ${indicator.name}`);
    }, []);

    // Remove an indicator
    const removeIndicator = useCallback((id: string) => {
        setIndicators((prev) => prev.filter((item) => item.id !== id));
        toast.success("Indicator removed");
    }, []);

    // Filter indicators based on category and search query
    const filteredIndicators = indicators.filter((indicator) => {
        const matchesCategory =
            categoryFilter === "All" || indicator.category === categoryFilter;
        const matchesSearch =
            indicator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            indicator.description
                .toLowerCase()
                .includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return {
        indicators: filteredIndicators,
        allIndicators: indicators,
        view,
        setView,
        categoryFilter,
        setCategoryFilter,
        searchQuery,
        setSearchQuery,
        isLoading,
        addIndicator,
        updateIndicator,
        removeIndicator,
    };
}
