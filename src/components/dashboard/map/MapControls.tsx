import { Search, X } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface MapControlsProps {
    title: string;
    selectedIndex: string;
    onIndexChange: (value: string) => void;
    searchQuery: string;
    onSearchChange: (value: string) => void;
    indexOptions: Array<{ value: string; label: string }>;
}

export const MapControls = ({
    title,
    selectedIndex,
    onIndexChange,
    searchQuery,
    onSearchChange,
    indexOptions,
}: MapControlsProps) => {
    return (
        <div className="p-3 sm:p-4 border-b border-slate-700 bg-slate-900/50 flex flex-col sm:flex-row sm:justify-between gap-3 sm:gap-0 sm:items-center flex-shrink-0">
            {/* Left section: Title, Subtitle, and Search */}
            <div className="w-full sm:w-auto">
                <h3 className="text-base sm:text-lg font-semibold text-slate-100">
                    Global Index Map
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-0.5 sm:mt-1">{title}</p>
                <div className="mt-2 relative w-full sm:w-64">
                    <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                        type="text"
                        placeholder="Search countries..."
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="pl-8 pr-8 h-8 text-sm bg-slate-800 border-slate-700 text-slate-100 placeholder-slate-500"
                        aria-label="Search countries"
                    />
                    {searchQuery && (
                        <Button
                            onClick={() => onSearchChange("")}
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                            aria-label="Clear search"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    )}
                </div>
            </div>
            {/* Right section: Index Selector */}
            <RadioGroup
                value={selectedIndex}
                onValueChange={onIndexChange}
                className="flex items-center space-x-3 sm:space-x-4"
                aria-label="Select index type"
            >
                {indexOptions.map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                        <RadioGroupItem
                            value={option.value}
                            id={option.value}
                            className="border-slate-600 text-cyan-500"
                        />
                        <Label
                            htmlFor={option.value}
                            className="text-sm font-medium text-slate-300 cursor-pointer"
                        >
                            {option.label}
                        </Label>
                    </div>
                ))}
            </RadioGroup>
        </div>
    );
};