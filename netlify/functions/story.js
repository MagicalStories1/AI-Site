const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

exports.handler = async function (event, context) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Method Not Allowed",
    };
  }

  try {
    const { childName, favouriteAnimal, favouriteColour, magicalObject, firstExperience } = JSON.parse(event.body);

    const prompt = `Create a whimsical, magical story for a child named ${childName}. Include their favourite animal, which is a ${favouriteAnimal}, their favourite colour ${favouriteColour}, and a magical object: ${magicalObject}. The story should revolve around their first experience of ${firstExperience}. The story should be rich in detail, imaginative, and around 2000 words. Use a fun, enchanting tone suitable for young children. Include elements like fairies, wizards, castles, toadstools, sparkling rivers, and magical forests.`;

    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are a children's storybook author." },
        { role: "user", content: prompt }
      ],
      temperature: 0.8,
      max_tokens: 3000
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ story: completion.data.choices[0].message.content }),
    };
  } catch (error) {
    console.error("Story generation failed:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to generate story." }),
    };
  }
};
