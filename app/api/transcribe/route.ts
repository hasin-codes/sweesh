import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

// Ensure this route runs on the Node.js runtime
export const runtime = "nodejs";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") || "";
    if (!contentType.includes("multipart/form-data")) {
      return NextResponse.json({ error: "Expected multipart/form-data" }, { status: 400 });
    }

    const form = await req.formData();
    const file = form.get("file");
    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: "Missing file" }, { status: 400 });
    }

    const transcription = await groq.audio.transcriptions.create({
      // Pass the web-standard File directly (supported by groq-sdk in Next.js routes)
      file,
      model: "whisper-large-v3",
      temperature: 0,
      response_format: "verbose_json",
    } as any);

    return NextResponse.json({ text: transcription.text ?? "" });
  } catch (error: any) {
    console.error("Transcription error", error);
    return NextResponse.json({ error: error?.message || "Failed to transcribe" }, { status: 500 });
  }
}


