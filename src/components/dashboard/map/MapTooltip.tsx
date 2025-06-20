interface MapTooltipProps {
    content: string;
    position: { x: number; y: number };
    isMobile?: boolean;
}

export const MapTooltip = ({ content, position, isMobile = false }: MapTooltipProps) => {
    if (!content) return null;

    if (isMobile) {
        // Fixed position at top of screen for mobile, properly centered
        return (
            <div
                className="fixed top-20 left-4 right-4 mx-auto bg-slate-900 px-4 py-3 rounded-lg shadow-xl border border-slate-600 z-50 max-w-sm"
                role="tooltip"
            >
                <div className="text-sm text-slate-100 font-medium text-center">{content}</div>
                <div className="text-xs text-slate-400 mt-1 text-center">Tap elsewhere to dismiss</div>
            </div>
        );
    }

    return (
        <div
            className="absolute bg-slate-900/95 px-3 py-2 rounded shadow-lg pointer-events-none border border-slate-700 z-20"
            style={{
                left: position.x + 10,
                top: position.y - 30,
            }}
            role="tooltip"
        >
            <div className="text-sm text-slate-100">{content}</div>
        </div>
    );
};