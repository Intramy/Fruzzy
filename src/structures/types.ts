import exp from 'constants';
import { ActivityType, APIApplicationCommandOptionChoice, ApplicationCommandType} from 'discord.js';
import { ChannelType, ApplicationCommandOptionType} from 'discord.js';
import { Type } from 'typescript';
import { Command } from './Command';

export interface BotConfig {
    /**
     * Should slash commands be enabled? This is highly recommended, as it provides a way more interactive user experience.
     * 
     * Learn more at https://discord.dev/interactions/application-commands.
     * @default true
     */
    slashCommands: boolean;
    /**
     * Options for legacy (prefixed) commands (e.g. q!promote)
     */
    legacyCommands: {
        /**
         * Should legacy (prefixed) commands be enabled?
         * @default true
         */
        enabled: boolean;
        /**
         * A list of strings that must be appended to messages for commands to be parsed.
         * @default q!
         */
        prefixes: string[];
        prefix2: string[];
    }
    /**
     * IDs of roles that have permission to do various things.
     */
    permissions: {
        /**
         * Access to all commands. Please be careful with this.
         */
        all?: string[];

    }
    /**
     * Configuration for the built-in database module used by suspension and XP-related commands.
     */
    database: {
        /**
         * Should the database module be enabled? Disabling this will also disable a few essential commands.
         */
        enabled: boolean;
        /**
         * What type of database would you like to use? If it is MongoDB, you need to install mongoose separately.
         */
        type: 'mongodb' | 'sqlite';
    }
    /**
     * Should actions be logged, and if so, where?
     */
    logChannels: {
        /**
         * The ID of the channel where you would like all actions done through commands on this bot to be logged.
         */
        actions?: string;
        /**
         * The ID of the channel where you would like all shouts to be logged. Usually, this is a public channel.
         */
    }
    /**
     * Should the API be enabled? You are expected to have an environmental variable named API_KEY with a unique password-like string if this is enabled.
    */

    allowedcmdsCHANNEL: string[];

    botstatus: {
        enabled?: boolean
        reason?: string
    }

    api: boolean;
    /**
     * What rank should be the maximum that can be ranked by your bot? 
    */
    activity: {
        /**
         * Should there be an activity status for the bot?
         */
        enabled: boolean;
        /**
         * What should be displayed before your value?
         */
        type?: 'PLAYING' | 'WATCHING' | 'STREAMING' | 'LISTENING' | 'COMPETING';
        /**
         * This is the text that is displayed after the type of status.
         */
        value?: string;
        /**
         * If you set the type to STREAMING, where should the watch now button Redirect to?
         */
        url?: string;
    }
    /**
     * Configuration for the bot's status (online/idle/dnd).
     */
    status: 'online' | 'idle' | 'dnd';
    /**
     * Should the bot delete URLs in your group wall?
     */

}

export declare type CommandPermission = {
    /**
     * Is this a user or role that this permission is designated for?
     */
    type: 'user' | 'role' | 'user2';
    /**
     * What is the IDs of the user/role in this permission?
     */
    ids: string[];
    /**
     * Is this a positive or negative permission? Remember that the highest applicable permission in the array will be used.
     */
    value?: boolean;
}

export declare type CommandArgument = {
    /**
     * The name of the argument.
     */
    trigger: string;
    /**
     * The description of the argument. Displayed in the help command and slash command preview.
     */
    description?: string;
    /**
     * How should the value be resolved or what should be prompted for slash commands?
     */
    type: any;
    /**
     * Should the bot be sent requests to autocomplete everything they type?
     * @default false;
     */
    autocomplete?: boolean;
    /**
     * Is this argument requiRed?
     */
    requiRed?: boolean;
    /**
     * Is this argument inputted through a a flag when using the legacy commands system?
     * @default false
     */
    isLegacyFlag?: boolean;
    /**
     * The choices that the user can pick from.
     */
    choices?: APIApplicationCommandOptionChoice[];
    /**
     * If this is a subcommand (group), command arguments.
     */
    args?: CommandArgument[];
    /**
     * If the type of this argument is set to DiscordChannel, what channel types are allowed?
     */
    channelTypes?: Array<ChannelType>;
}


export interface CommandConfig {
    /**
     * The name of the command.
     */
    trigger: string;
    /**
     * The type of command.
     */
    type?: ApplicationCommandType.ChatInput | ApplicationCommandType.User | ApplicationCommandType.Message;
    /**
     * What module should the command be listed under?
     */
    module: string;
    /**
     * The description of the command. Displayed in the help command and slash command preview.
     */
    description?: string;

    hidden?: boolean

    blockinPublicChannels?: boolean

    adminonly?: boolean

    /**
     * For text commands, what other command names can be used as a substitute of the real name?
     */
    aliases?: string[];

    allowedindms?: boolean;
    /**
     * Who should have access to this command? By default, everyone will have access.
     */
    permissions?: CommandPermission[];
    /**
     * What are the command arguments?
     */
    args?: CommandArgument[];
}

export declare type CommandExport = {
    default: any;
}

export declare type BloxlinkResponse = {
    status: string;
    primaryAccount?: string;
    matchingAccount?: string;
}

