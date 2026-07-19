const { GoogleGenAI } = require("@google/genai");

async function run() {
    try {
        const ai = new GoogleGenAI({ apiKey: "AQ.Ab8RN6Jiq6dJFICqvyVdcUluonpGvLamDrnQemk-lM9trtNRsQ" });
        const response = await ai.models.generateContent({
            model: "gemini-3.5-flash",
            contents: "Hello",
        });
        console.log("SUCCESS GENAI:", response.text);
    } catch (e) {
        console.error("FAILED GENAI:", e);
    }
}
run();
