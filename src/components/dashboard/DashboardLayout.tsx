// src/components/dashboard/DashboardLayout.tsx
import { useState, useEffect } from "react";
import { ProgressCard } from "./ProgressCard";
import { Sidebar } from "./Sidebar";
import { ViewSelector } from "./ViewSelector";
import { IndicatorChart } from "./IndicatorChart";
import { MapView } from "./MapView"; // Import the new MapView component
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { AlertTriangle } from "lucide-react";
import { useDashboard } from "@/hooks/useDashboard";
import { DashboardView } from "@/types/dashboard";

export const DashboardLayout = () => {
    const {
        indicators,
        view,
        setView,
        categoryFilter,
        setCategoryFilter,
        setSearchQuery,
        updateIndicator,
        removeIndicator,
    } = useDashboard();

    // Check if mobile on mount and set sidebar accordingly
    const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
        // Initialize based on viewport width
        return window.innerWidth < 768;
    });
    const [showAllCharts, setShowAllCharts] = useState(false);
    const [hasUserToggledSidebar, setHasUserToggledSidebar] = useState(false);
    
    useEffect(() => {
        // Only auto-adjust on significant size changes (tablet to mobile, etc)
        let resizeTimeout: ReturnType<typeof setTimeout>;
        const handleResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                const isMobile = window.innerWidth < 768;
                
                // Only auto-adjust if user hasn't manually toggled
                if (!hasUserToggledSidebar) {
                    setSidebarCollapsed(isMobile);
                }
            }, 150); // Debounce resize events
        };
        
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            clearTimeout(resizeTimeout);
        };
    }, [hasUserToggledSidebar]);

    const renderContent = () => {
        if (indicators.length === 0) {
            return (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                    <AlertTriangle className="h-12 w-12 text-amber-500 mb-4" />
                    <h2 className="text-xl font-medium mb-2">
                        No indicators found
                    </h2>
                    <p className="text-slate-400">
                        Try adjusting your search or filter criteria, or add a
                        new indicator.
                    </p>
                </div>
            );
        }

        switch (view) {
            case "cards": {
                // Filter out indicators not suitable for card view (like GHI which is map-only)
                const cardIndicators = indicators.filter(
                    (ind) => ind.id !== "global-happiness-index"
                );
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {cardIndicators.map((indicator) => (
                            <ProgressCard
                                key={indicator.id}
                                indicator={indicator}
                                onUpdate={updateIndicator}
                                onDelete={removeIndicator}
                                forceShowChart={showAllCharts}
                            />
                        ))}
                    </div>
                );
            }
            case "charts": {
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {indicators.map((indicator) => (
                            <div
                                key={indicator.id}
                                className="glass-morphism p-4 rounded-lg overflow-hidden"
                            >
                                <h3 className="text-lg font-medium mb-1">
                                    {indicator.name}
                                </h3>
                                <p className="text-sm text-slate-400 mb-4">
                                    {indicator.description}
                                </p>
                                <div className="h-[250px]">
                                    <IndicatorChart
                                        indicator={indicator}
                                        height={250}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                );
            }
            case "table": {
                return (
                    <div className="glass-morphism rounded-lg overflow-hidden">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="text-slate-300">
                                        Name
                                    </TableHead>
                                    <TableHead className="text-slate-300">
                                        Category
                                    </TableHead>
                                    <TableHead className="text-slate-300">
                                        Value
                                    </TableHead>
                                    <TableHead className="text-slate-300">
                                        Target
                                    </TableHead>
                                    <TableHead className="text-slate-300">
                                        Source
                                    </TableHead>
                                    <TableHead className="text-slate-300">
                                        Last Updated
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {indicators.map((indicator) => (
                                    <TableRow key={indicator.id}>
                                        <TableCell className="font-medium">
                                            {indicator.name}
                                        </TableCell>
                                        <TableCell>
                                            {indicator.category}
                                        </TableCell>
                                        <TableCell>
                                            {indicator.value} {indicator.unit}
                                        </TableCell>
                                        <TableCell>
                                            {indicator.target
                                                ? `${indicator.target} ${indicator.unit}`
                                                : "N/A"}
                                        </TableCell>
                                        <TableCell>
                                            {indicator.source.name}
                                        </TableCell>
                                        <TableCell>
                                            {indicator.source.lastUpdated}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                );
            }
            case "map": {
                // Remove height constraint, let MapView control its height
                return <MapView />;
            }
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen w-full bg-dashboard-darker grid-bg">
            <Sidebar
                onSearchChange={setSearchQuery}
                onCategoryChange={setCategoryFilter}
                onViewChange={(newView) => setView(newView as DashboardView)}
                currentCategory={categoryFilter}
                currentView={view}
                isCollapsed={sidebarCollapsed}
                onToggleCollapse={() => {
                    setSidebarCollapsed(!sidebarCollapsed);
                    setHasUserToggledSidebar(true);
                }}
            />

            <main
                className={`transition-all duration-300 ${
                    sidebarCollapsed ? "ml-16" : "ml-64"
                } p-4 sm:p-6 md:p-8`}
            >
                <div className="mb-6 sm:mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-white">
                        World Progress Bar
                    </h1>
                    <p className="text-sm sm:text-base text-slate-400 mt-1 sm:mt-2">
                        Track and analyze key global development indicators
                    </p>
                </div>

                <ViewSelector
                    currentView={view}
                    onViewChange={(newView) => setView(newView)}
                    showAllCharts={showAllCharts}
                    onShowAllChartsChange={setShowAllCharts}
                />

                {renderContent()}
            </main>
        </div>
    );
};
