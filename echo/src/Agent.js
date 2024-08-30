import { APMAgent } from "@fynal-ai/apm";
import OpenAI from "openai";
const SAMBANOVA_API_URL = "https://fast-api.snova.ai/v1";
const SAMBANOVA_API_KEY = "bGl1a2Vob25nX19haTJudi5jb206TDA1bnhRNG1MTg==";
const client = new OpenAI({
  baseURL: SAMBANOVA_API_URL,
  apiKey: SAMBANOVA_API_KEY,
});

class Agent {
  constructor() {
    this.apmAgent = new APMAgent();
  }
  async run(input, saveconfig) {
    console.log("Receive", input);

    // send to ChatGPT
    const responseJSON = {};
    const messages = [
      {
        role: "system",
        content:
          "您是一位genAI领域科技媒体专业撰稿人，擅长根据标题规划文章的要点",
      },
      {
        role: "user",
        content: `标题是[AIGC硬件发展], 请用MD格式列出文章的要点`,
      },
    ];

    const stream = await client.chat.completions.create(
      {
        model: "Meta-Llama-3.1-8B-Instruct",
        messages: messages,
        stream: true,
      },
      // {
      //   responseType: "stream", // Stream response handling
      // },
    );

    let tmp = "";
    for await (const part of stream) {
      tmp += part.choices[0]?.delta?.content || "";
    }

    const output = { data: tmp };
    this.apmAgent.saveOutput(saveconfig, output);

    return output;
  }
}

export { Agent };
