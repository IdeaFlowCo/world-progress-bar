// src/lib/owid.ts
// No specific types needed from dashboard.ts for this function's return value

interface OwidApiResponse {
    values: (number | null)[];
    years: number[];
    entities: number[]; // Assuming entity IDs are numbers, adjust if needed
    // Add other potential fields from the API response if necessary
}

// Placeholder for mapping OWID entity IDs to country codes/names if needed
// You might need a more robust mapping solution
const mapOwidEntityToCountryCode = (entityId: number): string | null => {
    // Example mapping - replace with actual mapping logic or data source
    const mapping: { [key: number]: string } = {
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

export const fetchOwidIndicatorData = async (
    indicatorId: string | number // OWID uses numeric IDs
): Promise<Record<string, { year: number; value: number }[]>> => {
    // Returns a map where keys are country codes and values are historical data arrays
    try {
        const apiUrl = `https://api.ourworldindata.org/v1/indicators/${indicatorId}.data.json`;
        console.log(`Fetching OWID data from: ${apiUrl}`); // Log the URL being fetched
        const response = await fetch(apiUrl);

        if (!response.ok) {
            // Log detailed error information
            const errorBody = await response.text();
            console.error(
                `HTTP error! status: ${response.status}, body: ${errorBody}`
            );
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const apiData: OwidApiResponse = await response.json();

        // Basic validation of the received data structure
        if (
            !apiData ||
            !Array.isArray(apiData.years) ||
            !Array.isArray(apiData.values) ||
            !Array.isArray(apiData.entities)
        ) {
            console.error(
                "Invalid data structure received from OWID API:",
                apiData
            );
            throw new Error("Invalid data structure received from OWID API");
        }
        if (
            apiData.years.length !== apiData.values.length ||
            apiData.years.length !== apiData.entities.length
        ) {
            console.warn(
                "OWID API response arrays have mismatched lengths, data might be incomplete."
            );
            // Decide how to handle this - proceed with minimum length or throw error?
            // For now, proceed cautiously, logging the warning.
        }

        // Transform the OWID API response into a map grouped by country code
        const historicalDataByCountry: Record<
            string,
            { year: number; value: number }[]
        > = {};
        const minLength = Math.min(
            apiData.years.length,
            apiData.values.length,
            apiData.entities.length
        );

        for (let i = 0; i < minLength; i++) {
            const year = apiData.years[i];
            const value = apiData.values[i];
            const entityId = apiData.entities[i];

            // Map entity ID to country code if possible, otherwise skip this data point
            // TODO: Implement a robust mapping from OWID entity IDs to your application's country codes
            const countryCode = mapOwidEntityToCountryCode(entityId); // Placeholder mapping

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
            } else {
                // Optional: Log skipped data points for debugging
                // console.log(`Skipping data point: year=${year}, value=${value}, entityId=${entityId}, mappedCountryCode=${countryCode}`);
            }
        }

        // Sort historical data by year for each country (optional but good practice)
        for (const code in historicalDataByCountry) {
            historicalDataByCountry[code].sort((a, b) => a.year - b.year);
        }

        // Note: This function now returns data grouped by country, suitable for updating
        // the 'historical' field of ProgressIndicator objects in the dashboard state.
        // Metadata (name, description, source, unit) needs to be handled separately,
        // potentially by fetching the .metadata.json endpoint or having it pre-defined.

        console.log(
            `Fetched and grouped OWID data for indicator ${indicatorId}. Countries found: ${
                Object.keys(historicalDataByCountry).length
            }`
        ); // For debugging
        return historicalDataByCountry;
    } catch (error) {
        console.error(
            `Error fetching or processing OWID data for indicator ${indicatorId}:`,
            error
        );
        // Return empty object or throw error based on how you want to handle failures
        return {};
    }
};

// Example usage (for testing, might be called from useDashboard hook later)
// fetchOwidIndicatorData(1002268).then(data => console.log(data));
