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


class vercmd extends Command {
    constructor() {
        super({
            trigger: 'version',
            description: 'Current version',
            blockinPublicChannels: false,
            type: ApplicationCommandType.ChatInput,
            module: 'information',
            args: [
            ]
        });
    }

    async run(ctx: CommandContext) {

       ctx.interaction.reply("Current Version of Fruzzy - `3.0`| Last update: 7/14/2024 | 4:37:50PM (GMD+3)")
}
}

export default vercmd;