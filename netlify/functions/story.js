// netlify/functions/story.js
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function handler(event) {
  try {
    const data = JSON.parse(event.body);
    const { childName, favoriteAnimal, favoriteColor, experienceType, location } = data;

    const prompt = `Write a magical 3000-word whimsical story for a child named ${childName} 
who loves ${favoriteAnimal}s and the color ${favoriteColor}. The story should be about their first 
${experienceType} in ${location}. Include magical elements, a helpful wizard, and a friendly fairy.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are a magical story-teller for children." },
        { role: "user", content: prompt }
      ],
      temperature: 0.8,
      max_tokens: 3000
    });

    const story = response.choices[0]?.message?.content || "Oops! No story was generated.";

    return {
      statusCode: 200,
      body: JSON.stringify({ story })
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
}
