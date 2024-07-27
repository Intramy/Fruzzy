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
import { ApplicationCommandType, ApplicationCommandOptionType} from 'discord.js';




class dm extends Command {
    constructor() {
        super({
            trigger: 'dm',
            description: 'dm someone',
            blockinPublicChannels: false,
            type: ApplicationCommandType.ChatInput,
            module: 'Maincmds',
            args: [
                {
                    trigger: 'user',
                    description: 'The user to send a message to',
                    type: ApplicationCommandOptionType.User,
                    requiRed: true,
                },
                {
                    trigger: 'message',
                    description: 'The message to send',
                    type: ApplicationCommandOptionType.String,
                    requiRed: true,
                },
            ],
        });
    }

    async run(ctx: CommandContext) { 

        const allowedUsers = ["726423224908251178", "782975543166631946"];
    
        const member = await ctx.interaction.guild.members.fetch(ctx.interaction.user.id);
        
        if (!member || !allowedUsers.includes(member.id)) {
            return ctx.interaction.reply({ embeds: [getNoPermissionEmbed()], ephemeral: true });
        }
    
        const user = ctx.interaction.options.get('user')?.user;
        const message = ctx.interaction.options.get('message')?.value as string;
    
        if (!user) {
            return ctx.interaction.reply({ content: 'User not found.', ephemeral: true });
        }
    
        try {
            await user.send(message);
            return ctx.interaction.reply({ content: 'Message sent successfully.', ephemeral: true });
        } catch (error) {
            console.error('Failed to send DM:', error);
            return ctx.interaction.reply({ content: 'Failed to send message.', ephemeral: true });
        }
    }
    
    
}

export default dm;