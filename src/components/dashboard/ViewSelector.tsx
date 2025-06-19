
import { LayoutDashboard, BarChart, List, MapPin, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { DashboardView } from "@/types/dashboard";

interface ViewSelectorProps {
  currentView: DashboardView;
  onViewChange: (view: DashboardView) => void;
  showAllCharts?: boolean;
  onShowAllChartsChange?: (show: boolean) => void;
}

export const ViewSelector = ({ 
  currentView, 
  onViewChange, 
  showAllCharts = false,
  onShowAllChartsChange 
}: ViewSelectorProps) => {
  const views = [
    { id: "cards" as DashboardView, icon: LayoutDashboard, label: "Card View" },
    { id: "charts" as DashboardView, icon: BarChart, label: "Chart View" },
    { id: "table" as DashboardView, icon: List, label: "Table View" },
    { id: "map" as DashboardView, icon: MapPin, label: "Map View" },
  ];

  return (
    <div className="flex items-center gap-4 mb-6">
      <div className="flex items-center gap-2">
        {views.map((view) => (
          <Button
            key={view.id}
            variant={currentView === view.id ? "default" : "outline"}
            className={`
              flex items-center gap-2
              ${currentView === view.id 
                ? "bg-dashboard-accent1 text-black hover:bg-dashboard-accent1/80" 
                : "border-slate-600 text-slate-300 bg-transparent hover:bg-slate-700"}
            `}
            onClick={() => onViewChange(view.id)}
          >
            <view.icon className="h-4 w-4" />
            {view.label}
          </Button>
        ))}
      </div>
      
      {/* Show charts toggle - only visible in card view */}
      {currentView === "cards" && onShowAllChartsChange && (
        <div className="flex items-center gap-2 ml-4 pl-4 border-l border-slate-600">
          <Label htmlFor="show-all-charts" className="flex items-center gap-2 cursor-pointer text-slate-300">
            {showAllCharts ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
            <span className="text-sm">Show Charts</span>
          </Label>
          <Switch
            id="show-all-charts"
            checked={showAllCharts}
            onCheckedChange={onShowAllChartsChange}
            className="data-[state=checked]:bg-dashboard-accent1"
          />
        </div>
      )}
    </div>
  );
};
