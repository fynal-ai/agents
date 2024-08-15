import { APMAgent } from "@fynal-ai/apm";

class Agent {
  constructor() {
    this.apmAgent = new APMAgent();
  }
  async run(params, saveconfig) {
    console.log("Receive", params);

    const message = params.message;

    // send to ChatGPT
    const responseJSON = {};

    const output = { route: Math.random() < 0.5 ? "A" : "B" };

    this.apmAgent.saveOutput(saveconfig, output);

    return output;
  }
}

export { Agent };
