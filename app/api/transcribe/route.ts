import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

// Ensure this route runs on the Node.js runtime
export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const file = form.get("file");
    const apiKey = form.get("apiKey") as string;
    
    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: "Missing file" }, { status: 400 });
    }
    
    if (!apiKey) {
      return NextResponse.json({ error: "API key required" }, { status: 400 });
    }

    // Check if file is empty
    if (file.size === 0) {
      return NextResponse.json({ error: "File is empty" }, { status: 400 });
    }

    const groq = new Groq({ apiKey });

    const transcription = await groq.audio.transcriptions.create({
      file: file,
      model: "whisper-large-v3",
      temperature: 0,
      response_format: "verbose_json",
    });

    return NextResponse.json({ text: transcription.text ?? "" });
  } catch (error) {
    console.error("Transcription API error:", error);
    
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}


