"use strict";
// src/lib/owid.ts
// No specific types needed from dashboard.ts for this function's return value
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchOwidIndicatorData = void 0;
// Placeholder for mapping OWID entity IDs to country codes/names if needed
// You might need a more robust mapping solution
var mapOwidEntityToCountryCode = function (entityId) {
    // Example mapping - replace with actual mapping logic or data source
    var mapping = {
        // Add mappings like: 1: 'USA', 2: 'GBR', etc.
        // This will depend on how OWID maps entities to countries/regions
        // For now, returning null as a placeholder
        // Example based on common OWID entity IDs (verify these)
        13: "USA", // United States
        14: "GBR", // United Kingdom
        15: "FRA", // France
        // ... add many more mappings
        355: "OWID_WRL", // World (often used by OWID)
    };
    // A simple lookup, might need refinement based on actual entity usage
    return mapping[entityId] || null;
};
var fetchOwidIndicatorData = function (indicatorId // OWID uses numeric IDs
) { return __awaiter(void 0, void 0, void 0, function () {
    var apiUrl, response, errorBody, apiData, historicalDataByCountry, minLength, i, year, value, entityId, countryCode, code, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                apiUrl = "https://api.ourworldindata.org/v1/indicators/".concat(indicatorId, ".data.json");
                console.log("Fetching OWID data from: ".concat(apiUrl)); // Log the URL being fetched
                return [4 /*yield*/, fetch(apiUrl)];
            case 1:
                response = _a.sent();
                if (!!response.ok) return [3 /*break*/, 3];
                return [4 /*yield*/, response.text()];
            case 2:
                errorBody = _a.sent();
                console.error("HTTP error! status: ".concat(response.status, ", body: ").concat(errorBody));
                throw new Error("HTTP error! status: ".concat(response.status));
            case 3: return [4 /*yield*/, response.json()];
            case 4:
                apiData = _a.sent();
                // Basic validation of the received data structure
                if (!apiData ||
                    !Array.isArray(apiData.years) ||
                    !Array.isArray(apiData.values) ||
                    !Array.isArray(apiData.entities)) {
                    console.error("Invalid data structure received from OWID API:", apiData);
                    throw new Error("Invalid data structure received from OWID API");
                }
                if (apiData.years.length !== apiData.values.length ||
                    apiData.years.length !== apiData.entities.length) {
                    console.warn("OWID API response arrays have mismatched lengths, data might be incomplete.");
                    // Decide how to handle this - proceed with minimum length or throw error?
                    // For now, proceed cautiously, logging the warning.
                }
                historicalDataByCountry = {};
                minLength = Math.min(apiData.years.length, apiData.values.length, apiData.entities.length);
                for (i = 0; i < minLength; i++) {
                    year = apiData.years[i];
                    value = apiData.values[i];
                    entityId = apiData.entities[i];
                    countryCode = mapOwidEntityToCountryCode(entityId);
                    // Only process data points with a valid value and a mapped country code
                    if (value !== null && value !== undefined && countryCode) {
                        if (!historicalDataByCountry[countryCode]) {
                            historicalDataByCountry[countryCode] = [];
                        }
                        // Add the data point to the correct country's historical array
                        historicalDataByCountry[countryCode].push({
                            year: year,
                            value: value,
                        });
                    }
                    else {
                        // Optional: Log skipped data points for debugging
                        // console.log(`Skipping data point: year=${year}, value=${value}, entityId=${entityId}, mappedCountryCode=${countryCode}`);
                    }
                }
                // Sort historical data by year for each country (optional but good practice)
                for (code in historicalDataByCountry) {
                    historicalDataByCountry[code].sort(function (a, b) { return a.year - b.year; });
                }
                // Note: This function now returns data grouped by country, suitable for updating
                // the 'historical' field of ProgressIndicator objects in the dashboard state.
                // Metadata (name, description, source, unit) needs to be handled separately,
                // potentially by fetching the .metadata.json endpoint or having it pre-defined.
                console.log("Fetched and grouped OWID data for indicator ".concat(indicatorId, ". Countries found: ").concat(Object.keys(historicalDataByCountry).length)); // For debugging
                return [2 /*return*/, historicalDataByCountry];
            case 5:
                error_1 = _a.sent();
                console.error("Error fetching or processing OWID data for indicator ".concat(indicatorId, ":"), error_1);
                // Return empty object or throw error based on how you want to handle failures
                return [2 /*return*/, {}];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.fetchOwidIndicatorData = fetchOwidIndicatorData;
// Example usage (for testing, might be called from useDashboard hook later)
// fetchOwidIndicatorData(1002268).then(data => console.log(data));
