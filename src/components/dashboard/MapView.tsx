// src/components/dashboard/MapView.tsx
import { useState, useEffect } from "react";
import {
    ComposableMap,
    Geographies,
    Geography,
    ZoomableGroup,
} from "react-simple-maps";
import { scaleLinear, ScaleLinear } from "d3-scale";
import { hdiData2022 } from "@/data/hdiData";
import { ghiData2024 } from "@/data/ghiData";
import { countryNameToCodeMap } from "@/data/countryMappings";
import { MapLegend } from "./map/MapLegend";
import { MapTooltip } from "./map/MapTooltip";
import { MapControls } from "./map/MapControls";
import { MAP_CONSTANTS } from "@/constants/dashboard";
import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";

// --- Interfaces ---
interface Geometry {
    type: string;
    arcs: number[][][] | number[];
}
interface Properties {
    name: string;
}
interface TopologyObject {
    type:
        | "Point"
        | "MultiPoint"
        | "LineString"
        | "MultiLineString"
        | "Polygon"
        | "MultiPolygon"
        | "GeometryCollection";
    properties: Properties;
    geometries?: Geometry[];
    arcs?: number[][][] | number[];
    id?: string | number;
}
interface GeoJsonData {
    type: "Topology";
    objects: { [key: string]: TopologyObject };
    arcs: number[][][];
}

// --- Constants ---
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// --- HDI Configuration ---
const hdiColorScale = scaleLinear<string>()
    .domain([0.3, 0.6, 0.8, 0.95])
    .range(["#eff3ff", "#bdd7e7", "#6baed6", "#2171b5"]);
const hdiLegendItems = [
    { color: hdiColorScale(0.3), label: "< 0.6" },
    { color: hdiColorScale(0.6), label: "0.6 - 0.8" },
    { color: hdiColorScale(0.8), label: "0.8 - 0.95" },
    { color: hdiColorScale(0.95), label: "> 0.95" },
    { color: MAP_CONSTANTS.NO_DATA_COLOR, label: "No data" },
];

// --- GHI Configuration ---
const ghiColorScale = scaleLinear<string>()
    .domain([2, 4, 6, 7.5])
    .range(["#fee08b", "#fdae61", "#f46d43", "#d73027"].reverse());
const ghiLegendItems = [
    { color: ghiColorScale(2), label: "< 4" },
    { color: ghiColorScale(4), label: "4 - 6" },
    { color: ghiColorScale(6), label: "6 - 7.5" },
    { color: ghiColorScale(7.5), label: "> 7.5" },
    { color: MAP_CONSTANTS.NO_DATA_COLOR, label: "No data" },
];

// --- Map Data Configuration ---
interface MapDisplayData {
    data: Record<string, number>;
    scale: ScaleLinear<string, string, never>;
    legend: Array<{ color: string; label: string }>;
    title: string;
    unit: string;
    label: string;
}

const mapIndexData = {
    hdi: {
        data: hdiData2022,
        scale: hdiColorScale,
        legend: hdiLegendItems,
        title: "Human Development Index (HDI) 2022",
        unit: "Index",
        label: "HDI",
    },
    ghi: {
        data: ghiData2024,
        scale: ghiColorScale,
        legend: ghiLegendItems,
        title: "Global Happiness Index (GHI) 2024",
        unit: "Score",
        label: "GHI",
    },
};
type SelectedIndex = keyof typeof mapIndexData;

