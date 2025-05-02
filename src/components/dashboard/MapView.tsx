// src/components/dashboard/MapView.tsx
import { useState, useEffect } from "react"; // Added Fragment
import {
    ComposableMap,
    Geographies,
    Geography,
    ZoomableGroup,
} from "react-simple-maps";
import { scaleLinear } from "d3-scale";
import { hdiData2022 } from "@/data/hdiData";
// Removed HoverCard/Tooltip imports

// Basic interface for the expected GeoJSON structure
interface Geometry {
    type: string;
    arcs: number[][][] | number[];
}

// Updated Properties interface based on console logs
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
    geometries?: Geometry[]; // For GeometryCollection
    arcs?: number[][][] | number[]; // For Polygon, MultiPolygon etc.
    id?: string | number;
}

interface GeoJsonData {
    type: "Topology";
    objects: {
        [key: string]: TopologyObject; // e.g., countries, land
    };
    arcs: number[][][];
}

// GeoJSON URL for world map data
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// Mapping from GeoJSON country names to ISO A3 codes (Partial map based on logs & HDI data)
// Needs to be expanded for full coverage if necessary
const countryNameToCodeMap: { [name: string]: string } = {
    Tanzania: "TZA",
    "W. Sahara": "ESH", // Note: ESH might not be in hdiData2022
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
    "Falkland Is.": "FLK", // Note: FLK might not be in hdiData2022
    Norway: "NOR",
    Greenland: "GRL", // Note: GRL might not be in hdiData2022
    "Fr. S. Antarctic Lands": "ATF", // Note: ATF might not be in hdiData2022
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
    "Puerto Rico": "PRI", // Note: PRI might not be in hdiData2022
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
    eSwatini: "SWZ", // Map uses eSwatini, data uses Eswatini (SWZ)
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
    "North Korea": "PRK", // Note: PRK might not be in hdiData2022
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
    "New Caledonia": "NCL", // Note: NCL might not be in hdiData2022
    "Solomon Is.": "SLB",
    "New Zealand": "NZL",
    Australia: "AUS",
    "Sri Lanka": "LKA",
    China: "CHN",
    Taiwan: "TWN", // Note: TWN might not be in hdiData2022
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
    // "Antarctica": "ATA", // No data
    "N. Cyprus": "-99", // Special code for N. Cyprus if needed
    Cyprus: "CYP",
    Morocco: "MAR",
    Egypt: "EGY",
    Libya: "LBY",
    Ethiopia: "ETH",
    Djibouti: "DJI",
    Somaliland: "-99", // Special code for Somaliland if needed
    Uganda: "UGA",
    Rwanda: "RWA",
    "Bosnia and Herz.": "BIH",
    Macedonia: "MKD", // Map uses Macedonia, data uses North Macedonia (MKD)
    Serbia: "SRB",
    Montenegro: "MNE",
    Kosovo: "-99", // Special code for Kosovo if needed
    "Trinidad and Tobago": "TTO",
    "S. Sudan": "SSD",
};

// Updated cool color scale for HDI values
const coolColorScale = scaleLinear<string>()
    .domain([0.3, 0.6, 0.8, 0.95]) // Domain based on HDI range
    .range(["#eff3ff", "#bdd7e7", "#6baed6", "#2171b5"]); // Cool color range (light blue to dark blue)

// Legend items based on the scale
const legendItems = [
    { color: coolColorScale(0.3), label: "< 0.6" },
    { color: coolColorScale(0.6), label: "0.6 - 0.8" },
    { color: coolColorScale(0.8), label: "0.8 - 0.95" },
    { color: coolColorScale(0.95), label: "> 0.95" },
    { color: "#666", label: "No data" },
];

export const MapView = () => {
    // Re-added tooltipContent state
    const [tooltipContent, setTooltipContent] = useState("");
    const [geoData, setGeoData] = useState<GeoJsonData | null>(null);

    useEffect(() => {
        // Fetch the GeoJSON data
        fetch(geoUrl)
            .then((res) => res.json())
            .then((data) => setGeoData(data))
            .catch((err) => console.error("Error fetching GeoJSON:", err));
    }, []);

    if (!geoData) {
        return <div>Loading map data...</div>; // Or a loading spinner
    }

    return (
        // Removed TooltipProvider/HoverCard wrappers
        <div className="w-full h-full border border-slate-700 rounded-lg overflow-hidden flex flex-col relative">
            {/* Title and Description Area */}
            <div className="p-4 border-b border-slate-700 bg-slate-900/50">
                <h3 className="text-lg font-semibold text-slate-100">
                    Global Index Map
                </h3>
                <p className="text-sm text-slate-400 mt-1">
                    Currently displaying: Human Development Index (HDI) 2022
                    {/* Hint for future indices */}
                    {/* <span className="ml-2 text-xs">(More indices coming soon)</span> */}
                </p>
            </div>
            {/* Map container takes remaining space */}
            <div className="flex-grow relative">
                {" "}
                {/* Ensure map container is relative for absolute tooltip */}
                <ComposableMap
                    projectionConfig={{
                        rotate: [-10, 0, 0],
                    }}
                    style={{ width: "100%", height: "100%" }}
                >
                    {/* Increased initial zoom level */}
                    <ZoomableGroup center={[0, 20]} zoom={1.5}>
                        <Geographies geography={geoData}>
                            {({ geographies }) =>
                                geographies.map((geo) => {
                                    const countryName = geo.properties.name;
                                    const countryCode =
                                        countryNameToCodeMap[countryName];
                                    const hdiValue = countryCode
                                        ? hdiData2022[countryCode]
                                        : undefined;

                                    const fillColor = hdiValue
                                        ? coolColorScale(hdiValue) // Use cool color scale
                                        : "#666";

                                    const currentTooltipText = `${
                                        countryName || "Unknown"
                                    }: ${
                                        hdiValue
                                            ? hdiValue.toFixed(3)
                                            : "No data"
                                    }`;

                                    return (
                                        // Use Geography's events
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
                                                    fill: fillColor, // Keep fill color on hover
                                                    outline: "none",
                                                    stroke: "#FFF", // Make border slightly thicker/brighter on hover
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
            {/* Legend */}
            <div className="bg-slate-800/50 backdrop-blur-sm p-2 text-xs text-slate-300 flex items-center justify-center space-x-4">
                <span>HDI:</span>
                {legendItems.map((item) => (
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
            {/* Conditionally render styled tooltip div (positioned relative to map container) */}
            {tooltipContent && (
                <div className="absolute bottom-4 left-4 z-50 overflow-hidden rounded-md border border-slate-600 bg-slate-800/80 backdrop-blur-sm px-3 py-1.5 text-sm text-slate-100 shadow-md animate-in fade-in-0 zoom-in-95">
                    {tooltipContent}
                </div>
            )}
        </div>
    );
};
