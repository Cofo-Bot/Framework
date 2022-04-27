
import {Client} from './Client';
import glob from 'glob';
import {CommandInteraction, Constants, Message} from 'eris';
import {Command} from './Command';

/**
 * The Client's Handler.
 * @class
 */
export class Handler {
	private client: Client;
	/**
	 * Create a new Handler For The Client
	 * @param {Client} client The Client
	 * @since 1.0.1
     * @constructor
	 */
	constructor(client: Client) {
		this.client = client;
		this.client.once('ready', () => this.cacheCommands());
		this.client.on('interactionCreate', (interaction: CommandInteraction) => {
			if (interaction instanceof CommandInteraction) {
				this.handleInteraction(interaction);
			}
		});
		this.client.on('messageCreate', async (msg: Message) => this.handleMessage(msg));
	}

	/**
     * @since 1.0.0
     * Cache Commands into the Command Map
     */
	public async cacheCommands() {
		const commandFiles = glob.sync(this.client.frameworkOptions.baseDirectory + '/commands/**/*{.ts,.js}');
		const promises = commandFiles.map(async file => {
			const {default: CommandClass} = await import(file);
			const targetFile = new CommandClass(this.client);
			if (targetFile.options.name < 3 && targetFile.options.slash.enabled) {
				throw new TypeError('Commands which have slash enabled must be atleast 3 characters long.');
			}

			this.client.commands.set(targetFile.options.name, targetFile);
			const commandAliases = targetFile.aliases as Array<any>;
			if (targetFile.options.aliases) {
				commandAliases.forEach(alias => {
					this.client.aliases.set(alias, targetFile.options.name);
				});
			}
		});

		await Promise.all(promises);
	}

	/**
     * Cache All The Listeners to a Map
     */
	async cacheListeners() {
		const listenerFiles = glob.sync(this.client.frameworkOptions.baseDirectory + '/listeners/**/*{.ts,.js}');
		listenerFiles.forEach(async file => {
			const event = await import(file);
			this.client.on(event.key, (...args) => event.run(this.client, ...args));
		});
	}

	/**
     * Handle a Message
     * @param {Message} msg
     * @since 1.0.0
     * @async
     */
	public async handleMessage(msg: Message) {
		if (this.client.ignoreBots && msg.author.bot) {
			return;
		}

		let prefix = '';
		if (this.client.mentionPrefix) {
			const mentionRegex = msg.content.match(new RegExp(`^<@!?(${this.client.user.id})>`, 'gi'));
			prefix = mentionRegex![0];
		}

		const customprefix = this.client.fetchPrefix(msg);
		if (customprefix) {
			prefix = customprefix;
		} else {
			prefix = this.client.frameworkOptions.defaultPrefix;
		}

		// If the message doesn't start with prefix, return..
		if (!msg.content.startsWith(prefix)) {
			return;
		}

		// Get the arguments of the command.
		const args = msg.content.slice(prefix.length).trim().split(/ +/g) as Array<any>;
		// Get the command name
		const cmd = args?.shift().toLowerCase();
		// Fetch the command from the maps
		const command: Command = this.fetchCommand(cmd) || this.client.commands.get(this.client.aliases.get(cmd));
		// If the command doesn't exist, return
		if (!command) {
			return;
		}

		// If the command is guildOnly and message doesn't have a guildID aka doesn't belong to a guild, return.
		if (command.options.guildOnly && msg.guildID) {
			return;
		}

		// If the command is dmOnly and the channel is not a dm channel, return
		if (command.options.dmOnly && msg.channel.type !== Constants.ChannelTypes.DM) {
			return;
		}

		const guild = this.client.guilds.get(msg.guildID as any);

		if (command.options.guildOwneronly && msg.author.id !== guild?.ownerID) {
			return;
		}

		// If the command requires args but args array is empty, return
		if (command.options.argsRequired && args.length === 0) {
			this.client.logger.debug(`Condition Not Satisfied: Arguments was required for command ${command.options.name} at #${msg.channel.id}`);
		}

		if (command.options.customPrecondition && !command.options.customPrecondition(msg)) {
			this.client.logger.debug(`Custom Pre-Condition For Command ${command.options.name} Not Met at Channel #${msg.channel.id}`);
		}

		// Execute the command
		command.messageRun(this.client, msg, args);

		if (command.options.deleteCommand) {
			try {
				msg.delete();
			} catch (e) {
				return e;
			}
		}
	}

	/**
     * Fetch a Command From Aliases Or The Commands Map
     */
	private fetchCommand(commandName: string) {
		return this.client.commands.get(commandName) || this.client.commands.get(this.client.aliases.get(commandName));
	}

	public handlePermissions(interaction: CommandInteraction, permissions: (keyof Constants['Permissions'])[]) {
		for (const permission of permissions) {
			if (interaction.member?.permissions.has(permission as keyof Constants['Permissions'])) {
				return true;
			}
		}
	}

	/**
     * Handle a Command Interaction
     * @param {CommandInteraction} interaction
     * @since 1.0.0
     */
	public handleInteraction(interaction: CommandInteraction) {
		const command: Command = this.fetchCommand(interaction.data.name);
		if (!command || !command.options?.slash?.enabled) {
			return;
		}

		if (command.options.slash.precondition && !command.options.slash.precondition(interaction)) {
			return;
		}

		if (command.options.permissions && !this.handlePermissions(interaction, command.options.permissions)) {
			return;
		}

		if (command.options.guildOnly && !interaction.guildID) {
			return;
		}

		command.interactionRun(this.client, interaction);
	}
}
