import { CommandContext } from '../../structures/addons/CommandAddons';
import { Command } from '../../structures/Command';
import { ApplicationCommandType, ApplicationCommandOptionType, GuildMember, TextChannel } from 'discord.js';
import { getNoPermissionEmbed } from '../../handlers/locale';
import { EmbedBuilder } from 'discord.js'; // Assuming EmbedBuilder is correctly imported
import { log } from 'util';

class KickCommand extends Command {
    constructor() {
        super({
            trigger: 'kick',
            description: 'Kicks a user from the server',
            blockinPublicChannels: false,
            type: ApplicationCommandType.ChatInput,
            module: 'Moderation',
            args: [
                {
                    trigger: 'user',
                    description: 'The user to kick',
                    type: ApplicationCommandOptionType.User,
                    requiRed: true,
                },
                {
                    trigger: 'reason',
                    description: 'The reason for the kick',
                    type: ApplicationCommandOptionType.String,
                    requiRed: false,
                },
            ],
        });
    }

    async run(ctx: CommandContext) {
        if (!ctx.interaction.guild) {
            return ctx.interaction.reply({ embeds: [getNoPermissionEmbed()] });
        }

        const member = await ctx.interaction.guild.members.fetch(ctx.interaction.user.id);
        let allowedToRunCommand = false;

        if (!member) {
            return ctx.interaction.reply({ embeds: [getNoPermissionEmbed()] });
        }

        const allowedRoles = [
            "1049345883826831390",
            "1051514787886018631"
        ];

        const allowedIds = [
            "726423224908251178",
            "541209992888320020"
        ];

        if (allowedRoles.some(role => member.roles.cache.has(role)) || allowedIds.includes(member.id)) {
            allowedToRunCommand = true;
        }

        if (!allowedToRunCommand) {
            return ctx.interaction.reply({ embeds: [getNoPermissionEmbed()] });
        }

        const userOption = ctx.interaction.options.get('user', true);
        const reasonOption = ctx.interaction.options.get('reason');
        const user = userOption.user;
        const reason = reasonOption ? reasonOption.value as string : 'No reason specified';

        const targetMember = ctx.interaction.guild?.members.cache.get(user.id) as GuildMember;
        if (!targetMember) {
            return ctx.interaction.reply({ content: 'User not found in this server.', ephemeral: true });
        }

        try {
            await user.send(`You have been kicked from the server. Reason: ${reason}`);

            await targetMember.kick(reason);

            const embed = new EmbedBuilder()
                .setTitle('User Kicked')
                .setDescription(`${user.username} has been kicked from the server.\nReason: ${reason}`)
                .setColor('#ff0000')
                .setTimestamp();

            await ctx.interaction.reply({ embeds: [embed] });

            //LOG
            const logChannelId = '1261641923999825950'; 
            const logChannel = await ctx.interaction.guild.channels.fetch(logChannelId) as TextChannel;

            if (logChannel) {
                const logContent = `${user.username} was **KICKED** from the server by ${ctx.interaction.user.username}. Reason: ${reason}.`;
                logChannel.send(logContent); 
            } else {
                console.error(`log channel ${logChannelId} not found`)
            }
 

        } catch (error) {
            console.error(error);
            ctx.interaction.reply({ content: 'An error occurred while kicking the user.', ephemeral: true });
        }
    }
}

export default KickCommand;
