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
        content: `标题是[${input.topic}], 请用MD格式列出文章的要点`,
      },
    ];
    if (input.background) {
      messages.push({
        role: "assistant",
        content: "相关背景信息是：" + input.background,
      });
      messages.push({
        role: "user",
        content: `需要紧密结合背景信息`,
      });
    }
    if (input.outline_requirement) {
      messages.push({
        role: "user",
        content: `需要达到以下要求: ${input.outline_requirement}`,
      });
    }

    const chatCompletion = await client.chat.completions.create({
      model: "qwen2-instruct",
      messages: messages,
    });
    const output = {};
    try {
      output.route = "continue";
      output.outline = chatCompletion.choices[0].message.content;
    } catch (err) {
      output.route = "error";
      output.outline = "";
      output.reason = err.message;
    }

    this.apmAgent.saveOutput(saveconfig, output);

    return output;
  }
}

export { Agent };
