import { APMAgent } from "@fynal-ai/apm";
import OpenAI from "openai";
const QWen_modelCfg = {
  model: "qwen2-instruct",
  baseURL:
    "https://cognihubemp.baystoneai.com/cognihub/service/668b6ecdcd9460b2c6963a97/v1",
  apiKey: "tFgZqkg65BaOfBFWmNHHlVC63EdPIAYVUWPj",
};
const Llama3_modelCfg = {
  model: "llama3.1",
  baseURL:
    "https://api.baystoneai.com/cognihub/service/66b97dd5fb19cc7397384f42/v1",
  apiKey: "0kHaIOvBg9nUkEqTZMQui83EAcMpQplwkLKs",
};

const modelCfg = QWen_modelCfg;
const client = new OpenAI(modelCfg);

class Agent {
  constructor() {
    this.apmAgent = new APMAgent();
  }
  async run(input, saveconfig) {
    const prompt = `Given the HTML source code 
"""${input.html}""" 
They are two sorts of elements, node and link, 'left' and 'top' indicates the position of a node, 'id' identify each node by "(id)-node", like 'start-node', 'end-node' etc. a link element establish a link from 'from'-node to 'to'-node, which means "link from which node" (called parent node) and "link to which node" (called child node), the "from" node is parent node, the "to" node is child node.  for example, """<link from="A" to="B">""" means this link is from 'A-node' to 'B-node', the 'A-node' is a parent of 'B-node', the 'B-node' is a child of 'A-node'. together, nodes and links form a graph.  Now, we need to re-arrange the position of each node to re-layout the graph. the layout rules are: 
. find the start-node position (x,y) and do not change it, and make it the current-node; 
. let (height of current-node) = 100;
. find the children nodes of current-node, and place them on the right side of the current-node, let (x of children node) =  (x of current-node) + 50;
. change the height of each child node to 100, and evenly distribute them vertically;
. change (height of current-node) to the total height of it's children nodes;
. re-distribute the sibling nodes of current-node vertically, reversively do it until start-node.
. make each child node as current-node, and repeatedly do the above steps until all nodes are layouted.
. start-node is always the left most node, end-node is always the right most node; 
. Return the result in JSON format directly in the format like """{"node-id": {"left":left_value, "right":right_value}}""", for example: """{"start": {"left": 100, "top": 100}, "end":{"left":200, "top":300}}""". 
. the values of 'left' and 'top' must be numbers;
. exclude nodes that are not linked in the result JSON.
. Only answer with JSON, no other text, no markdown, no explanation.
`;

    const messages = [
      {
        role: "system",
        content:
          "You are an expert programmer, very good at layout nodes on a 2D canvas, you always give result in strict JSON format",
      },
      {
        role: "user",
        content: prompt,
      },
    ];

    const chatCompletion = await client.chat.completions.create({
      model: modelCfg.model,
      messages: messages,
    });
    const output = {};
    try {
      output.route = "continue";
      let txt = chatCompletion.choices[0].message.content;
      console.log(txt);
      txt = txt.replace(/```json|```/g, "");
      output.json = JSON.parse(txt);
    } catch (err) {
      output.route = "error";
      output.json = {};
      output.reason = err.message;
    }

    this.apmAgent.saveOutput(saveconfig, output);

    return output;
  }
}

export { Agent };
