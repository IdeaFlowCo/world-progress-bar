// "use strict";
// Object.defineProperty(exports, "__esModule", { value: true });
// // temp-fetch-owid.ts
// var owid_1 = require("./src/lib/owid");
// var indicatorId = 1002268; // Life Expectancy
// (0, owid_1.fetchOwidIndicatorData)(indicatorId)
//     .then(function (data) {
//     // We are interested in the 'World' data, mapped to 'OWID_WRL' in the placeholder
//     var worldData = data["OWID_WRL"];
//     if (worldData) {
//         // Output only the historical data array for 'World'
//         console.log(JSON.stringify(worldData, null, 2));
//     }
//     else {
//         console.error("World (OWID_WRL) data not found in the response.");
//         // Log available keys to help debug mapping if needed
//         console.log("Available country codes in response:", Object.keys(data));
//     }
// })
//     .catch(function (error) {
//     console.error("Failed to fetch OWID data:", error);
//     process.exit(1); // Exit with error code
// });
