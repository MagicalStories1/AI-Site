import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function handler(event) {
  try {
    const body = JSON.parse(event.body);

    if (!body.prompt) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing 'prompt' in request body" }),
      };
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You write whimsical, funny, elegant children's stories up to 2000 words.",
        },
        { role: "user", content: `Write a story about: ${body.prompt}` },
      ],
      max_tokens: 2000,
    });

    const story = response.choices[0].message.content;

    return {
      statusCode: 200,
      body: JSON.stringify({ story }),
    };
  } catch (error) {
    console.error("Error in generate-story function:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}
