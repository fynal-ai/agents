import OpenAI from "openai";
const client = new OpenAI({
  baseURL:
    "https://cognihubemp.baystoneai.com/cognihub/service/668b6ecdcd9460b2c6963a97/v1",
  apiKey: "tFgZqkg65BaOfBFWmNHHlVC63EdPIAYVUWPj",
});

import { APMAgent } from "@fynal-ai/apm";

class Agent {
  constructor() {
    this.apmAgent = new APMAgent();
  }
  async run(input, saveconfig) {
    const topic = input.topic;

    const responseJSON = {};

    const output = { route: "continue" };
    const messages = [
      {
        role: "system",
        content:
          "您是一位genAI领域科技媒体专业记者撰稿人，擅长结合热点设定报道稿件的抓眼球的标题",
      },
      { role: "assistant", content: input.background },
      {
        role: "user",
        content: `请优化标题[${topic}], 如有必要可重写. 请用numbered list方式输出5个建议标题`,
      },
    ];

    const chatCompletion = await client.chat.completions.create({
      model: "qwen2-instruct",
      messages: messages,
    });
    try {
      output.topic = chatCompletion.choices[0].message.content;
    } catch (err) {
      output.route = "error";
      output.reason = err.message;
    }
    this.apmAgent.saveOutput(saveconfig, output);

    return output;
  }
}

export { Agent };
