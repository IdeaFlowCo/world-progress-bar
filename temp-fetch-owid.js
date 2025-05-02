// temp-fetch-owid.js - Rewritten for ES Modules
// NOTE: To run this script, use: npx tsx temp-fetch-owid.js
// DO NOT use 'bun' or plain 'node'.
import { fetchOwidIndicatorData } from "./src/lib/owid.js"; // Use .js extension for ESM imports

// --- Trying Democracy Index (EIU) ---
const indicatorId = 147586; // Democracy Index (EIU) - Attempt 1

console.log(
    `Attempting to fetch OWID indicator ID: ${indicatorId} (Democracy Index)`
);

fetchOwidIndicatorData(indicatorId)
    .then((data) => {
        // We are interested in the 'World' data, mapped to 'OWID_WRL' in the placeholder
        const worldData = data["OWID_WRL"];
        if (worldData && worldData.length > 0) {
            console.log(`Success! Found World data for ID ${indicatorId}:`);
            // Output only the first few and last few data points for brevity
            const previewData = [
                ...worldData.slice(0, 3),
                ...(worldData.length > 6
                    ? [{ year: "...", value: "..." }]
                    : []),
                ...worldData.slice(-3),
            ];
            console.log(JSON.stringify(previewData, null, 2));
        } else {
            console.error(
                `World (OWID_WRL) data not found or empty for ID ${indicatorId}.`
            );
            // Log available keys to help debug mapping if needed
            const availableKeys = Object.keys(data);
            console.log(
                `Available keys in response (${availableKeys.length}):`,
                availableKeys.slice(0, 10) // Show first 10 keys
            );
        }
    })
    .catch((error) => {
        console.error(
            `Failed to fetch OWID data for ID ${indicatorId}:`,
            error
        );
        process.exit(1); // Exit with error code
    });