// --- Component ---
export const MapView = () => {
    const [tooltipContent, setTooltipContent] = useState("");
    const [tooltipPosition, setTooltipPosition] = useState<{
        x: number;
        y: number;
    }>({ x: 0, y: 0 });
    const [geoData, setGeoData] = useState<GeoJsonData | null>(null);
    const [selectedIndex, setSelectedIndex] = useState<SelectedIndex>("hdi");
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showLegend, setShowLegend] = useState(() => window.innerWidth >= 640);

    const currentMapData: MapDisplayData = mapIndexData[selectedIndex];

    useEffect(() => {
        const fetchGeoData = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const response = await fetch(geoUrl);
                if (!response.ok) {
                    throw new Error(`Failed to fetch map data: ${response.statusText}`);
                }
                const data = await response.json();
                setGeoData(data);
            } catch (err) {
                console.error("Error fetching GeoJSON:", err);
                setError(err instanceof Error ? err.message : "Failed to load map data");
            } finally {
                setIsLoading(false);
            }
        };
        
        fetchGeoData();
    }, []);

    if (isLoading) {
        return (
            <div className="w-full h-[70vh] border border-slate-700 rounded-lg flex items-center justify-center bg-slate-900/50">
                <div className="text-slate-400">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500 mx-auto mb-4"></div>
                    <p>Loading map data...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full h-[70vh] border border-slate-700 rounded-lg flex items-center justify-center bg-slate-900/50">
                <div className="text-center">
                    <div className="text-red-500 mb-4">
                        <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-100 mb-2">Error Loading Map</h3>
                    <p className="text-slate-400 mb-4">{error}</p>
                    <button 
                        onClick={() => window.location.reload()}
                        className="px-4 py-2 bg-cyan-600 text-white rounded hover:bg-cyan-700 transition-colors"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    if (!geoData) {
        return null;
    }

    return (
        // Main container: flex column, relative for tooltip positioning
        <div className="w-full h-[calc(100vh-200px)] sm:h-[70vh] border border-slate-700 rounded-lg overflow-hidden flex flex-col relative" aria-label={`World map showing ${currentMapData.label} data`}>
            {/* Header: Title, Subtitle, Search, and Selector - Prevent shrinking */}
            <MapControls
                title={currentMapData.title}
                selectedIndex={selectedIndex}
                onIndexChange={(value) => setSelectedIndex(value as SelectedIndex)}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                indexOptions={[
                    { value: "hdi", label: "HDI" },
                    { value: "ghi", label: "GHI" },
                ]}
            />

            {/* Legend with toggle button on mobile */}
            {showLegend && (
                <MapLegend 
                    items={currentMapData.legend}
                    unit={currentMapData.unit}
                    label={currentMapData.label}
                />
            )}
            
            {/* Legend toggle button - visible on mobile */}
            <Button
                variant="ghost"
                size="icon"
                className="sm:hidden absolute bottom-4 right-4 z-20 bg-slate-900/90 hover:bg-slate-800/90"
                onClick={() => setShowLegend(!showLegend)}
                aria-label={showLegend ? "Hide legend" : "Show legend"}
            >
                <Info className="h-4 w-4" />
            </Button>

            {/* Map Container: Grow to fill space, relative for tooltip */}
            <div className="flex-grow relative">
                {/* Wrapper div to ensure map takes full height/width of container */}
                <div
                    className="w-full h-full"
                    onMouseMove={(e) =>
                        setTooltipPosition({ x: e.clientX, y: e.clientY })
                    }
                >
                    <ComposableMap
                        projectionConfig={{ rotate: [-10, 0, 0] }}
                        style={{ width: "100%", height: "100%" }}
                        role="application"
                        aria-label={`Interactive world map showing ${currentMapData.label} data by country`}
                    >
                        <ZoomableGroup center={[0, 0]} zoom={1.0}>
                            <Geographies geography={geoData}>
                                {({ geographies }) =>
                                    geographies.map((geo) => {
                                        const countryName = geo.properties.name;
                                        const countryCode =
                                            countryNameToCodeMap[countryName];
                                        const value = countryCode
                                            ? currentMapData.data[countryCode]
                                            : undefined;
                                        const fillColor = value
                                            ? currentMapData.scale(value)
                                            : "#666";
                                        const currentTooltipText = `${
                                            countryName || "Unknown"
                                        }: ${
                                            value ? value.toFixed(3) : "No data"
                                        } (${currentMapData.unit})`;

                                        const trimmedSearchQuery = searchQuery
                                            .trim()
                                            .toLowerCase();
                                        const isHighlighted =
                                            trimmedSearchQuery !== "" &&
                                            countryName
                                                ?.toLowerCase()
                                                .includes(trimmedSearchQuery);

                                        return (
                                            <Geography
                                                key={geo.rsmKey}
                                                geography={geo}
                                                aria-label={currentTooltipText}
                                                role="img"
                                                onMouseEnter={() => {
                                                    setTooltipContent(
                                                        currentTooltipText
                                                    );
                                                }}
                                                onMouseLeave={() => {
                                                    setTooltipContent("");
                                                }}
                                                style={{
                                                    default: {
                                                        fill: fillColor,
                                                        stroke: isHighlighted
                                                            ? "#FFD700"
                                                            : "#FFF",
                                                        strokeWidth:
                                                            isHighlighted
                                                                ? MAP_CONSTANTS.STROKE_WIDTH.HIGHLIGHTED
                                                                : MAP_CONSTANTS.STROKE_WIDTH.DEFAULT,
                                                        outline: "none",
                                                    },
                                                    hover: {
                                                        fill: fillColor,
                                                        stroke: isHighlighted
                                                            ? "#FFD700"
                                                            : "#FFF",
                                                        strokeWidth:
                                                            isHighlighted
                                                                ? 1.2
                                                                : 0.6,
                                                        outline: "none",
                                                        cursor: "pointer",
                                                    },
                                                    pressed: {
                                                        fill: fillColor,
                                                        stroke: isHighlighted
                                                            ? "#FFD700"
                                                            : "#FFF",
                                                        strokeWidth:
                                                            isHighlighted
                                                                ? MAP_CONSTANTS.STROKE_WIDTH.HIGHLIGHTED
                                                                : MAP_CONSTANTS.STROKE_WIDTH.DEFAULT,
                                                        outline: "none",
                                                    },
                                                }}
                                            />
                                        );
                                    })
                                }
                            </Geographies>
                        </ZoomableGroup>
                    </ComposableMap>
                </div>
                {/* Tooltip */}
                <MapTooltip content={tooltipContent} position={tooltipPosition} />
            </div>
        </div>
    );
};
