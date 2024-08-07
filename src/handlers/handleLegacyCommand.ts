import {
    ChannelType,
    Message,
} from 'discord.js';
import { discordClient } from '../main';
import { config } from '../config';
import { CommandContext } from '../structures/addons/CommandAddons';
import { Lexer, Parser, Args, prefixedStrategy } from 'lexure';
import { Command } from '../structures/Command';
import { getUnknownCommandMessage, getNoPermissionEmbed } from '../handlers/locale';

const parseCommand = (s: string): [string, Args] | null => {
    const lexer = new Lexer(s).setQuotes([ ['"', '"'], ['“', '”'] ]);
    const lout = lexer.lexCommand(s => config.legacyCommands.prefixes.some((prefix) => s.startsWith(prefix)) ? 1 : null);
    if(!lout) return null;

    const [command, getTokens] = lout;
    const tokens = getTokens();
    const parser = new Parser(tokens).setUnorderedStrategy(prefixedStrategy(
        [],
        [],
    ));

    const pout = parser.parse();
    return [command.value, new Args(pout)];
}

const handleLegacyCommand = async (message: Message) => {
    
    if(!message.channel || message.channel.type === ChannelType.DM) return;
    const out = parseCommand(message.content);
    if(!out) return;
    const commandQuery = out[0] || null;
    const args = out[1] || null;

    const commandName = commandQuery.replace(/[^a-zA-Z0-9]/, '').replace('-', '');
    const command = discordClient.commands.find((cmd) => (new cmd()).trigger === commandName || (new cmd()).aliases.includes(commandName));
    if(commandName === "react") {
        if(!command) return;

    try {
        const context = new CommandContext(message, command, args);
        if(!context.checkPermissions()) {
            context.msgg.channel.send({ embeds: [ getNoPermissionEmbed() ] });
        } else if(!context.checkAllowanceCHANNEL()) {
            context.msgg.channel.send(`**<@${context.msgg.author.id}> Вы не можете использовать эту команду здесь, используйте канал "бот команды" или "спам"**`)
        } else {
            await context.defer();
            try {
                (new command()).run(context);
            } catch (err) {
                console.error(err);
            }
        }
    } catch (err) {
        return;
    }
    }
    
}

export { handleLegacyCommand };