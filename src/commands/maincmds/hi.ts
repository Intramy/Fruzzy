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


class hicmd extends Command {
    constructor() {
        super({
            trigger: 'hi',
            description: 'Just hi',
            blockinPublicChannels: false,
            type: ApplicationCommandType.ChatInput,
            module: 'Maincmds',
            args: [
            ]
        });
    }

    async run(ctx: CommandContext) {

       ctx.interaction.reply("yoo")
}
}

export default hicmd;