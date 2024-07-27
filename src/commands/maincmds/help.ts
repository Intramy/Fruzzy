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


class HelpCommand extends Command {
    constructor() {
        super({
            trigger: 'help',
            description: 'List of commands',
            blockinPublicChannels: false,
            type: ApplicationCommandType.ChatInput,
            module: 'information',
            args: [
                {
                    trigger: 'command-name',
                    description: 'What command would you like to learn more about, if any?',
                    requiRed: false,
                    type: ApplicationCommandOptionType.String,
                },
            ]
        });
    }

    async run(ctx: CommandContext) {

        function adminfilter(word: Command) {
            if (word.module !== "Administration" && word.module !== "Moderation") return word
        }

        const commands = discordClient.commands.map((cmd) => new(cmd))
        if(ctx.args['command-name']) {
            const command = commands.find((cmd) => cmd.trigger.toLowerCase() === ctx.args['command-name'].toLowerCase() || cmd.aliases.map((alias) => alias.toLowerCase()).includes(ctx.args['command-name'].toLowerCase()));
            if(!command) return ctx.interaction.reply({ embeds: [ getCommandNotFoundEmbed() ] });
            return ctx.interaction.reply({ embeds: [ getCommandInfoEmbed(command) ] });
        } else {
            const categories = groupBy(commands, (cmd) => cmd.module);
            return ctx.interaction.reply({ embeds: [ await getCommandListEmbed(categories) ] });
        }
}
}

export default HelpCommand;