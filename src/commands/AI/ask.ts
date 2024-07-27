import { discordClient } from '../../main';
import { CommandContext } from '../../structures/addons/CommandAddons';
import { Command } from '../../structures/Command';
import { groupBy } from 'lodash';
import {
    getCommandInfoEmbed,
    getCommandListEmbed,
    getCommandNotFoundEmbed,
} from '../../handlers/locale';
import { ApplicationCommandType, ApplicationCommandOptionType} from 'discord.js';


class Ask extends Command {
    constructor() {
        super({
            trigger: 'ask',
            description: 'Ask AI (not availiable)',
            blockinPublicChannels: false,
            type: ApplicationCommandType.ChatInput,
            module: 'AI',
            args: [
            ]
        });
    }

    async run(ctx: CommandContext) {

       ctx.interaction.reply("⚠️AI not availiable at this time.")
}
}

export default Ask;