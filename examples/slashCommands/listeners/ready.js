const {Listener} = require('@cofo/framework');

const commands = [
	{
		name: 'hi',
		description: 'Say Hi!',
	},
];

module.exports = new Listener('ready', async client => {
	client.bulkEditCommands(commands).then(() => {
		client.logger.debug('Successfully Registered Slash Commands');
	}).catch(e => {
		client.logger.warn('Couldn\'t Register Slash Commands');
		process.stdout.write(e + '\n');
	});
});
