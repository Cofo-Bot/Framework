const {Command} = require('@cofo/framework');

module.exports = class HelloCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'hello',
			description: 'Say Hello!',
		});
	}

	messageRun(client, message, _args) {
		client.createMessage(message.channel.id, 'Hello!');
	}
};
