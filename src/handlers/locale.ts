import { chatInputApplicationCommandMention, EmbedBuilder} from 'discord.js';
import { CommandArgument, DatabaseUser } from '../structures/types';
import { config } from '../config';
import { User as DiscordUser, ApplicationCommandType, ApplicationCommandOptionType} from 'discord.js';
import { Command } from '../structures/Command';
import { textSync } from 'figlet';
import { map } from 'lodash';
import { userInfo } from 'os';
import { info } from 'console';
import { discordClient } from '../main';

export const checkIconUrl = 'https://media.discordapp.net/attachments/1073953510112116757/1074087150838095952/troll_war.png?width=630&height=324';
export const xmarkIconUrl = 'https://media.discordapp.net/attachments/1073953510112116757/1074087150838095952/troll_war.png?width=630&height=324';
export const infoIconUrl = 'https://media.discordapp.net/attachments/1073953510112116757/1074087150838095952/troll_war.png?width=630&height=324';
export const quoteIconUrl = 'https://cdn.lengolabs.com/qbot-icons/quote.png';

export const mainColor = 'DarkRed';
export const mainColorMaintenance = '#0f878c'
export const GreenColor = '#50C790';
export const RedColor = '#FA5757';

export const consoleMagenta = '\x1b[35m';
export const consoleGreen = '\x1b[32m';
export const consoleYellow = '\x1b[33m';
export const consoleRed = '\x1b[31m';
export const consoleClear = '\x1b[0m';
export const shouti = 'https://media.discordapp.net/attachments/895808210341085244/930759170876121088/1641980648418.png'

export const qbotLaunchTextDisplay = `${consoleMagenta}${textSync('Among Us')}`;
export const welcomeText = `${consoleYellow}Fruzzy bot 😎 (wait for load message)`;
export const startedText = `\n${consoleGreen}✓  ${consoleClear}Bot has been started (wait for online message).`;
export const securityText = `\n${consoleRed}⚠  ${consoleClear}URGENT: For security reasons, public bot must be DISABLED for the bot to start. For more information, please refer to this section of our documentation: https://docs.lengolabs.com/qbot/setup/replit-guide#discord`;

export const noFiRedRankLog = `Uh oh, you do not have a fiRed rank with the rank specified in your configuration file.`;
export const noSuspendedRankLog = `Uh oh, you do not have a suspended rank with the rank specified in your configuration file.`;
export const getListeningText = (port) => `${consoleGreen}✓  ${consoleClear}Listening on port ${port}.`;




export const getUnknownCommandMessage = (): EmbedBuilder => {
    const embed = new EmbedBuilder()
        .setAuthor({ name: 'Command Unavailable', iconURL: xmarkIconUrl })
        .setColor(RedColor)
        .setDescription('This command dosent exist 😕');

    return embed;
}

export const getMissingArgumentsEmbed = (cmdName: string, args: CommandArgument[]): EmbedBuilder => {
    let argString = '';
    args.forEach((arg) => {
        if (arg.isLegacyFlag) {
            argString += arg.requiRed || true ? `--<${arg.trigger}> ` : `--[${arg.trigger}] `;
        } else {
            argString += arg.requiRed || true ? `<${arg.trigger}> ` : `[${arg.trigger}] `;
        }
    });
    argString = argString.substring(0, argString.length - 1);

    const embed = new EmbedBuilder()
        .setAuthor({ name: 'Неправильное использование команды', iconURL: xmarkIconUrl })
        .setColor(RedColor)
        .setDescription(`Использование команды: \`${config.legacyCommands.prefixes[0]}${cmdName} ${argString}\``)

    return embed;
}


export const getUnexpectedErrorEmbed = (err?): EmbedBuilder => {
    let errormsg = ''
    if (err) {
        errormsg = err
    } else {
        errormsg = 'Неизвестная ошибка'
    }
    const embed = new EmbedBuilder()
        .setAuthor({ name: 'Ошибка', iconURL: xmarkIconUrl })
        .setColor(RedColor)
        .setDescription("Error in code 💀\n```" + errormsg + "```")

    return embed;
}



