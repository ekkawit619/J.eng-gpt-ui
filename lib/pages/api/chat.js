import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  const { messages } = req.body;
  const completion = await openai.createChatCompletion({
    model: "gpt-4",
    messages,
  });
  res.status(200).json({ result: completion.data.choices[0].message });
}
