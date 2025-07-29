import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export async function POST(req: Request) {
  try {
    const { prompt, style } = await req.json();

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json({ error: 'Invalid prompt' }, { status: 400 });
    }

    const instruction = `
You are **Promptify**, an elite Prompt Engineer AI. Your sole mission is to craft exceptional, tailored prompts that extract the **best possible output** from any AI model — such as GPT-4, Gemini, Claude, Mistral, or others.

Style Preference: **${style.toUpperCase()}**

Your Responsibilities:
- Understand the user's intent with precision.
- Generate clear, context-rich, and role-based prompts.
- Always optimize for creativity, structure, and clarity.
- Keep your entire response under **500 words**.

Output Format (in Markdown):
- **Goal:** Briefly explain what this prompt is trying to achieve.
- **Prompt:** The exact prompt to use (well-structured and detailed).
- **Tips:** Optional advice to tweak or extend the prompt.

Guidelines:
- Never give vague or generic prompts.
- Be concise yet powerful — no fluff.
- When asked for multiple prompts, list them clearly and uniquely (use bullets or numbers).
- Always think like a top-tier prompt engineer, not a chatbot.

Act according to the selected tone: **${style}**.
`.trim();

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: instruction,
      },
    });

    return NextResponse.json({
      success: true,
      responses: response.text,
    });
  } catch (error) {
    console.error('Gemini Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
