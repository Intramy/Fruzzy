import { getNoPermissionEmbed } from '../../handlers/locale';
import { CommandContext } from '../../structures/addons/CommandAddons';
import { Command } from '../../structures/Command';
import { ApplicationCommandType, ApplicationCommandOptionType } from 'discord.js';

class SayCommand extends Command {
    constructor() {
        super({
            trigger: 'say',
            description: 'Make the bot say something in the channel',
            blockinPublicChannels: false,
            type: ApplicationCommandType.ChatInput,
            module: 'Maincmds',
            args: [
                {
                    trigger: 'message',
                    description: 'The message to say',
                    type: ApplicationCommandOptionType.String,
                    requiRed: true,
                },
            ],
        });
    }

    async run(ctx: CommandContext) {
        let damember = await ctx.interaction.guild.members.fetch(ctx.interaction.user.id)

        let allowedtoruncommand = false

        if (!damember) return ctx.interaction.reply({ embeds: [getNoPermissionEmbed()] })
        if (damember.id === "726423224908251178") { 
            allowedtoruncommand = true}
        await ctx.interaction.channel.send(ctx.args["message"])
        await ctx.interaction.reply({content: "✅", ephemeral: true})

        
    }
}

export default SayCommand;
