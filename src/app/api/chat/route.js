import { NextResponse } from "next/server";

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

    const apiKey = process.env.GROCK_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ success: false, error: "GrockCloud API key is not configured in .env" }, { status: 500 });
    }

    const systemInstruction = `You are a helpful, professional, and empathetic AI Health Assistant for a MERN Hospital Management System called "MediCare Connect". 
Your primary job is to assist patients by answering general health questions, providing triage information based on symptoms (with the standard disclaimer that you are not a doctor), and guiding them on how to use the hospital system.
If they ask about booking an appointment, finding a doctor, or anything specific to the hospital, advise them that you are ready to help them navigate the platform.
Always be polite and keep your answers concise but informative`;

    let formattedHistory = [];
    if (history && Array.isArray(history)) {
      formattedHistory = history.map(msg => ({
        role: msg.role === 'ai' || msg.role === 'assistant' ? 'assistant' : 'user',
        content: msg.content
      }));
    }

 
    const messages = [
      { role: "system", content: systemInstruction },
      ...formattedHistory,
      { role: "user", content: message }
    ];


    const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: messages,
        temperature: 0.7
      })
    });

    if (!groqResponse.ok) {
      const errorData = await groqResponse.text();
      console.error("Groq API Error Response:", errorData);
      return NextResponse.json({ success: false, error: "Failed to generate response from GrockCloud API" }, { status: 500 });
    }

    const data = await groqResponse.json();
    const replyText = data.choices?.[0]?.message?.content || "Sorry, I couldn't generate a response.";

    return NextResponse.json({
      success: true,
      data: {
        reply: replyText
      }
    }, { status: 200 });

  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json({ success: false, error: "Internal server error while processing chat" }, { status: 500 });
  }
}
