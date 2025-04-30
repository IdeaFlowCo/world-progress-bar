
import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { 
  ProgressIndicator, 
  DashboardView, 
  CategoryFilter 
} from "../types/dashboard";
import { initialIndicators } from "../data/initialIndicators";

export function useDashboard() {
  const [indicators, setIndicators] = useState<ProgressIndicator[]>([]);
  const [view, setView] = useState<DashboardView>("cards");
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Load indicators from localStorage or use initial data
  useEffect(() => {
    setIsLoading(true);
    try {
      const savedIndicators = localStorage.getItem("worldProgressIndicators");
      if (savedIndicators) {
        setIndicators(JSON.parse(savedIndicators));
      } else {
        setIndicators(initialIndicators);
      }
    } catch (error) {
      console.error("Error loading indicators:", error);
      setIndicators(initialIndicators);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save indicators to localStorage whenever they change
  useEffect(() => {
    if (indicators.length > 0) {
      localStorage.setItem("worldProgressIndicators", JSON.stringify(indicators));
    }
  }, [indicators]);

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
    const matchesCategory = categoryFilter === "All" || indicator.category === categoryFilter;
    const matchesSearch = indicator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      indicator.description.toLowerCase().includes(searchQuery.toLowerCase());
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
    removeIndicator
  };
}
