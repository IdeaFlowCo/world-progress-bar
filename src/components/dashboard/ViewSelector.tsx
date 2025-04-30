
import { LayoutDashboard, BarChart, List, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashboardView } from "@/types/dashboard";

interface ViewSelectorProps {
  currentView: DashboardView;
  onViewChange: (view: DashboardView) => void;
}

export const ViewSelector = ({ currentView, onViewChange }: ViewSelectorProps) => {
  const views = [
    { id: "cards" as DashboardView, icon: LayoutDashboard, label: "Card View" },
    { id: "charts" as DashboardView, icon: BarChart, label: "Chart View" },
    { id: "table" as DashboardView, icon: List, label: "Table View" },
    { id: "map" as DashboardView, icon: MapPin, label: "Map View" },
  ];

  return (
    <div className="flex items-center gap-2 mb-6">
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
  );
};
