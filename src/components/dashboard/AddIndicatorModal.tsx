
import { useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";
import { ProgressIndicator, IndicatorCategory, ChartType } from "@/types/dashboard";
import { useDashboard } from "@/hooks/useDashboard";

interface AddIndicatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DEFAULT_COLOR = "#06B6D4";

export const AddIndicatorModal = ({ isOpen, onClose }: AddIndicatorModalProps) => {
  const { addIndicator } = useDashboard();
  
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<IndicatorCategory>("Other");
  const [value, setValue] = useState<number | string>("");
  const [target, setTarget] = useState<number | string>("");
  const [unit, setUnit] = useState("");
  const [chartType, setChartType] = useState<ChartType>("line");
  const [sourceName, setSourceName] = useState("");
  const [sourceUrl, setSourceUrl] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !description || !category || value === "" || !unit || !chartType || !sourceName) {
      toast.error("Please fill all required fields");
      return;
    }

    const newIndicator: ProgressIndicator = {
      id: uuidv4(),
      name,
      description,
      category,
      value: Number(value),
      target: target ? Number(target) : undefined,
      unit,
      chartType,
      source: {
        name: sourceName,
        url: sourceUrl || "#",
        lastUpdated: new Date().toISOString().split("T")[0],
      },
      historical: [{ year: new Date().getFullYear(), value: Number(value) }],
      color: DEFAULT_COLOR,
    };

    addIndicator(newIndicator);
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setCategory("Other");
    setValue("");
    setTarget("");
    setUnit("");
    setChartType("line");
    setSourceName("");
    setSourceUrl("");
  };

  const categoryOptions: IndicatorCategory[] = [
    "Health",
    "Education",
    "Technology",
    "Environment",
    "Economy",
    "Social",
    "Science",
    "Other"
  ];

  const chartTypeOptions: { value: ChartType; label: string }[] = [
    { value: "line", label: "Line Chart" },
    { value: "bar", label: "Bar Chart" },
    { value: "area", label: "Area Chart" },
    { value: "pie", label: "Pie Chart" },
  ];
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-morphism border-slate-700 sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Add New Indicator</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Indicator Name *</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Global Literacy Rate"
                className="bg-slate-800 border-slate-700"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select
                value={category}
                onValueChange={(value) => setCategory(value as IndicatorCategory)}
              >
                <SelectTrigger className="bg-slate-800 border-slate-700">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categoryOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of what this indicator measures"
              className="bg-slate-800 border-slate-700 min-h-[80px]"
            />
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="value">Current Value *</Label>
              <Input
                id="value"
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="e.g., 86.3"
                className="bg-slate-800 border-slate-700"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="target">Target Value</Label>
              <Input
                id="target"
                type="number"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                placeholder="e.g., 100"
                className="bg-slate-800 border-slate-700"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="unit">Unit *</Label>
              <Input
                id="unit"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                placeholder="e.g., %"
                className="bg-slate-800 border-slate-700"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="source-name">Source Name *</Label>
              <Input
                id="source-name"
                value={sourceName}
                onChange={(e) => setSourceName(e.target.value)}
                placeholder="e.g., UNESCO"
                className="bg-slate-800 border-slate-700"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="source-url">Source URL</Label>
              <Input
                id="source-url"
                value={sourceUrl}
                onChange={(e) => setSourceUrl(e.target.value)}
                placeholder="e.g., https://unesco.org"
                className="bg-slate-800 border-slate-700"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="chart-type">Chart Type *</Label>
            <Select
              value={chartType}
              onValueChange={(value) => setChartType(value as ChartType)}
            >
              <SelectTrigger className="bg-slate-800 border-slate-700">
                <SelectValue placeholder="Select chart type" />
              </SelectTrigger>
              <SelectContent>
                {chartTypeOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => {
                resetForm();
                onClose();
              }}
              className="border-slate-600"
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="bg-dashboard-accent1 hover:bg-dashboard-accent1/80 text-black"
            >
              Add Indicator
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
