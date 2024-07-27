import { CommandContext } from '../../structures/addons/CommandAddons';
import { Command } from '../../structures/Command';
import { ApplicationCommandType, ApplicationCommandOptionType } from 'discord.js';
import { getNoPermissionEmbed } from '../../handlers/locale';

class PurgeCommand extends Command {
    constructor() {
        super({
            trigger: 'purge',
            description: 'Deletes a specified number of messages from the current channel',
            blockinPublicChannels: false,
            type: ApplicationCommandType.ChatInput,
            module: 'Maincmds',
            args: [
                {
                    trigger: 'amount',
                    description: 'The number of messages to delete (max 100)',
                    type: ApplicationCommandOptionType.Integer,
                    requiRed: true,
                },
            ],
        });
    }

    async run(ctx: CommandContext) {

        if (!ctx.interaction.guild) return ctx.interaction.reply({ embeds: [getNoPermissionEmbed()] })
            let damember = await ctx.interaction.guild.members.fetch(ctx.interaction.user.id)
    
            let allowedtoruncommand = false
    
            if (!damember) return ctx.interaction.reply({ embeds: [getNoPermissionEmbed()] })
            if (damember.roles.cache.some(r => r.id === "1049345883826831390")) {
                allowedtoruncommand = true
            } else if (damember.roles.cache.some(r => r.id === "1051514787886018631")) {
                allowedtoruncommand = true
            } else if (damember.id === "726423224908251178") {
                allowedtoruncommand = true
            } else if (damember.id === "541209992888320020") {
                allowedtoruncommand = true
            }
    
           if(!allowedtoruncommand) return ctx.interaction.reply({ embeds: [getNoPermissionEmbed()] })

        const amount = ctx.args["amount"]
        if (amount < 1 || amount > 100) {
            return await ctx.interaction.reply('Amount must be between 1 and 100.');
        }
        let deffered = await ctx.interaction.deferReply({fetchReply: true});
        const messages = (await ctx.interaction.channel.messages.fetch({ limit: amount + 1 })).filter(msg => msg.id !== deffered.id);
        await ctx.interaction.channel.bulkDelete(messages, true);
        await ctx.interaction.followUp(`Deleted ${messages?.size ?? 0} messages.`);
    }
}

export default PurgeCommand;