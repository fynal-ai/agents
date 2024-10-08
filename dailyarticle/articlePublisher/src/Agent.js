import { APMAgent } from "@fynal-ai/apm";

class Agent {
  constructor() {
    this.apmAgent = new APMAgent();
  }
  async run(input, saveconfig) {
    console.log("Receive", input);

    const { topic, article } = input;

    // send to ChatGPT
    const responseJSON = {};

    const output = { status: "Already published to WeChat(demo)" };

    this.apmAgent.saveOutput(saveconfig, output);

    return output;
  }
}

export { Agent };
