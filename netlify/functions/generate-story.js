const { Configuration, OpenAIApi } = require("openai");

exports.handler = async function (event, context) {
  const body = JSON.parse(event.body);
  const { childName, age, setting, favoriteAnimal, magicElement, eventType } = body;

  const prompt = `
Write a whimsical, elegant, and funny story (max 2000 words) for a child named ${childName} who is ${age} years old. 
The story takes place in ${setting} and features a magical ${magicElement} and a favorite animal: ${favoriteAnimal}. 
The story should center around the event: "${eventType}" and be suitable for young children. 
Include magical descriptions and end on a happy note.
`;

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 2000,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ story: completion.data.choices[0].message.content }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to generate story", details: err.message }),
    };
  }
};
