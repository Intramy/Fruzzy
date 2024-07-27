import { discordClient } from '../../main';
import { CommandContext } from '../../structures/addons/CommandAddons';
import { Command } from '../../structures/Command';
import { ApplicationCommandType } from 'discord.js';

class PingCommand extends Command {
  constructor() {
    super({
      trigger: 'ping',
      description: 'Shows the bot\'s ping',
      blockinPublicChannels: false,
      type: ApplicationCommandType.ChatInput,
      module: 'information',
      args: []
    });
  }

  async run(ctx: CommandContext) {
    ctx.interaction.reply(`Bot ping: ${discordClient.ws.ping}ms`);
  }
}

export default PingCommand;