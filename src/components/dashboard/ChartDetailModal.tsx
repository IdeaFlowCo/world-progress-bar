import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { ProgressIndicator } from "@/types/dashboard";
import { IndicatorChart } from "./IndicatorChart";

interface ChartDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    indicator: ProgressIndicator | null; // Allow null initially
}

export const ChartDetailModal = ({
    isOpen,
    onClose,
    indicator,
}: ChartDetailModalProps) => {
    if (!indicator) return null; // Don't render if no indicator is selected

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[600px] md:max-w-[800px] lg:max-w-[900px] glass-morphism">
                <DialogHeader>
                    <DialogTitle>
                        {indicator.name} - Historical Trend
                    </DialogTitle>
                    <DialogDescription>
                        {indicator.description}
                    </DialogDescription>
                </DialogHeader>
                <div className="mt-4 h-[350px] md:h-[400px]">
                    {" "}
                    {/* Give the chart more height */}
                    <IndicatorChart
                        indicator={indicator}
                        height={undefined}
                    />{" "}
                    {/* Use responsive container's height */}
                </div>
            </DialogContent>
        </Dialog>
    );
};
