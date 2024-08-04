import { APMAgent } from "@jobsimi/apm";

class Agent {
  constructor() {
    this.apmAgent = new APMAgent();
  }
  async run(params, saveconfig) {
    console.log("Receive", params);

    const topic = params.topic;

    // send to ChatGPT
    const responseJSON = {};

    const output = {
      outline: `
# ${topic} - 1

good topic 1

# ${topic} - 2

good topic 2

# ${topic} - 3

good topic 3

# ${topic} - 4

good topic 4

`,
    };

    this.apmAgent.saveOutput(saveconfig, output);

    return output;
  }
}

export { Agent };