export const getnotime = (): EmbedBuilder => {
    const embed = new EmbedBuilder()
        .setAuthor({ name: 'Неверное время', iconURL: xmarkIconUrl })
        .setColor(RedColor)
        .setDescription(`Пример правильного формата:\n1m - 1 минута, 1h - 1 час, 1d - 1 день, 1w - 1 неделя (изменяйте цифры)`);

    return embed;
}

export const getnotreaction = (): EmbedBuilder => {
    const embed = new EmbedBuilder()
        .setAuthor({ name: 'ncorrect Reaction', iconURL: xmarkIconUrl })
        .setColor(RedColor)
        .setDescription(`Not reaction or script error 🙄`);

    return embed;
}

export const getnotuser = (): EmbedBuilder => {
    const embed = new EmbedBuilder()
        .setAuthor({ name: 'Ошибка', iconURL: xmarkIconUrl })
        .setColor(RedColor)
        .setTitle('You did something wrong')
        .setDescription('- Incorrect user (you need to ping or use id\n- If its timed action you may put wrong time\n \n- If everything correct it may be a script error (tell <@726423224908251178>)');

    return embed;
}


export const getdmsblocked = (): EmbedBuilder => {
    const embed = new EmbedBuilder()
        .setAuthor({ name: 'Error', iconURL: xmarkIconUrl })
        .setColor(RedColor)
        .setTitle('Blocked dms or bot code error')
        .setDescription('User disabled dms or its just a code error (or u dmming bot)');

    return embed;
}




export const getNoPermissionEmbed = (): EmbedBuilder => {
    const embed = new EmbedBuilder()
        .setAuthor({ name: 'You cant', iconURL: xmarkIconUrl })
        .setColor(RedColor)
        .setDescription('You dont have permission to use dat command 👆');

    return embed;
}

export const getCommandInfoEmbed = (command: Command): EmbedBuilder => {
    let argString = '';
    command.args.forEach((arg) => {
        argString += arg.requiRed || true ? `<${arg.trigger}> ` : `[${arg.trigger}] `;
    });
    argString = argString.substring(0, argString.length - 1);

    let aliString = '';
    command.aliases.forEach((arg) => {
        aliString += `${arg}, `;
    });
    aliString = aliString.substring(0, aliString.length - 2);

    const embed = new EmbedBuilder()
        .setAuthor({ name: "Information about command", iconURL: infoIconUrl })
        .setTitle(command.trigger)
        .setColor(mainColor)
        .setDescription(command.description)
        .addFields(
            { name: 'Module', value: command.module, inline: true },
            { name: 'Usage', value: `\`${argString}\``, inline: true },
            { name: 'Aliases', value: aliString ? `\`${aliString}\`` : "No aliases", inline: true }
        )

    return embed;
}

export const getCommandNotFoundEmbed = (): EmbedBuilder => {
    const embed = new EmbedBuilder()
        .setAuthor({name: "No team found", iconURL: xmarkIconUrl})
        .setColor("Red")
        .setDescription('A command could not be found. Please get smarter');

    return embed;
}


