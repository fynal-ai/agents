import { APMAgent } from "@jobsimi/apm";

class Agent {
  constructor() {
    this.apmAgent = new APMAgent();
  }
  async run(params, saveconfig) {
    console.log("Receive", params);

    const topic = params.topic;

    const responseJSON = {};

    let mock_route = topic.indexOf("good") > -1 ? "continue" : "reject";

    const output = { route: mock_route };
    if (mock_route === "reject") {
      output.reason = "I'm sorry, I can't help with that topic";
      output.topic = topic + "(suggested)";
    }

    this.apmAgent.saveOutput(saveconfig, output);

    return output;
  }
}

export { Agent };
