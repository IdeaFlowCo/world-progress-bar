// src/data/ghiData.ts

// Global Happiness Index (Ladder Score) for 2024
// Source: User provided data, assumed from World Happiness Report 2024
// URL: (Add URL if known, e.g., https://worldhappiness.report/)
// Last Updated: 2025-05-01 (Based on user request)

export const ghiData2024: { [code: string]: number } = {
    FIN: 7.736, // Finland
    DNK: 7.521, // Denmark
    ISL: 7.515, // Iceland
    SWE: 7.345, // Sweden
    NLD: 7.306, // Netherlands
    CRI: 7.274, // Costa Rica
    NOR: 7.262, // Norway
    ISR: 7.234, // Israel
    LUX: 7.122, // Luxembourg
    MEX: 6.979, // Mexico
    AUS: 6.974, // Australia
    NZL: 6.952, // New Zealand
    CHE: 6.935, // Switzerland
    BEL: 6.91, // Belgium
    IRL: 6.889, // Ireland
    LTU: 6.829, // Lithuania
    AUT: 6.81, // Austria
    CAN: 6.803, // Canada
    SVN: 6.792, // Slovenia
    CZE: 6.775, // Czechia
    ARE: 6.759, // United Arab Emirates
    DEU: 6.753, // Germany
    GBR: 6.728, // United Kingdom
    USA: 6.724, // United States of America (Mapped from "United States")
    BLZ: 6.711, // Belize
    POL: 6.673, // Poland
    TWN: 6.669, // Taiwan (Mapped from "Taiwan Province of China")
    URY: 6.661, // Uruguay
    // KSV: 6.659, // Kosovo - No standard ISO A3, map uses -99
    KWT: 6.629, // Kuwait
    SRB: 6.606, // Serbia
    SAU: 6.6, // Saudi Arabia
    FRA: 6.593, // France
    SGP: 6.565, // Singapore (Added mapping)
    ROU: 6.563, // Romania
    BRA: 6.494, // Brazil
    SLV: 6.492, // El Salvador
    ESP: 6.466, // Spain
    EST: 6.417, // Estonia
    ITA: 6.415, // Italy
    PAN: 6.407, // Panama
    ARG: 6.397, // Argentina
    KAZ: 6.378, // Kazakhstan
    GTM: 6.362, // Guatemala
    CHL: 6.361, // Chile
    VNM: 6.352, // Vietnam (Mapped from "Viet Nam")
    NIC: 6.33, // Nicaragua
    MLT: 6.316, // Malta (Added mapping)
    THA: 6.222, // Thailand
    SVK: 6.221, // Slovakia
    LVA: 6.207, // Latvia
    OMN: 6.197, // Oman
    UZB: 6.193, // Uzbekistan
    PRY: 6.172, // Paraguay
    JPN: 6.147, // Japan
    BIH: 6.136, // Bosnia and Herzegovina (Mapped from "Bosnia and Herzegovina")
    PHL: 6.107, // Philippines
    KOR: 6.038, // South Korea (Mapped from "Republic of Korea")
    BHR: 6.03, // Bahrain (Added mapping)
    PRT: 6.013, // Portugal
    COL: 6.004, // Colombia
    ECU: 5.965, // Ecuador
    HND: 5.964, // Honduras
    MYS: 5.955, // Malaysia
    PER: 5.947, // Peru
    RUS: 5.945, // Russia (Mapped from "Russian Federation")
    CYP: 5.942, // Cyprus
    CHN: 5.921, // China
    HUN: 5.915, // Hungary
    TTO: 5.905, // Trinidad and Tobago
    MNE: 5.877, // Montenegro
    HRV: 5.87, // Croatia
    JAM: 5.87, // Jamaica
    BOL: 5.868, // Bolivia
    KGZ: 5.858, // Kyrgyzstan
    DOM: 5.846, // Dominican Republic (Mapped from "Dominican Republic")
    MNG: 5.833, // Mongolia
    MUS: 5.832, // Mauritius (Added mapping)
    LBY: 5.82, // Libya
    MDA: 5.819, // Moldova (Mapped from "Republic of Moldova")
    GRC: 5.776, // Greece
    VEN: 5.683, // Venezuela
    IDN: 5.617, // Indonesia
    DZA: 5.571, // Algeria
    BGR: 5.554, // Bulgaria
    MKD: 5.503, // North Macedonia (Mapped from "North Macedonia")
    ARM: 5.494, // Armenia
    // HKG: 5.491, // Hong Kong SAR of China - Not in map GeoJSON
    ALB: 5.411, // Albania
    TJK: 5.411, // Tajikistan
    GEO: 5.4, // Georgia
    NPL: 5.311, // Nepal
    LAO: 5.301, // Laos (Mapped from "Lao PDR")
    TUR: 5.262, // Turkey (Mapped from "Türkiye")
    ZAF: 5.213, // South Africa
    MOZ: 5.19, // Mozambique
    GAB: 5.12, // Gabon
    CIV: 5.102, // Côte d'Ivoire (Mapped from "Côte d’Ivoire")
    IRN: 5.093, // Iran
    COG: 5.03, // Congo
    IRQ: 4.976, // Iraq
    GIN: 4.929, // Guinea
    NAM: 4.911, // Namibia
    CMR: 4.887, // Cameroon
    NGA: 4.885, // Nigeria
    AZE: 4.875, // Azerbaijan
    SEN: 4.856, // Senegal
    PSE: 4.78, // Palestine (Mapped from "State of Palestine")
    PAK: 4.768, // Pakistan
    NER: 4.725, // Niger
    UKR: 4.68, // Ukraine
    MAR: 4.622, // Morocco
    TUN: 4.552, // Tunisia
    MRT: 4.542, // Mauritania
    KEN: 4.51, // Kenya
    UGA: 4.461, // Uganda
    GMB: 4.423, // Gambia
    IND: 4.389, // India
    TCD: 4.384, // Chad
    BFA: 4.383, // Burkina Faso
    BEN: 4.357, // Benin
    SOM: 4.347, // Somalia
    MLI: 4.345, // Mali
    KHM: 4.341, // Cambodia
    GHA: 4.34, // Ghana
    MMR: 4.321, // Myanmar
    TGO: 4.315, // Togo
    JOR: 4.31, // Jordan
    LBR: 4.277, // Liberia
    MDG: 4.157, // Madagascar
    ZMB: 3.912, // Zambia
    ETH: 3.898, // Ethiopia
    LKA: 3.891, // Sri Lanka
    BGD: 3.851, // Bangladesh
    EGY: 3.817, // Egypt
    TZA: 3.8, // Tanzania
    SWZ: 3.774, // Eswatini (Mapped from "Eswatini")
    LSO: 3.757, // Lesotho
    COM: 3.754, // Comoros (Added mapping)
    YEM: 3.561, // Yemen
    COD: 3.469, // Dem. Rep. Congo (Mapped from "DR Congo")
    BWA: 3.438, // Botswana
    ZWE: 3.396, // Zimbabwe
    MWI: 3.26, // Malawi
    LBN: 3.188, // Lebanon
    SLE: 2.998, // Sierra Leone
    AFG: 1.364, // Afghanistan
};
