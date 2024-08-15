import { Agent } from "../src/index.js";

const agent = new Agent();

const input = {
  html: '<node id="start" left="140" top="120"><node id="a2_2" left="280" top="360"><node id="end" left="220" top="100"><node id="a3_1" left="360" top="280"><node id="a2_1" left="440" top="180"><node id="n9TKbaGFCu9T4YfrQwqgUsa" left="200" top="720"><node id="n95wCHyPHh6Mw2WoA6VxbGe" left="260" top="720"><node id="a1_1" left="700" top="100"><link from_node_id="a2_1" to_node_id="a3_1"><link from_node_id="a1_1" to_node_id="a2_1"><link from_node_id="a2_2" to_node_id="a2_1"><link from_node_id="a1_1" to_node_id="a2_2"><link from_node_id="a3_1" to_node_id="end"><link from_node_id="start" to_node_id="a1_1">',
};

console.log(input);
const output = await agent.run(input);
console.log("output", output);
