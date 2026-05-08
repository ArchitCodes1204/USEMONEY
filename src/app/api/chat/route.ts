import Groq from "groq-sdk";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { history, message } = await req.json();

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Groq API key is not configured. Add GROQ_API_KEY to .env.local" }, { status: 500 });
    }

    const groq = new Groq({ apiKey });

    // Format history for Groq API.
    // Groq expects 'user', 'assistant', or 'system' roles.
    const formattedHistory = history.map((msg: any) => ({
      role: msg.sender === "user" ? "user" : "assistant",
      content: msg.text
    }));

    // Filter out initial assistant greetings if there are no preceding user messages
    let validHistory = [...formattedHistory];
    while (validHistory.length > 0 && validHistory[0].role === "assistant") {
      validHistory.shift();
    }

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: "You are a helpful UseMoney AI assistant." },
        ...validHistory,
        { role: "user", content: message }
      ],
      model: "llama-3.3-70b-versatile",
    });

    const text = chatCompletion.choices[0]?.message?.content || "";

    return NextResponse.json({ response: text });
  } catch (error: any) {
    console.error("Groq API Error:", error);
    return NextResponse.json({ error: error.message || "Failed to generate response" }, { status: 500 });
  }
}
