// src/components/dashboard/MapView.tsx
import { useState, useEffect } from "react";
import {
    ComposableMap,
    Geographies,
    Geography,
    ZoomableGroup,
} from "react-simple-maps";
import { scaleLinear } from "d3-scale";
import { hdiData2022 } from "@/data/hdiData";
import { ghiData2024 } from "@/data/ghiData";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

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
const countryNameToCodeMap: { [name: string]: string } = {
    Tanzania: "TZA",
    "W. Sahara": "ESH",
    Canada: "CAN",
    "United States of America": "USA",
    Kazakhstan: "KAZ",
    Uzbekistan: "UZB",
    "Papua New Guinea": "PNG",
    Indonesia: "IDN",
    Argentina: "ARG",
    Chile: "CHL",
    "Dem. Rep. Congo": "COD",
    Somalia: "SOM",
    Kenya: "KEN",
    Sudan: "SDN",
    Chad: "TCD",
    Haiti: "HTI",
    "Dominican Rep.": "DOM",
    Russia: "RUS",
    Bahamas: "BHS",
    "Falkland Is.": "FLK",
    Norway: "NOR",
    Greenland: "GRL",
    "Fr. S. Antarctic Lands": "ATF",
    "Timor-Leste": "TLS",
    "South Africa": "ZAF",
    Lesotho: "LSO",
    Mexico: "MEX",
    Uruguay: "URY",
    Brazil: "BRA",
    Bolivia: "BOL",
    Peru: "PER",
    Colombia: "COL",
    Panama: "PAN",
    "Costa Rica": "CRI",
    Nicaragua: "NIC",
    Honduras: "HND",
    "El Salvador": "SLV",
    Guatemala: "GTM",
    Belize: "BLZ",
    Venezuela: "VEN",
    Guyana: "GUY",
    Suriname: "SUR",
    France: "FRA",
    Ecuador: "ECU",
    "Puerto Rico": "PRI",
    Jamaica: "JAM",
    Cuba: "CUB",
    Zimbabwe: "ZWE",
    Botswana: "BWA",
    Namibia: "NAM",
    Senegal: "SEN",
    Mali: "MLI",
    Mauritania: "MRT",
    Benin: "BEN",
    Niger: "NER",
    Nigeria: "NGA",
    Cameroon: "CMR",
    Togo: "TGO",
    Ghana: "GHA",
    "Côte d'Ivoire": "CIV",
    Guinea: "GIN",
    "Guinea-Bissau": "GNB",
    Liberia: "LBR",
    "Sierra Leone": "SLE",
    "Burkina Faso": "BFA",
    "Central African Rep.": "CAF",
    Congo: "COG",
    Gabon: "GAB",
    "Eq. Guinea": "GNQ",
    Zambia: "ZMB",
    Malawi: "MWI",
    Mozambique: "MOZ",
    eSwatini: "SWZ",
    Angola: "AGO",
    Burundi: "BDI",
    Israel: "ISR",
    Lebanon: "LBN",
    Madagascar: "MDG",
    Palestine: "PSE",
    Gambia: "GMB",
    Tunisia: "TUN",
    Algeria: "DZA",
    Jordan: "JOR",
    "United Arab Emirates": "ARE",
    Qatar: "QAT",
    Kuwait: "KWT",
    Iraq: "IRQ",
    Oman: "OMN",
    Vanuatu: "VUT",
    Cambodia: "KHM",
    Thailand: "THA",
    Laos: "LAO",
    Myanmar: "MMR",
    Vietnam: "VNM",
    "North Korea": "PRK",
    "South Korea": "KOR",
    Mongolia: "MNG",
    India: "IND",
    Bangladesh: "BGD",
    Bhutan: "BTN",
    Nepal: "NPL",
    Pakistan: "PAK",
    Afghanistan: "AFG",
    Tajikistan: "TJK",
    Kyrgyzstan: "KGZ",
    Turkmenistan: "TKM",
    Iran: "IRN",
    Syria: "SYR",
    Armenia: "ARM",
    Sweden: "SWE",
    Belarus: "BLR",
    Ukraine: "UKR",
    Poland: "POL",
    Austria: "AUT",
    Hungary: "HUN",
    Moldova: "MDA",
    Romania: "ROU",
    Lithuania: "LTU",
    Latvia: "LVA",
    Estonia: "EST",
    Germany: "DEU",
    Bulgaria: "BGR",
    Greece: "GRC",
    Turkey: "TUR",
    Albania: "ALB",
    Croatia: "HRV",
    Switzerland: "CHE",
    Luxembourg: "LUX",
    Belgium: "BEL",
    Netherlands: "NLD",
    Portugal: "PRT",
    Spain: "ESP",
    Ireland: "IRL",
    "New Caledonia": "NCL",
    "Solomon Is.": "SLB",
    "New Zealand": "NZL",
    Australia: "AUS",
    "Sri Lanka": "LKA",
    China: "CHN",
    Taiwan: "TWN",
    Italy: "ITA",
    Denmark: "DNK",
    "United Kingdom": "GBR",
    Iceland: "ISL",
    Azerbaijan: "AZE",
    Georgia: "GEO",
    Philippines: "PHL",
    Malaysia: "MYS",
    Brunei: "BRN",
    Slovenia: "SVN",
    Finland: "FIN",
    Slovakia: "SVK",
    Czechia: "CZE",
    Eritrea: "ERI",
    Japan: "JPN",
    Paraguay: "PRY",
    Yemen: "YEM",
    "Saudi Arabia": "SAU",
    "N. Cyprus": "-99",
    Cyprus: "CYP",
    Morocco: "MAR",
    Egypt: "EGY",
    Libya: "LBY",
    Ethiopia: "ETH",
    Djibouti: "DJI",
    Somaliland: "-99",
    Uganda: "UGA",
    Rwanda: "RWA",
    "Bosnia and Herz.": "BIH",
    Macedonia: "MKD",
    Serbia: "SRB",
    Montenegro: "MNE",
    Kosovo: "-99",
    "Trinidad and Tobago": "TTO",
    "S. Sudan": "SSD",
};

