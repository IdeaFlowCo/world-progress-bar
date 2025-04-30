
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { 
  BookOpen, Search, PlusCircle, Filter, LayoutDashboard, 
  BarChart, List, MapPin, X, GraduationCap, Heart, 
  Gauge, Leaf, LineChart, Lightbulb, Users 
} from "lucide-react";
import { AddIndicatorModal } from "./AddIndicatorModal";
import { CategoryFilter } from "@/types/dashboard";

interface SidebarProps {
  onSearchChange: (query: string) => void;
  onCategoryChange: (category: CategoryFilter) => void;
  onViewChange: (view: string) => void;
  currentCategory: CategoryFilter;
  currentView: string;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export const Sidebar = ({ 
  onSearchChange, 
  onCategoryChange, 
  onViewChange, 
  currentCategory, 
  currentView,
  isCollapsed,
  onToggleCollapse
}: SidebarProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    onSearchChange(e.target.value);
  };

  const categories: { name: CategoryFilter; icon: any }[] = [
    { name: "All", icon: Filter },
    { name: "Health", icon: Heart },
    { name: "Education", icon: GraduationCap },
    { name: "Technology", icon: Gauge },
    { name: "Environment", icon: Leaf },
    { name: "Economy", icon: LineChart },
    { name: "Social", icon: Users },
    { name: "Science", icon: Lightbulb }
  ];

  const views = [
    { name: "cards", label: "Cards", icon: LayoutDashboard },
    { name: "charts", label: "Charts", icon: BarChart },
    { name: "table", label: "Table", icon: List },
    { name: "map", label: "Map", icon: MapPin }
  ];

  return (
    <>
      <aside className={`bg-dashboard-dark glass-morphism h-screen fixed left-0 top-0 z-30 transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}>
        <div className="p-4 flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-dashboard-accent1" />
              <h1 className="font-bold text-xl text-white">Progress<span className="text-dashboard-accent1">Nexus</span></h1>
            </div>
          )}
          
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleCollapse}
            className="hover:bg-slate-700"
          >
            {isCollapsed ? (
              <BarChart className="h-5 w-5" />
            ) : (
              <X className="h-5 w-5" />
            )}
          </Button>
        </div>
        
        <Separator className="my-2 bg-slate-700" />
        
        {!isCollapsed && (
          <div className="p-4">
            <div className="relative">
              <Search className="absolute left-2 top-3 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search indicators..."
                className="pl-8 bg-slate-800 border-slate-700"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
            
            <Button
              variant="outline"
              className="mt-4 w-full flex gap-2 bg-dashboard-dark text-white border-dashboard-accent1 hover:bg-dashboard-accent1 hover:text-black transition-colors"
              onClick={() => setShowAddModal(true)}
            >
              <PlusCircle className="h-5 w-5" />
              <span>Add New Indicator</span>
            </Button>
          </div>
        )}
        
        {isCollapsed && (
          <div className="p-2 flex flex-col items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowAddModal(true)}
              className="hover:bg-slate-700 text-dashboard-accent1"
            >
              <PlusCircle className="h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-slate-700 mt-2"
            >
              <Search className="h-5 w-5" />
            </Button>
          </div>
        )}

        <Separator className="my-2 bg-slate-700" />
        
        <div className={`p-4 ${isCollapsed ? 'flex flex-col items-center' : ''}`}>
          {!isCollapsed && <h2 className="text-sm font-medium mb-2 text-slate-300">Categories</h2>}
          
          <div className={`space-y-1 ${isCollapsed ? 'flex flex-col items-center' : ''}`}>
            {categories.map((category) => (
              <Button
                key={category.name}
                variant="ghost"
                className={`justify-start w-full ${
                  currentCategory === category.name
                    ? "bg-slate-700 text-white"
                    : "text-slate-400 hover:text-white hover:bg-slate-700"
                } ${isCollapsed ? 'p-2' : ''}`}
                onClick={() => onCategoryChange(category.name)}
              >
                <category.icon className={`h-5 w-5 ${isCollapsed ? '' : 'mr-2'}`} />
                {!isCollapsed && <span>{category.name}</span>}
              </Button>
            ))}
          </div>
        </div>
        
        <Separator className="my-2 bg-slate-700" />
        
        <div className={`p-4 ${isCollapsed ? 'flex flex-col items-center' : ''}`}>
          {!isCollapsed && <h2 className="text-sm font-medium mb-2 text-slate-300">View Mode</h2>}
          
          <div className={`space-y-1 ${isCollapsed ? 'flex flex-col items-center' : ''}`}>
            {views.map((view) => (
              <Button
                key={view.name}
                variant="ghost"
                className={`justify-start w-full ${
                  currentView === view.name
                    ? "bg-slate-700 text-white"
                    : "text-slate-400 hover:text-white hover:bg-slate-700"
                } ${isCollapsed ? 'p-2' : ''}`}
                onClick={() => onViewChange(view.name)}
              >
                <view.icon className={`h-5 w-5 ${isCollapsed ? '' : 'mr-2'}`} />
                {!isCollapsed && <span>{view.label}</span>}
              </Button>
            ))}
          </div>
        </div>
      </aside>
      
      <AddIndicatorModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} />
    </>
  );
};
