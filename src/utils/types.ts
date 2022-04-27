import {ApplicationCommandOptions, CommandInteraction, Constants, Message} from 'eris';
import {Client} from '../Client';

type DebugDisabled = ['commandErrors']

interface DebugOptions {
    enabled: boolean,
    disabled?: DebugDisabled,
}

export interface FrameworkOptions {
    baseDirectory: string;
    defaultPrefix: string;
    debug?: DebugOptions | boolean;
    slashGuildId?: string;
    autoRegisterSlash?: boolean;
}

export interface DmMessageCollectorOptions {
    timeout: number;
    client: Client;
}

interface SlashOptions {
    enabled: boolean | false;
    options?: ApplicationCommandOptions[];
    defaultPermission?: boolean | false;
    // eslint-disable-next-line no-unused-vars
    precondition?: (interaction: CommandInteraction) => boolean;
}

export interface CommandOptions {
    name: string;
    description: string;
    aliases?: string[];
    usage?: string;
    guildOnly?: boolean;
    dmOnly?: boolean;
    guildOwneronly?: boolean;
    ownerOnly?: boolean;
    permissions?: (keyof Constants['Permissions'])[];
    argsRequired?: boolean;
    deleteCommand?: boolean;
    // eslint-disable-next-line no-unused-vars
    customPrecondition?: (message: Message) => boolean;
    slash?: SlashOptions;
}