export const getCommandListEmbed = async (modules: { [key: string]: Command[] }): Promise<EmbedBuilder> => {

    function lenghtfilter(word: string) {
        if (word) return word
    }

    const embed = new EmbedBuilder()
        .setAuthor({ name: "List of commands", iconURL: infoIconUrl })
        .setColor("DarkRed")
        .setDescription("List of commands")

        
        await discordClient.application.commands.fetch()

    Object.keys(modules).forEach((key) => {
        const moduleCommands = modules[key];
        const mappedCommands = moduleCommands.map((cmd) => cmd.hidden ? null : `${chatInputApplicationCommandMention(cmd.trigger, discordClient.application.commands.cache.find(command => command.name === cmd.trigger).id)} - ${cmd.description}`).filter(lenghtfilter)
        if (key.replace('-', ' ').split(' ').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') === "Hidden") return
        if (key.replace('-', ' ').split(' ').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') === "Development") return
        if (key.replace('-', ' ').split(' ').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') === "UserCommands") return
        embed.addFields(
            { name: key.replace('-', ' ').split(' ').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' '), value: mappedCommands.join('\n') }
        );
    });

    return embed;
}

export const getADMINCommandListEmbed = (modules: { [key: string]: Command[] }): EmbedBuilder => {

    function lenghtfilter(word: string) {
        if (word) return word
    }

    const embed = new EmbedBuilder()
        .setAuthor({ name: "Админ Команды", iconURL: infoIconUrl })
        .setColor("DarkPurple")
        .setDescription("Список Команд")

    Object.keys(modules).forEach((key) => {
        const moduleCommands = modules[key];
        const mappedCommands = moduleCommands.map((cmd) => cmd.hidden ? null : `\`${cmd.trigger}\` - ${cmd.description}`).filter(lenghtfilter)
        embed.addFields(
            { name: key.replace('-', ' ').split(' ').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' '), value: mappedCommands.join('\n') }
        );
    });

    return embed;
}

export const getMODCommandListEmbed = (modules: { [key: string]: Command[] }): EmbedBuilder => {

    function lenghtfilter(word: string) {
        if (word) return word
    }

    const embed = new EmbedBuilder()
        .setAuthor({ name: "Мод Команды", iconURL: infoIconUrl })
        .setColor("#E13908")
        .setDescription("Список Команд")

    Object.keys(modules).forEach((key) => {
        const moduleCommands = modules[key];
        const mappedCommands = moduleCommands.map((cmd) => cmd.hidden ? null : `\`${cmd.trigger}\` - ${cmd.description}`).filter(lenghtfilter)
        embed.addFields(
            { name: key.replace('-', ' ').split(' ').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' '), value: mappedCommands.join('\n') }
        );
    });

    

    return embed;
}

export const getTICKETSCommandListEmbed = (modules: { [key: string]: Command[] }): EmbedBuilder => {

    function lenghtfilter(word: string) {
        if (word) return word
    }

    const embed = new EmbedBuilder()
        .setAuthor({ name: "Тикет Команды", iconURL: infoIconUrl })
        .setColor("Green")
        .setDescription("Список Команд")

    Object.keys(modules).forEach((key) => {
        const moduleCommands = modules[key];
        const mappedCommands = moduleCommands.map((cmd) => cmd.hidden ? null : `\`${cmd.trigger}\` - ${cmd.description}`).filter(lenghtfilter)
        embed.addFields(
            { name: key.replace('-', ' ').split(' ').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' '), value: mappedCommands.join('\n') }
        );
    });

    

    return embed;
}

export const getHELPERCommandListEmbed = async (modules: { [key: string]: Command[] }): Promise<EmbedBuilder> => {

    function lenghtfilter(word: string) {
        if (word) return word
    }

    const embed = new EmbedBuilder()
        .setAuthor({ name: "Команды Хелперов", iconURL: infoIconUrl })
        .setColor("Gold")
        .setDescription("Список Команд")

        await discordClient.application.commands.fetch()

    Object.keys(modules).forEach((key) => {
        const moduleCommands = modules[key];
        const mappedCommands = moduleCommands.map((cmd) => cmd.hidden ? null : `${chatInputApplicationCommandMention(cmd.trigger, discordClient.application.commands.cache.find(command => command.name === cmd.trigger).id)} - ${cmd.description}`).filter(lenghtfilter)
        embed.addFields(
            { name: key.replace('-', ' ').split(' ').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' '), value: mappedCommands.join('\n') }
        );
    });

    

    return embed;
}

export const getTAGSCommandListEmbed = (modules: { [key: string]: Command[] }): EmbedBuilder => {

    function lenghtfilter(word: string) {
        if (word) return word
    }

    const embed = new EmbedBuilder()
        .setAuthor({ name: "Команды Тегов", iconURL: infoIconUrl })
        .setColor("DarkBlue")
        .setDescription("Список Команд")

    Object.keys(modules).forEach((key) => {
        const moduleCommands = modules[key];
        const mappedCommands = moduleCommands.map((cmd) => cmd.hidden ? null : `\`${cmd.trigger}\` - ${cmd.description}`).filter(lenghtfilter)
        embed.addFields(
            { name: key.replace('-', ' ').split(' ').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' '), value: mappedCommands.join('\n') }
        );
    });

    

    return embed;
}