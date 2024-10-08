import { Agent } from '../src/index.js';

const agent = new Agent();

const params = {
	style: 'ink',
	prompt: 'hello',
};
const saveconfig = {
	url: 'http://127.0.0.1:12008/apm/agentservice/result/save',
	headers: {},
	data: {
		access_token: '',
		runId: Math.random().toString().substring(2, 15),
		name: 'fynal-ai/hello',
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

const output = await agent.run(params, saveconfig);
console.log('output', output);
