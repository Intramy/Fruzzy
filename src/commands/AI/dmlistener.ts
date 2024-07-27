import { discordClient } from '../../main';
import { CommandContext } from '../../structures/addons/CommandAddons';
import { Command } from '../../structures/Command';
import { TextChannel, ChannelType, ApplicationCommandType, EmbedBuilder } from 'discord.js';

class DMListener extends Command {
    constructor() {
        super({
            trigger: 'dmlistener',
            description: 'Listens for DMs and reports them to a private channel',
            blockinPublicChannels: false,
            hidden: true,
            type: ApplicationCommandType.ChatInput,
            module: 'system',
            args: []
        });
    }

    async run(ctx: CommandContext) {
    }
}

discordClient.on('messageCreate', async (message) => {
    if (message.channel.type === ChannelType.DM && !message.author.bot) {
        const privateChannelId = '1261725444558946477';
        const privateChannel = await discordClient.channels.fetch(privateChannelId) as TextChannel;

        if (privateChannel) {
            const embed = new EmbedBuilder()
                .setTitle('New DM')
                .setDescription(`**${message.author.tag}** sent: ${message.content}`)
                .setColor('#ff0000')
                .setTimestamp();
        
            await privateChannel.send({ embeds: [embed] });
        }
        
        } else {
            console.error(`Private channel not found.`);
        }
    }
);

export default DMListener;
