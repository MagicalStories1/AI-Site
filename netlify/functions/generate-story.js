// netlify/functions/generate-story.js

import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function handler(event) {
  try {
    const body = JSON.parse(event.body);

    const { childName, age, setting, favoriteAnimal, magicElement, eventType } = body;

    if (!childName || !age || !setting || !favoriteAnimal || !magicElement || !eventType) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing one or more required fields." }),
      };
    }

    const prompt = `Create a whimsical, 2000-word children's story for a ${age}-year-old named ${childName} set in a magical place called ${setting}. Include a favorite animal (${favoriteAnimal}), a magical element (${magicElement}), and make it revolve around the life moment: ${eventType}. The tone should be elegant, magical, funny, and age-appropriate.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.8,
    });

    const story = completion.choices[0]?.message?.content || "No story was generated.";

    return {
      statusCode: 200,
      body: JSON.stringify({ story }),
    };
  } catch (err) {
    console.error("Function error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to generate story." }),
    };
  }
}
