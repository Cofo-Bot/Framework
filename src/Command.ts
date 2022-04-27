import Eris, {CommandInteraction} from 'eris';
import {Client} from './Client';
import {CommandOptions} from './utils/types';

export class Command {
	private client: Client;
	public options: CommandOptions;
	/**
	 * Create a new command.
	 * @since 1.0.1
	 * @param {Client} client The client instance.
	 * @param {CommandOptions} options The command options.
	 */
	constructor(client: Client, options: CommandOptions) {
		this.client = client;
		this.options = options;
	}

	// eslint-disable-next-line no-unused-vars
	public messageRun(client: Client, message: Eris.Message, args: string[]) {}

	// eslint-disable-next-line no-unused-vars
	public interactionRun(client: Client, interaction: CommandInteraction): any {}
}
