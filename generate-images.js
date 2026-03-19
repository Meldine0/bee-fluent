import { GoogleGenAI } from "@google/genai";
import fs from "fs";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function generateImage(prompt, filename) {
  console.log(`Generating image for: ${prompt}`);
  const response = await ai.models.generateContent({
    model: 'gemini-3.1-flash-image-preview',
    contents: {
      parts: [
        { text: prompt },
      ],
    },
    config: {
      imageConfig: {
        aspectRatio: "16:9",
        imageSize: "1K"
      }
    }
  });

  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) {
      const base64EncodeString = part.inlineData.data;
      const buffer = Buffer.from(base64EncodeString, 'base64');
      fs.writeFileSync(`public/${filename}`, buffer);
      console.log(`Saved public/${filename}`);
    }
  }
}

async function main() {
  await generateImage("A modern, professional, bright, high-quality photo of a friendly English teacher conducting a video conference coaching session on a laptop. The teacher is smiling, wearing a headset, in a well-lit stylish home office. Screen shows a student. Corporate, educational, premium vibe.", "coaching-online.png");
  await generateImage("A modern, professional, bright, high-quality photo of an in-person English coaching session. A friendly teacher and a professional student sitting at a stylish cafe or modern office table, discussing notes. Natural light, premium, educational vibe.", "coaching-inperson.png");
}

main().catch(console.error);
