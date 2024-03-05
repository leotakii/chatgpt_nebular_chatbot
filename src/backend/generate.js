const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

var bababooey = async function(req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  const animal = req.body.animal || '';
  if (animal.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid animal",
      }
    });
    return;
  }

  try {

    const pinkyPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(openai.createCompletion({
          model: "text-davinci-003",
          prompt: generatePrompt(animal),
          max_tokens: 2048,
          temperature: 0.4,
        }));
        reject();
      }, 1);
    });

    pinkyPromise
    .then(response => res.status(200).json({ result: response.data.choices[0].text }));
   // .then(response => console.log(response.data) );
  } catch(error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
 
    console.error(error.response.status, error.response.data);
     res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}

function generatePrompt(animal) {
  
  return animal;

  const capitalizedAnimal =
    animal[0].toUpperCase() + animal.slice(1).toLowerCase();
  return `Suggest three names for an animal that is a superhero.

Animal: Cat
Names: Captain Sharpclaw, Agent Fluffball, The Incredible Feline
Animal: Dog
Names: Ruff the Protector, Wonder Canine, Sir Barks-a-Lot
Animal: Bunny
Names:`;

}
module.exports = bababooey;