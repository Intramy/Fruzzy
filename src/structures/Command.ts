import {
    Application,
    ApplicationCommandData,
    ApplicationCommandOptionData,
    ApplicationCommandOptionType,
    ApplicationCommandPermissions,
    ApplicationCommandPermissionType,
    ApplicationCommandType,
    ChatInputApplicationCommandData,
    PermissionFlagsBits,
} from 'discord.js';
import {
    CommandConfig,
    CommandPermission,
    CommandArgument,
} from './types';
import { CommandContext } from './addons/CommandAddons';
import { config } from '../config';

const commandTypeMappings = {
    ChatInput: 'CHAT_INPUT',
    Message: 'MESSAGE',
    User: 'USER'
}

const argumentTypeMappings = {
    Subcommand: 'SUB_COMMAND',
    SubcommandGroup: 'SUB_COMMAND_GROUP',
    String: 'STRING',
    Number: 'INTEGER',
    RobloxUser: 'STRING',
    RobloxRole: 'STRING',
    DiscordUser: 'USER',
    DiscordRole: 'ROLE',
    DiscordChannel: 'CHANNEL',
    DiscordMentionable: 'MENTIONABLE',
}

const mapArgument = (arg: CommandArgument) => {
    const apiArgument = {
        name: arg.trigger,
        description: arg.description || 'No description provided.',
        type: arg.type,
        autocomplete: arg.autocomplete || false,
        required: arg.requiRed !== null && arg.requiRed !== undefined ? arg.requiRed : true,
        options: arg.args ? arg.args.map(mapArgument) : [],
        choices: arg.choices ? arg.choices : [],
        channelTypes: arg.channelTypes,
    }
    return apiArgument;
}

abstract class Command {
    trigger: string;
    type?: any
    description?: string;
    hidden?: boolean
    blockinPublicChannels?: boolean
    adminonly?: boolean
    module?: string;
    aliases?: string[];
    allowedindms?: boolean;
    permissions?: CommandPermission[];
    args?: CommandArgument[];

    constructor(options: CommandConfig) {
        this.trigger = options.trigger;
        this.type = options.type;
        this.description = options.description || null;
        this.hidden = options.hidden
        this.blockinPublicChannels = options.blockinPublicChannels
        this.adminonly = options.adminonly
        this.module = options.module || 'other';
        this.aliases = options.aliases || [];
        this.allowedindms = options.allowedindms;
        this.permissions = options.permissions || [];
        this.args = options.args || [];
    }

    /**
     * Generate a command object for slash commands.
     */
    generateAPICommand() {


        console.log("runned")
        /*let theone = [
            {
                type: 'role',
                ids: config.permissions.admin,
                value: true,
            }
        ] 

        let thetwo = [
            {
                type: 'role',
                ids: config.permissions.all,
                value: true,
            }
        ] 

        let thethree = [
            {
                type: 'role',
                ids: config.permissions.admin,
                value: true,
            },
            {
                type: 'role',
                ids: config.permissions.all,
                value: true,
            }
        ] 

        let thetfour = [
            {
                type: 'role',
                ids: config.permissions.all,
                value: true,
            },
            {
                type: 'role',
                ids: config.permissions.admin,
                value: true,
            }
        ]*/

            console.log("uhh")

        let com: ChatInputApplicationCommandData = {
            name: this.trigger,
            description: this.description,
            type: this.type,
            options: this.args ? this.args.map(mapArgument) : null,
            defaultMemberPermissions: "UseApplicationCommands",
            dmPermission: false
            
        }

        if (this.adminonly) {
            console.log("yes")
            return {
                name: this.trigger,
                description: this.description,
                type: this.type,
                options: this.args ? this.args.map(mapArgument) : null,
                defaultMemberPermissions: "Administrator",
                dmPermission: false
            }
        } else {
            console.log("im dying")
            return {
                name: this.trigger,
                description: this.description,
                type: this.type,
                options: this.args ? this.args.map(mapArgument) : null,
                dmPermission: false,

            }
        }

    }

    /**
     * The function to run the command.
     * @param ctx The context of the command.
     * @param args The arguments passed to the command, as an object mapped by ID.
     */
    abstract run(ctx: CommandContext): void;
}

export { Command };