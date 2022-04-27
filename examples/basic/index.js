const {Client} = require('@cofo/framework');

const client = new Client(`Bot ${process.env.TOKEN}`, {
	baseDirectory: `${process.cwd()}/examples/basic`,
	defaultPrefix: '+',
	debug: true,
}, {
	intents: [
		'all',
	],
	restMode: true,
});

client.connect();
