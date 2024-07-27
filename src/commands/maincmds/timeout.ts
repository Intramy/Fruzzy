import { CommandContext } from '../../structures/addons/CommandAddons';
import { Command } from '../../structures/Command';
import { ApplicationCommandType, ApplicationCommandOptionType, GuildMember, TextChannel, ChannelType } from 'discord.js';
import { getNoPermissionEmbed } from '../../handlers/locale';
import { EmbedBuilder } from 'discord.js'; // Assuming EmbedBuilder is correctly imported

class TimeoutCommand extends Command {
    constructor() {
        super({
            trigger: 'timeout',
            description: 'Timeouts a user for a specified duration',
            blockinPublicChannels: false,
            type: ApplicationCommandType.ChatInput,
            module: 'Moderation',
            args: [
                {
                    trigger: 'user',
                    description: 'The user to timeout',
                    type: ApplicationCommandOptionType.User,
                    requiRed: true,
                },
                {
                    trigger: 'duration',
                    description: 'The duration of the timeout in seconds',
                    type: ApplicationCommandOptionType.Integer,
                    requiRed: true,
                },
                {
                    trigger: 'reason',
                    description: 'The reason for the timeout',
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

        const duration = ctx.args["duration"];
        const userOption = ctx.interaction.options.get('user', true);
        const reasonOption = ctx.interaction.options.get('reason');
        const user = userOption.user;
        const reason = reasonOption ? reasonOption.value as string : 'No reason specified';

        const targetMember = ctx.interaction.guild?.members.cache.get(user.id) as GuildMember;
        if (!targetMember) {
            return ctx.interaction.reply({ content: 'User not found in this server.', ephemeral: true });
        }

        try {
            await targetMember.timeout(duration, reason);
            
            const embed = new EmbedBuilder()
                .setTitle('User Timed Out')
                .setDescription(`${user.username} has been timed out by ${ctx.interaction.user.username} for ${duration} seconds.\nReason: ${reason}`)
                .setColor('#ff0000')
                .setTimestamp();

            await ctx.interaction.reply({ embeds: [embed] });
 
            // Logging to another channel
            const logChannelId = '1261641923999825950'; // Replace with your log channel ID
            const logChannel = await ctx.interaction.guild.channels.fetch(logChannelId) as TextChannel;

            if (logChannel) {
                const logContent = `${user.username} (${user.id}) has been timed out by ${ctx.interaction.user.username} for ${duration} seconds.\nReason: ${reason}`;
                logChannel.send(logContent);
            } else {
                console.error(`Log channel with ID ${logChannelId} not found.`);
            }

            await user.send(`You have been Timed out! Reason: ${reason}. Duration: ${duration} seconds. Muted by: ${ctx.interaction.user.username}.`);
        } catch (error) {
            console.error(error);
            ctx.interaction.reply({ content: 'An error occurred while timing out the user.', ephemeral: true });
        }
    }
}

export default TimeoutCommand;
