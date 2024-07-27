import { CommandContext } from '../../structures/addons/CommandAddons';
import { Command } from '../../structures/Command';
import { ApplicationCommandType, ApplicationCommandOptionType, GuildMember, EmbedBuilder, TextChannel } from 'discord.js';
import { getNoPermissionEmbed } from '../../handlers/locale';

class BanCommand extends Command {
    constructor() {
        super({
            trigger: 'ban',
            description: 'Bans a user from the server',
            blockinPublicChannels: false,
            type: ApplicationCommandType.ChatInput,
            module: 'Moderation',
            args: [
                {
                    trigger: 'user',
                    description: 'The user to ban',
                    type: ApplicationCommandOptionType.User,
                    requiRed: true,
                },
                {
                    trigger: 'reason',
                    description: 'The reason for the ban',
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

        const rolesAllowed = [
            "1049345883826831390",
            "1051514787886018631"
        ];
        const idsAllowed = [
            "726423224908251178",
            "541209992888320020"
        ];

        if (rolesAllowed.some(role => member.roles.cache.has(role)) || idsAllowed.includes(member.id)) {
            allowedToRunCommand = true;
        }

        if (!allowedToRunCommand) {
            return ctx.interaction.reply({ embeds: [getNoPermissionEmbed()] });
        }

        const userOption = ctx.interaction.options.get('user', true);
        const reasonOption = ctx.interaction.options.get('reason');
        const user = userOption.user;
        const reason = reasonOption ? reasonOption.value as string : 'No reason specified';

        const targetMember = ctx.interaction.guild.members.cache.get(user.id) as GuildMember;
        if (!targetMember) {
            return ctx.interaction.reply('User not found in this server.');
        }

        try {
            await targetMember.ban({ reason });
            
            const embed = new EmbedBuilder()
                .setTitle('User banned')
                .setDescription(`${user.username} has been **BANNED** by ${ctx.interaction.user.username} for: ${reason}`)
                .setColor('#ff0000')
                .setTimestamp();
            await ctx.interaction.reply({ embeds: [embed] });

            // Logging to another channel
            const logChannelId = '1261641923999825950'; // Replace with your log channel ID
            const logChannel = await ctx.interaction.guild.channels.fetch(logChannelId) as TextChannel;

            if (logChannel) {
                const logContent = `${user.username} (${user.id}) has been banned by ${ctx.interaction.user.username} for: ${reason}`;
                logChannel.send(logContent);
            } else {
                console.error(`Log channel with ID ${logChannelId} not found.`);
            }

            await user.send(`You have been **BANNED**! Reason: ${reason}.Banned by: ${ctx.interaction.user.username}.`);

        } catch (error) {
            console.error(error);
            ctx.interaction.reply('An error occurred while banning the user.');
        }
    }
}

export default BanCommand;
 