export declare type DatabaseUser = {
    /**
     * The Roblox ID of the user belonging to this database entry.
     */
    discordid: string;
    /**
     * How much XP this user has.
     */
    messages: number;
    /**
     * If this user is suspended, when will they be unsuspended?
     */

     messagesforpoints: number
}

export declare type DatabaseUserPoints = {
    /**
     * The Roblox ID of the user belonging to this database entry.
     */
    discordid: string,

    inactivitydays: Number,
    globalinactivitydays: Number,
    /**
     * How much XP this user has.
     */
    points: Number,

    isdoubled: boolean,
    isdoubledTIME: number
}

export declare type DatabaseRules = {
    ruleid: String
    Rules: any
}

export declare type DatabaseClan = {

    discordid: string;

    haveacc: Boolean;

    accounts: Array<any>

}

export declare type DatabaseTwitch = {

    discordid: string;

    haveacc: Boolean;

    accounts: any;

}

export declare type DatabaseWarns = {

    discordid: string;

    havewarns: Boolean;

    warnings: any;

}

export declare type DatabaseXps = {
    discordid: string,
    Level: number,
    XPamount: number,

    isdoubled: boolean,
    isdoubledTIME: number
}

export declare type DatabaseXpsMANY = 
    {
        discordid: string,
        Level: number,
        XPamount: number,
        isdoubled: boolean,
        isdoubledTIME: number
    }[]



export declare type DatabaseCodes = {
    code: String,
    Redeemed: Boolean,
    UserIDwhoRedeemed: String,
    Description: String,
    Award: Array<any>
}

export declare type DatabaseReactionRoles = {
    guild: String,
    ExplainMSGs: Array<any>,
    ReactionRoles: Array<any>
}

export declare type DatabaseLastBattle = {
    id: String,
    battlelog: Object
}

export declare type DatabaseUpdateLog = {
    serverid: String,
    Updates: Array<any>
}

export declare type Items = {
    crate: number,
    doublePOINTtoken: number,
    doubleXPtoken: number
    
}

export declare type DatabaseInventory = {
    discordid: string,
    Items: {
        crate: number,
        doublePOINTtoken: number,
        doubleXPtoken: number,
        mutechannel: number,
        muteuser: number
    },
    reviewawardCLAIMED: boolean
    //Tasks: Array<[{messages: number, requiredmessages: number, award: {crates: number, points: number}}, {sashokping: boolean, award: {crates: number, points: number}}, {musicminutes: number, requiredminutes: number, award: {crates: number, points: number}}]>
    Tasks: Array<{name: "messages" | "sashokping" | "musicminutes", requiredtype: "number" | "boolean", requiredvalue: number, currentvalue: number, award: {crates: number, points: number}, completed: boolean}>
}

export declare type DatabaseOption1 = {
    discordid: string, tasktoadd: "messages" | "sashokping" | "musicminutes", requiredtype: "number" | "boolean", awardamountcrates: number, awardamountpoints: number, requiredvalue?: number
}

export declare type DatabaseUserSettings = {
    discordid: string,
    allowbotreplies: boolean,
    blacklisted: boolean,
    dmoncontribution: boolean,
    PassedMODtest: boolean,
    auth2faenbaled: boolean
    PassedGRAMMARtest: boolean,
    LastClaimedTimestamp: number,
    Dmmedaboutawardclain: boolean,
    isHelper: boolean
}

export declare type DatabaseStaffInfo = {
    discordid: string,
    joindate: number,
    hiredbyDISCORD: string,
    hiRedbySTRING: string,
    currentstaff: boolean,
    resignreason: string,
    Position: string,
    contributionpoints: number,
    contributionpointsMONTH: number,
    last10actions: Array<{TheDate: string, Points: number, action: string}>
}

export declare type DatabaseStaffInfoMANY = {
    discordid: string,
    joindate: number,
    hiredbyDISCORD: string,
    hiRedbySTRING: string,
    currentstaff: boolean,
    resignreason: string,
    Position: string,
    contributionpoints: number,
    contributionpointsMONTH: number,
    last10actions: Array<{TheDate: string, Points: number, action: string}>
}[]

export declare type DatabaseUserRep = {
    discordid: string,
    reputation: number,
    last10rephistory: Array<{TheDate: string, Reputation: number, userID: string, reason: string}>,
    dsidswhogaverep: Array<string>
}

export declare type DatabaseTickets = {
    discordid: string,
    channelid: string,
    ticketnumber: number,
    Mark: "moderators" | "admins" | "owner" | "staff" | "confirming",
    Subject: string,
    Closed: boolean,
    Invited: Array<String>
}

/*export declare type QuestionsObject = {
    "questions": string
    "answer": any
}*/

export declare type DatabaseServerSettings = {
    GuildId: string,
    Hiring: boolean
}

export declare type DatabaseTags = {
    GuildId: string,
    Tags: Array<{whomadetagID: string, tagname: string, tagdescription: string}>
}

export declare type DatabaseUserAuthData = {
    discordid: string,
    access_token: string,
    refresh_token: string,
    browser_sessionid: string
}