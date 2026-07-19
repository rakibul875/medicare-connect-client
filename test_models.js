async function run() {
    try {
        const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models?key=AQ.Ab8RN6Jiq6dJFICqvyVdcUluonpGvLamDrnQemk-lM9trtNRsQ");
        const data = await response.json();
        const models = data.models.filter(m => m.supportedGenerationMethods && m.supportedGenerationMethods.includes("generateContent"));
        console.log("SUPPORTED MODELS:");
        models.forEach(m => console.log(m.name));
    } catch (e) {
        console.error("FAILED:", e);
    }
}
run();
