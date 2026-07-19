import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export async function POST(req) {
  try {
    let body = {};
    try {
        body = await req.json();
    } catch (e) {
        return NextResponse.json({ success: false, error: "Invalid request body" }, { status: 400 });
    }
    const { message, history } = body;

    if (!message) {
      return NextResponse.json({ success: false, error: "Message is required" }, { status: 400 });
    }

    // Initialize Gemini API
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    
    const systemInstruction = `You are a helpful, professional, and empathetic AI Health Assistant for a MERN Hospital Management System called "MediCare Connect". 
Your primary job is to assist patients by answering general health questions, providing triage information based on symptoms (with the standard disclaimer that you are not a doctor), and guiding them on how to use the hospital system.
If they ask about booking an appointment, finding a doctor, or anything specific to the hospital, advise them that you are ready to help them navigate the platform.
Always be polite and keep your answers concise but informative.`;

    // Format history for Gemini API
    // Gemini requires the conversation history to ALWAYS start with a 'user' message.
    let validHistory = history || [];
    const firstUserIndex = validHistory.findIndex(msg => msg.role === 'user');
    
    if (firstUserIndex !== -1) {
        validHistory = validHistory.slice(firstUserIndex);
    } else {
        validHistory = [];
    }

    let formattedHistory = validHistory.map(msg => ({
        role: msg.role === 'ai' ? 'model' : 'user',
        parts: [{ text: msg.content }]
    }));

    const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: [
            ...formattedHistory,
            { role: "user", parts: [{ text: message }] }
        ],
        config: {
            systemInstruction: systemInstruction,
            temperature: 0.7,
        }
    });

    return NextResponse.json({
      success: true,
      data: {
        reply: response.text
      }
    }, { status: 200 });

  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json({ success: false, error: "Internal server error while processing chat" }, { status: 500 });
  }
}
