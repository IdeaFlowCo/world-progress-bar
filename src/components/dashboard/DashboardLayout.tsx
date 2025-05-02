// src/components/dashboard/DashboardLayout.tsx
import { useState } from "react";
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

    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

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
            case "cards":
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {indicators.map((indicator) => (
                            <ProgressCard
                                key={indicator.id}
                                indicator={indicator}
                                onUpdate={updateIndicator}
                                onDelete={removeIndicator}
                            />
                        ))}
                    </div>
                );

            case "charts":
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

            case "table":
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

            case "map":
                // Replace placeholder with the MapView component
                return (
                    <div className="h-[calc(100vh-220px)]">
                        <MapView />
                    </div>
                );

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
                onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
            />

            <main
                className={`transition-all duration-300 ${
                    sidebarCollapsed ? "ml-16" : "ml-64"
                } p-8`}
            >
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white">
                        World Progress Bar
                    </h1>
                    <p className="text-slate-400 mt-2">
                        Track and analyze key global development indicators
                    </p>
                </div>

                <ViewSelector
                    currentView={view}
                    onViewChange={(newView) => setView(newView)}
                />

                {renderContent()}
            </main>
        </div>
    );
};
