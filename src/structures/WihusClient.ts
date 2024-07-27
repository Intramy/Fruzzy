import { Client, TextChannel, EmbedBuilder, Role, Collection, GuildMember, User, NewsChannel, Message, ChannelType, GatewayIntentBits, Partials, ActivityType, MessageType, PermissionFlagsBits, GuildChannel, ThreadChannel, ForumChannel, CategoryChannel, AttachmentBuilder, Embed, AuditLogOptionsType, AuditLogEvent, PermissionsBitField, ApplicationCommandType, ApplicationCommandOptionType, ButtonBuilder, ActionRowBuilder, ButtonStyle, ApplicationCommand, GuildResolvable, chatInputApplicationCommandMention, DMChannel, PartialDMChannel, Attachment, ChannelFlagsBitField } from 'discord.js';
import { BotConfig, CommandExport } from './types';
import { Command } from './Command';
import { config } from '../config';
import { readdirSync, writeFileSync } from 'fs';
import { discordClient } from '../main';
import { qbotLaunchTextDisplay, welcomeText, startedText, securityText, getListeningText, mainColor, mainColorMaintenance } from '../handlers/locale';
import { provider } from '../database/router';
import { DatabaseProvider } from './DatabaseProvider';

import { EventEmitter } from 'events';
import ms from 'ms';
import { head } from 'lodash';
import axios from 'axios';


require('dotenv').config();




export const consoleGreen = '\x1b[32m';
export const consoleClear = '\x1b[0m';
export const datext = `\n${consoleGreen}✓  ${consoleClear}Bot succesfully loaded`;
export let mutedppl = [] as string[]
class WihusClient extends Client {
    config: BotConfig;
    commands: any[];

    constructor() {
        super({
            partials: [Partials.Message, Partials.Reaction, Partials.User, Partials.Channel],
            intents: [
                GatewayIntentBits.MessageContent,
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.GuildMembers,
                GatewayIntentBits.GuildMessageReactions,
                GatewayIntentBits.GuildVoiceStates,
                GatewayIntentBits.GuildPresences,
                GatewayIntentBits.GuildMessageTyping,
                GatewayIntentBits.DirectMessages,
                GatewayIntentBits.DirectMessageTyping,
                GatewayIntentBits.DirectMessageReactions
            ]
        })
        this.config = config;
        this.on('ready', () => {
            console.log(qbotLaunchTextDisplay);
            console.log(welcomeText);
            this.loadCommands()
            if (this.application.botPublic) return console.log(securityText);
            console.log(startedText);
            console.log(getListeningText(process.env.PORT || 3001));

            if (config.activity.enabled) {
                this.user.setActivity(config.activity.value, {
                    type: ActivityType.Watching,
                    url: config.activity.url,
                });
            }

            if (config.status !== 'online') this.user.setStatus(config.status);

            const logchannel: TextChannel = discordClient.channels.cache.get('1122192467761041468') as TextChannel;


            logchannel.send("Online!")
                .then(async (message) => { console.log(`\n${consoleGreen}✓  ${consoleClear}Online as ${this.user.tag} (succesfully loaded | LOCAL MACHINE)`), message.react("✅") });
        });

  

//        this.on("guildMemberAdd", async (member) => {
//            if (member.guild.id === "1049076106126426143") {
//               if (member.id === "541209992888320020" || member.id === "726423224908251178" || member.id === "782975543166631946" || member.id === "1225890734557892609" ) {
//                   let helperrole = member.guild.roles.cache.get("1195421968439202004")
//                    if (!helperrole) return
//                    await member.roles.add(helperrole, "pro").then(() => member.send("You have been given the helper role automatically (😎)")).catch((err) => member.send(`Failed to give the helper role to ${member.user.tag}: ${err.message}`));
//
//                }
//            }
//       })


    }




    /**
     * Load all commands into the commands object of WihusClient.
     */
    loadCommands() {
        const rawModules = readdirSync('./src/commands');
        const loadPromise = new Promise((resolve, reject) => {
            let commands: Command[] = [];
            rawModules.forEach(async (module, moduleIndex) => {
                const rawCommands = readdirSync(`./src/commands/${module}`);
                rawCommands.forEach(async (cmdName, cmdIndex) => {
                    const { default: command }: CommandExport = await import(`../commands/${module}/${cmdName.replace('.ts', '')}`);
                    commands.push(command);
                    if (moduleIndex === rawModules.length - 1 && cmdIndex === rawCommands.length - 1) resolve(commands);
                });
            });
        });
        loadPromise.then(async (commands: Command[]) => {
            const slashCommands = commands.map((cmd: any) => new cmd().generateAPICommand()).filter(command => command.name !== "nuke")
            const slashCommands2 = commands.map((cmd: any) => new cmd().generateAPICommand()).filter(command => command.name === "nuke")
            const currentCommands = require('../resources/commands.json');
            if (JSON.stringify(currentCommands) !== JSON.stringify(slashCommands)) {
                writeFileSync('./src/resources/commands.json', JSON.stringify(slashCommands), 'utf-8');
                let intramysparadise = discordClient.guilds.cache.get("988806406083870790")
                intramysparadise.commands.set(slashCommands2)
                discordClient.application.commands.set(slashCommands);
            }
            this.commands = commands;
        });
    }
}

export { WihusClient };