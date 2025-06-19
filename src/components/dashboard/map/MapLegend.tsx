interface LegendItem {
    color: string;
    label: string;
}

interface MapLegendProps {
    items: LegendItem[];
    unit: string;
    label: string;
}

export const MapLegend = ({ items, unit, label }: MapLegendProps) => {
    return (
        <div
            className="absolute bottom-4 left-4 bg-slate-900/90 p-4 rounded shadow-lg border border-slate-700 z-10"
            aria-label={`Color scale legend for ${label}`}
        >
            <h4 className="text-sm font-medium mb-2 text-slate-300">
                {label} ({unit})
            </h4>
            <div className="space-y-1">
                {items.map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                        <div
                            className="w-6 h-4 rounded"
                            style={{ backgroundColor: item.color }}
                            aria-hidden="true"
                        />
                        <span className="text-xs text-slate-400">
                            {item.label}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};