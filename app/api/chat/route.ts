import { OpenAI } from "openai";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const authData = auth(); // <-- Call auth() and store the result
    const userId = authData.userId; // <-- Get userId from the result
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { message } = await req.json();

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: message }],
      temperature: 0.7,
      max_tokens: 1000,
    });

    return NextResponse.json({
      message: response.choices[0].message.content,
    });
  } catch (error) {
    console.error("[CHAT_ERROR]", error?.response?.data || error.message || error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}