// --- HDI Configuration ---
const hdiColorScale = scaleLinear<string>()
    .domain([0.3, 0.6, 0.8, 0.95])
    .range(["#eff3ff", "#bdd7e7", "#6baed6", "#2171b5"]);
const hdiLegendItems = [
    { color: hdiColorScale(0.3), label: "< 0.6" },
    { color: hdiColorScale(0.6), label: "0.6 - 0.8" },
    { color: hdiColorScale(0.8), label: "0.8 - 0.95" },
    { color: hdiColorScale(0.95), label: "> 0.95" },
    { color: "#666", label: "No data" },
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
    { color: "#666", label: "No data" },
];

// --- Map Data Configuration ---
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

    const currentMapData = mapIndexData[selectedIndex];

    useEffect(() => {
        fetch(geoUrl)
            .then((res) => res.json())
            .then(setGeoData)
            .catch((err) => console.error("Error fetching GeoJSON:", err));
    }, []);

    if (!geoData) {
        return <div>Loading map data...</div>;
    }

    return (
        // Main container: flex column, relative for tooltip positioning
        <div className="w-full h-[70vh] border border-slate-700 rounded-lg overflow-hidden flex flex-col relative">
            {/* Header: Title and Selector - Prevent shrinking */}
            <div className="p-4 border-b border-slate-700 bg-slate-900/50 flex justify-between items-center flex-shrink-0">
                <div>
                    <h3 className="text-lg font-semibold text-slate-100">
                        Global Index Map
                    </h3>
                    <p className="text-sm text-slate-400 mt-1">
                        Currently displaying: {currentMapData.title}
                    </p>
                </div>
                <RadioGroup
                    defaultValue={selectedIndex}
                    onValueChange={(value) =>
                        setSelectedIndex(value as SelectedIndex)
                    }
                    className="flex space-x-4"
                >
                    {Object.keys(mapIndexData).map((key) => (
                        <div key={key} className="flex items-center space-x-2">
                            <RadioGroupItem
                                value={key}
                                id={`map-radio-${key}`}
                            />
                            <Label
                                htmlFor={`map-radio-${key}`}
                                className="text-sm text-slate-300 cursor-pointer"
                            >
                                {mapIndexData[key as SelectedIndex].label}
                            </Label>
                        </div>
                    ))}
                </RadioGroup>
            </div>

            {/* Legend: Moved below header, prevent shrinking */}
            <div className="bg-slate-800/50 backdrop-blur-sm p-2 text-xs text-slate-300 flex items-center justify-center space-x-4 flex-shrink-0">
                <span>{currentMapData.label}:</span>
                {currentMapData.legend.map((item) => (
                    <div
                        key={item.label}
                        className="flex items-center space-x-1"
                    >
                        <span
                            className="inline-block w-3 h-3 rounded-sm border border-slate-500"
                            style={{ backgroundColor: item.color }}
                        ></span>
                        <span>{item.label}</span>
                    </div>
                ))}
            </div>

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

                                        return (
                                            <Geography
                                                key={geo.rsmKey}
                                                geography={geo}
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
                                                        outline: "none",
                                                        stroke: "#FFF",
                                                        strokeWidth: 0.2,
                                                    },
                                                    hover: {
                                                        fill: fillColor,
                                                        outline: "none",
                                                        stroke: "#FFF",
                                                        strokeWidth: 0.6,
                                                        cursor: "pointer",
                                                    },
                                                    pressed: {
                                                        fill: fillColor,
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
                {/* Tooltip: Follow mouse cursor */}
                {tooltipContent && (
                    <div
                        className="z-50 overflow-hidden rounded-md border border-slate-600 bg-slate-800/80 backdrop-blur-sm px-3 py-1.5 text-sm text-slate-100 shadow-md animate-in fade-in-0 zoom-in-95"
                        style={{
                            position: "fixed",
                            top: tooltipPosition.y + 10,
                            left: tooltipPosition.x + 10,
                            pointerEvents: "none",
                        }}
                    >
                        {tooltipContent}
                    </div>
                )}
            </div>
        </div>
    );
};
