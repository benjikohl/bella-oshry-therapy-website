import { GoogleGenAI } from "@google/genai";

async function generateBellaImage(base64Image: string) {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        {
          inlineData: {
            data: base64Image,
            mimeType: 'image/png',
          },
        },
        {
          text: "Place this woman in a warm, professional therapy office setting. She should look candid and approachable, as if she's in the middle of a conversation. The lighting should be soft and natural, coming from a nearby window. The background should be a cozy office with books, a soft-textured chair, and a plant, but slightly blurred to keep the focus on her. The overall aesthetic should be professional yet warm and inviting, suitable for a therapist's website. Ensure her expression remains natural and the transition to the background is seamless. The background should feel like a real room, not a flat backdrop.",
        },
      ],
    },
  });

  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  return null;
}
