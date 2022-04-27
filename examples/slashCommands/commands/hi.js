const {Command} = require('@cofo/framework');

module.exports = class HiCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'hi',
			description: 'Say Hi!',
			slash: {
				enabled: true,
			},
		});
	}

	interactionRun(client, interaction) {
		interaction.createMessage('Hi!');
	}
};
