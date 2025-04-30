
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProgressIndicator, IndicatorCategory, ChartType } from "@/types/dashboard";

interface EditIndicatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  indicator: ProgressIndicator;
  onUpdate: (indicator: ProgressIndicator) => void;
}

export const EditIndicatorModal = ({ isOpen, onClose, indicator, onUpdate }: EditIndicatorModalProps) => {
  const [name, setName] = useState(indicator.name);
  const [description, setDescription] = useState(indicator.description);
  const [category, setCategory] = useState<IndicatorCategory>(indicator.category);
  const [value, setValue] = useState<number | string>(indicator.value);
  const [target, setTarget] = useState<number | string>(indicator.target || "");
  const [unit, setUnit] = useState(indicator.unit);
  const [chartType, setChartType] = useState<ChartType>(indicator.chartType);
  const [sourceName, setSourceName] = useState(indicator.source.name);
  const [sourceUrl, setSourceUrl] = useState(indicator.source.url);

  useEffect(() => {
    setName(indicator.name);
    setDescription(indicator.description);
    setCategory(indicator.category);
    setValue(indicator.value);
    setTarget(indicator.target || "");
    setUnit(indicator.unit);
    setChartType(indicator.chartType);
    setSourceName(indicator.source.name);
    setSourceUrl(indicator.source.url);
  }, [indicator, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updatedIndicator: ProgressIndicator = {
      ...indicator,
      name,
      description,
      category,
      value: Number(value),
      target: target ? Number(target) : undefined,
      unit,
      chartType,
      source: {
        name: sourceName,
        url: sourceUrl,
        lastUpdated: new Date().toISOString().split("T")[0],
      },
      historical: [
        ...indicator.historical,
        // Only add new historical entry if value changed
        Number(value) !== indicator.value
          ? { year: new Date().getFullYear(), value: Number(value) }
          : null,
      ].filter(Boolean) as { year: number; value: number }[],
    };

    onUpdate(updatedIndicator);
    onClose();
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
          <DialogTitle className="text-xl">Edit Indicator</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Indicator Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-slate-800 border-slate-700"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
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
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-slate-800 border-slate-700 min-h-[80px]"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="value">Current Value</Label>
              <Input
                id="value"
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
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
                className="bg-slate-800 border-slate-700"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="unit">Unit</Label>
              <Input
                id="unit"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="bg-slate-800 border-slate-700"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="source-name">Source Name</Label>
              <Input
                id="source-name"
                value={sourceName}
                onChange={(e) => setSourceName(e.target.value)}
                className="bg-slate-800 border-slate-700"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="source-url">Source URL</Label>
              <Input
                id="source-url"
                value={sourceUrl}
                onChange={(e) => setSourceUrl(e.target.value)}
                className="bg-slate-800 border-slate-700"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="chart-type">Chart Type</Label>
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
              onClick={onClose}
              className="border-slate-600"
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="bg-dashboard-accent1 hover:bg-dashboard-accent1/80 text-black"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
