import Eris from 'eris';
import {Handler} from './Handler';
import {Logger} from './Logger';
import {FrameworkOptions} from './utils/types';
import packagejson from '../package.json';

export class Client extends Eris.Client {
	/* Choose whether mention prefix should be enabled or disabled */
	public mentionPrefix: boolean = false;
	/* Whether bots should be ignored for messages or not */
	public ignoreBots: boolean = true;
	/* Essential Maps Required For Framework Internal Use */
	public commands: Map<any, any>;
	public aliases: Map<any, any>;
	public events: Map<any, any>;
	/* The Handler Instance */
	private handler: Handler;
	/* The Options From User */
	public frameworkOptions: FrameworkOptions;
	/* The Logger Instance */
	public logger: Logger;
	/* The Default Prefix of The Client */
	constructor(token: string, frameworkOptions: FrameworkOptions, erisOptions?: Eris.ClientOptions | undefined) {
		super(token, erisOptions!);
		this.commands = new Map();
		this.events = new Map();
		this.aliases = new Map();
		this.handler = new Handler(this);
		this.frameworkOptions = frameworkOptions;
		this.logger = new Logger();
	}

	// eslint-disable-next-line no-unused-vars
	public fetchPrefix(message: Eris.Message<Eris.TextableChannel>): string | undefined {
		return undefined;
	}

	public reloadCommands() {
		try {
			this.handler.cacheCommands();
			return true;
		} catch (e) {
			return e;
		}
	}

	async connect(): Promise<void> {
		console.log(
			`
            ██████╗ ██████╗ ███████╗ ██████╗ 
            ██╔════╝██╔═══██╗██╔════╝██╔═══██╗
            ██║     ██║   ██║█████╗  ██║   ██║
            ██║     ██║   ██║██╔══╝  ██║   ██║
            ╚██████╗╚██████╔╝██║     ╚██████╔╝
             ╚═════╝ ╚═════╝ ╚═╝      ╚═════╝ 
                                              
                Version: ${packagejson.version}
                Donate: https://github.com/Cofo-Bot/Framework
				Made With ❤️ by ApiDev234
                \x1b[1m\x1b[35mThanks For Using Cofo-Framework\x1b[0m
            `,
		);
		this.logger.debug('Trying To Connect To Client');
		super.connect.call(this);
		this.handler.cacheListeners();
		super.on('ready', async () => {
			this.logger.debug('Client has connected as ' + this.user.username);
		});
	}
}
