interface MapTooltipProps {
    content: string;
    position: { x: number; y: number };
}

export const MapTooltip = ({ content, position }: MapTooltipProps) => {
    if (!content) return null;

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