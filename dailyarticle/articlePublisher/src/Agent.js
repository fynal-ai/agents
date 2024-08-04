import { APMAgent } from "@jobsimi/apm";

class Agent {
  constructor() {
    this.apmAgent = new APMAgent();
  }
  async run(params, saveconfig) {
    console.log("Receive", params);

    const { topic, article } = params;

    // send to ChatGPT
    const responseJSON = {};

    const output = { status: "Already published to WeChat(demo)" };

    this.apmAgent.saveOutput(saveconfig, output);

    return output;
  }
}

export { Agent };
