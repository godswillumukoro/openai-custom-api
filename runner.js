import { config } from "dotenv";
config();

import color from "cli-color";

import { Configuration, OpenAIApi } from "openai";
import readLine from "readline";

const openAI = new OpenAIApi(
  new Configuration({
    apiKey: process.env.API_KEY,
  })
);

const userInterface = readLine.createInterface({
  input: process.stdin,
  output: process.stdout,
});

userInterface.prompt();
userInterface.on("line", async (input) => {
  const response = await openAI.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: input }],
  });
  console.log(color.cyan(response.data.choices[0].message.content));
  userInterface.prompt();
});
