import { CommandContext } from '../../structures/addons/CommandAddons';
import { Command } from '../../structures/Command';
import { ApplicationCommandType, TextChannel } from 'discord.js';

class Verify extends Command {
    constructor() {
        super({
            trigger: 'verify',
            description: 'Verify yourself',
            blockinPublicChannels: false,
            type: ApplicationCommandType.ChatInput,
            module: 'unverified',
            args: []
        });
    }

    async run(ctx: CommandContext) {
        const verifiedRoleId = "1122215399136694392";
        const logChannelId = "1261641923999825950";
        const unverifiedRoleId = "1122215328940834836";
        const allowedChannelId = "1122215993758982317";

        if (ctx.interaction.channelId !== allowedChannelId) {
            return ctx.interaction.reply({ content: 'This command can only be used in <#'+ allowedChannelId +'>.', ephemeral: true });
        }

        try {
            const member = await ctx.interaction.guild.members.fetch(ctx.interaction.user.id);

            if (!member) {
                console.error('Member not found for ID:', ctx.interaction.user.id);
                return ctx.interaction.reply({ content: 'Member not found.', ephemeral: true });
            }

            if (member.roles.cache.has(verifiedRoleId)) {
                console.log('Member is already verified.');
                return ctx.interaction.reply({ content: 'You are already verified.', ephemeral: true });
            }

            await member.roles.add(verifiedRoleId);
            await member.roles.remove(unverifiedRoleId);

            const logChannel = await ctx.interaction.guild.channels.fetch(logChannelId) as TextChannel;

            if (!logChannel) {
                console.error('Log channel not found for ID:', logChannelId);
                return ctx.interaction.reply({ content: 'Log channel not found.', ephemeral: true });
            }

            await logChannel.send(`${member} verified using fruzzy`);

            console.log('Member verified successfully:', member.user.id);
            return ctx.interaction.reply({ content: 'You have been verified successfully.', ephemeral: true });
        } catch (error) {
            console.error('Failed to verify member:', error);
            return ctx.interaction.reply({ content: 'Failed to verify.', ephemeral: true });
        }
    }
}

export default Verify;
