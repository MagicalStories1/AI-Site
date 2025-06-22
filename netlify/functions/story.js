exports.handler = async function(event, context) {
  const data = JSON.parse(event.body || '{}');
  const { childName, favoriteAnimal, firstExperience, magicWord, guardianName } = data;

  const story = `
    Once upon a time, in a land of glowing toadstools and sparkling stars, there lived a brave little explorer named ${childName}.
    With their best friend — a talking ${favoriteAnimal} — and a magical word "${magicWord}" whispered by ${guardianName},
    they set off on their first adventure to ${firstExperience}. ✨

    Along the path, they met friendly dragons, danced with fairies, and discovered that courage lives in every heart...
    
    And from that day, the world sparkled a little brighter whenever ${childName} smiled.
  `;

  return {
    statusCode: 200,
    body: JSON.stringify({ story })
  };
};
