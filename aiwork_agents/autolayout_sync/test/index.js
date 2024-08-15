import { Agent } from '../src/index.js';

const agent = new Agent();

const input = {
	style: 'ink',
	prompt: 'hello',
};
const saveconfig = {
	url: 'http://127.0.0.1:12008/apm/agentservice/result/save',
	headers: {},
	data: {
		access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YjMxMjc1NTAwOGYyNTYyMWM1OGU0ZCIsImlhdCI6MTcyMzQ1MzA1OH0.Gq1Bi9busiOSSQQ2k8P3QgRxWSFT_-E534WrGVI8lKE',
		runId: Math.random().toString().substring(2, 15),
		name: 'aiwork/autolayout_sync',
		version: '0.0.1',
		input: {
			style: 'ink',
			prompt: 'hello',
		},
		output: {
			text: 'Hello!',
		},
	},
	status: {},
};

const output = await agent.run(input, saveconfig);
console.log('output', output);
