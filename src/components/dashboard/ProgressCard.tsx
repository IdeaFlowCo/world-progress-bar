
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Pencil, Trash2, BarChart, ExternalLink, MoreVertical } from "lucide-react";
import { ProgressIndicator } from "@/types/dashboard";
import { EditIndicatorModal } from "./EditIndicatorModal";
import { IndicatorChart } from "./IndicatorChart";

interface ProgressCardProps {
  indicator: ProgressIndicator;
  onUpdate: (indicator: ProgressIndicator) => void;
  onDelete: (id: string) => void;
}

export const ProgressCard = ({ indicator, onUpdate, onDelete }: ProgressCardProps) => {
  const [showChart, setShowChart] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  // Calculate progress percentage based on the indicator's target
  const calculateProgressPercentage = () => {
    if (!indicator.target) return null;
    
    // For indicators where lower is better (like poverty rate, child mortality)
    const isLowerBetter = indicator.name.toLowerCase().includes("poverty") || 
                         indicator.name.toLowerCase().includes("mortality");
    
    if (isLowerBetter) {
      // Calculate inverse percentage (how much we've reduced from maximum)
      const startValue = Math.max(indicator.historical[0]?.value || 100, indicator.target * 3);
      const progress = startValue - indicator.value;
      const total = startValue - indicator.target;
      return Math.min(Math.round((progress / total) * 100), 100);
    } else {
      // For indicators where higher is better (default)
      return Math.min(Math.round((indicator.value / indicator.target) * 100), 100);
    }
  };

  const progressPercentage = calculateProgressPercentage();

  // Determine the color based on progress
  const getProgressColor = () => {
    if (progressPercentage === null) return "bg-dashboard-accent1";
    if (progressPercentage < 30) return "bg-red-500";
    if (progressPercentage < 70) return "bg-amber-500";
    return "bg-emerald-500";
  };

  const getProgressColorClass = () => {
    if (progressPercentage === null) return "text-dashboard-accent1";
    if (progressPercentage < 30) return "text-red-500";
    if (progressPercentage < 70) return "text-amber-500";
    return "text-emerald-500";
  };

  // Determine if this indicator is measuring something where lower values are better
  const isLowerBetter = () => {
    return indicator.name.toLowerCase().includes("poverty") || 
           indicator.name.toLowerCase().includes("mortality");
  };

  // Get appropriate display for target value
  const getTargetDisplay = () => {
    if (!indicator.target) return null;
    
    return (
      <div className="text-right">
        <span className="text-sm text-slate-400">
          Target: {isLowerBetter() ? "≤" : "≥"} {indicator.target} {indicator.unit}
        </span>
      </div>
    );
  };

  return (
    <>
      <Card className={`glass-morphism overflow-hidden transition-all duration-300 ${showChart ? 'h-[400px]' : 'h-[280px]'}`}>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-lg font-medium">{indicator.name}</CardTitle>
              <span className="text-xs bg-slate-700 px-2 py-0.5 rounded-full text-slate-200">
                {indicator.category}
              </span>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setShowChart(!showChart)}>
                  <BarChart className="mr-2 h-4 w-4" />
                  {showChart ? "Hide Chart" : "Show Chart"}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setShowEditModal(true)}>
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onDelete(indicator.id)} className="text-red-500">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent className="pb-3">
          <p className="text-sm text-slate-300 mb-4">{indicator.description}</p>
          
          <div className="flex items-end justify-between mb-2">
            <div>
              <span className={`text-3xl font-bold ${getProgressColorClass()}`}>
                {indicator.value}
              </span>
              <span className="text-sm ml-1 text-slate-300">{indicator.unit}</span>
            </div>
            {getTargetDisplay()}
          </div>

          {/* Only show progress bar for indicators that have targets */}
          {indicator.target && (
            <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden mt-2">
              <div 
                className={`h-full ${getProgressColor()} transition-all duration-1000`} 
                style={{ width: `${progressPercentage}%` }} 
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
