import { APMAgent } from "@fynal-ai/apm";
import OpenAI from "openai";
const client = new OpenAI({
  baseURL:
    "https://cognihubemp.baystoneai.com/cognihub/service/668b6ecdcd9460b2c6963a97/v1",
  apiKey: "tFgZqkg65BaOfBFWmNHHlVC63EdPIAYVUWPj",
});

class Agent {
  constructor() {
    this.apmAgent = new APMAgent();
  }
  async run(input, saveconfig) {
    console.log("Receive", input);

    const responseJSON = {};
    const messages = [
      {
        role: "system",
        content:
          "您是一位genAI领域科技媒体专业撰稿人，擅长根据标题和大纲编写专业的文章",
      },
      {
        role: "user",
        content: `标题是[${input.topic}], 大纲是[${input.outline}]. 背景信息包括[${input.background}]. 请根据大纲的结构和内容进行扩充,  编写专业的文章`,
      },
    ];

    const chatCompletion = await client.chat.completions.create({
      model: "qwen2-instruct",
      messages: messages,
    });
    const output = {};
    try {
      output.route = "continue";
      output.article = chatCompletion.choices[0].message.content;
    } catch (err) {
      output.route = "error";
      output.article = "";
      output.reason = err.message;
    }

    this.apmAgent.saveOutput(saveconfig, output);

    return output;
  }
}

export { Agent };
