import { discordClient } from '../main';
import { CommandContext } from '../structures/addons/CommandAddons';
import {
    Interaction,
    CommandInteraction,
    CommandInteractionOption,
    AutocompleteInteraction,
    ChannelType,
    ChannelFlags,
    ChannelFlagsBitField,
    ApplicationCommandOptionChoiceData,
} from 'discord.js';
import { getUnknownCommandMessage, getNoPermissionEmbed } from '../handlers/locale';
import { provider } from '../database/router';

const handleInteraction = async (payload: Interaction) => {
    if(payload instanceof CommandInteraction) {
        const interaction = payload as CommandInteraction;
        let dm = false
        if(!interaction.channel || interaction.channel.isDMBased()) {
            interaction.reply("no in dms")
            dm = true
        }
        if(dm) return

        let blockedcmd = false

        if(blockedcmd) return

        const command = discordClient.commands.find((cmd) => (new cmd()).trigger === interaction.commandName);
        const context = new CommandContext(interaction, command);
        const permission = context.checkPermissions();
        if(!permission) {
            interaction.reply({ embeds: [ getNoPermissionEmbed() ] });
        } else if(!context.checkAllowanceCHANNELINTERACTION()) {
            interaction.reply(`**<@${context.interaction.user.id}> You cant use this command here cuz not allowed in public channels`)
        } else {
            try {
                /*setTimeout(() => {
                    if(!interaction.deferred) {
                        if(!interaction.replied){
                            interaction.deferReply()
                        }
                    }
                  }, 2000);*/
                (new command()).run(context);
            } catch (err) {
                console.log(err);
            }
        }
    } else if(payload instanceof AutocompleteInteraction) {
        const interaction = payload as AutocompleteInteraction;
        if(!interaction.channel || interaction.channel.isDMBased()) return;
        const focusedOption = payload.options.getFocused(true);
        const command = await discordClient.commands.find((cmd) => (new cmd()).trigger === interaction.commandName);
        if(!command) return;
    }
}

export { handleInteraction };