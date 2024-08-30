import { APMAgent } from "@fynal-ai/apm";

class Agent {
  constructor() {
    this.apmAgent = new APMAgent();
  }
  async run(input, saveconfig) {
    const output = input;
    output["extra"] = { hello: "world" };

    this.apmAgent.saveOutput(saveconfig, output);

    return output;
  }
}

export { Agent };
