import { discordClient } from '../../main';
import { CommandContext } from '../../structures/addons/CommandAddons';
import { Command } from '../../structures/Command';
import { groupBy } from 'lodash';
import {
    getCommandInfoEmbed,
    getCommandListEmbed,
    getCommandNotFoundEmbed,
} from '../../handlers/locale';
import { ApplicationCommandType, ApplicationCommandOptionType } from 'discord.js';


class credits extends Command {
    constructor() {
        super({
            trigger: 'credits',
            description: 'Credits, what could it be?',
            blockinPublicChannels: false,
            type: ApplicationCommandType.ChatInput,
            module: 'information',
            args: [
            ]
        });
    }

    async run(ctx: CommandContext) {

        let sasha = await discordClient.users.fetch("541209992888320020")
        let intramy = await discordClient.users.fetch("726423224908251178")

        ctx.interaction.reply(intramy.tag +" (fucking up scripts but repairing, other scripts)```")
    }
}

export default credits;