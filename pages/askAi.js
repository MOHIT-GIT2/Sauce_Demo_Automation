// // askAI.js
// require("dotenv").config({ path: "../.env" });
// async function askAI(prompt) {
//   //console.log(2 + 3);
//   //console.log("API KEY:", process.env.GEMINI_API_KEY);
//   const response = await fetch(
//     `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
//     {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         contents: [{ parts: [{ text: prompt }] }],
//       }),
//     },
//   );
//   const data = await response.json();
//   //console.log("FULL RESPONSE:", JSON.stringify(data, null, 2));
//   return data.candidates[0].content.parts[0].text;
// }

// askAI("when was india freed").then(console.log);
