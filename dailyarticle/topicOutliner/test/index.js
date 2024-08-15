import { Agent } from "../src/index.js";

const agent = new Agent();

const input = {
  topic: "Llama3.1革新上线！限时免费培训机会，不容错过！",
};
const saveconfig = {
  url: "http://127.0.0.1:12008/apm/agentservice/result/save",
  headers: {},
  data: {
    access_token: "",
    runId: Math.random().toString().substring(2, 15),
    name: "fynal-ai/topicOutliner",
    version: "1.0.1",
    input: {
      topic: "ink",
    },
    output: {
      route: "Hello!",
      outline: "Hello!",
      error: "error_message",
    },
  },
  status: {},
};

const output = await agent.run(input, saveconfig);
console.log("output", output);
