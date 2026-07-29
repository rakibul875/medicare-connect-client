const { GoogleGenAI } = require("@google/genai");

async function run() {
    try {
        const ai = new GoogleGenAI({ apiKey: "AQ.Ab8RN6Jiq6dJFICqvyVdcUluonpGvLamDrnQemk-lM9trtNRsQ" });
        
        const systemInstruction = `You are a helpful assistant.`;
        
        const response = await ai.models.generateContent({
            model: "gemini-1.5-flash",
            contents: [
                { role: "user", parts: [{ text: "Hello, what is Medicare Connect?" }] }
            ],
            config: {
                systemInstruction: systemInstruction,
                temperature: 0.7,
            }
        });

        console.log("SUCCESS:", response.text);
    } catch (e) {
        console.error("FAILED:", e);
    }
}
run();
