const {Client} = require('@cofo/framework');
require('dotenv').config();

const client = new Client(`Bot ${process.env.TOKEN}`, {
	baseDirectory: `${process.cwd()}/examples/slashCommands`,
	defaultPrefix: '+',
	debug: true,
}, {
	intents: [
		'all',
	],
	restMode: true,
});

client.connect();
