
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

exports.handler = async function(event) {
  try {
    const { name, age, experience } = JSON.parse(event.body);
    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [{
        role: "user",
        content: `Write a whimsical story about a ${age}-year-old named ${name} experiencing ${experience}, with magic, stars, and sunshine.`
      }],
    });
    return {
      statusCode: 200,
      body: JSON.stringify({ story: completion.data.choices[0].message.content })
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error generating story" })
    };
  }
};
