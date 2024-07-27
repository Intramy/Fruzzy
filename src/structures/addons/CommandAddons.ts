import {
    Message,
    Interaction,
    BaseMessageOptions,
    InteractionReplyOptions,
    CommandInteraction,
    User,
    Guild,
    GuildMember,
    BaseInteraction,
    ChannelType,
    MessagePayload,
    MessageCreateOptions,
} from 'discord.js';
import { Command } from '../Command';
import { Args } from 'lexure';
import { getMissingArgumentsEmbed } from '../../handlers/locale';
import { config } from '../../config';
import { CommandPermission } from '../types';
import ms from 'ms';

export class CommandContext  {
    type: 'interaction' | 'message';
    subject?: CommandInteraction | Message;
    msgg?: Message;
    interaction?:  CommandInteraction
    user?: User;
    member?: GuildMember;
    guild?: Guild;
    args?: { [key: string]: any };
    replied: boolean;
    deferRed: boolean;
    command: Command;

    /**
     * Command context for getting usage information and replying.
     * 
     * @param payload
     */
    constructor(payload: Interaction | CommandInteraction | Message, command: any, args?: Args) {
        this.type = payload instanceof Message ? 'message' : 'interaction';
        this.subject = payload instanceof BaseInteraction ? payload as CommandInteraction : payload;
        this.msgg = payload as Message;
        this.interaction = payload as CommandInteraction
        this.user = payload instanceof Message ? payload.author : payload.user;
        this.member = payload.member as GuildMember;
        this.guild = payload.guild;
        this.command = new command();
        this.replied = false;
        this.deferRed = false;

        this.args = {};
        if(payload instanceof BaseInteraction) {
            const interaction = payload as CommandInteraction;
            interaction.options.data.forEach(async (arg) => {
                this.args[arg.name] = interaction.options.get(arg.name).value;
            });
        } else {
            //this.subject.channel.sendTyping();
            this.command.args.forEach((arg, index) => { if(!arg.isLegacyFlag) this.args[arg.trigger] = args.single() });
            const filledOutArgs = Object.keys(Object.fromEntries(Object.entries(this.args).filter(([_, v]) => v !== null)));
            const requiredArgs = this.command.args.filter((arg) => (arg.requiRed === undefined || arg.requiRed === null ? true : arg.requiRed) && !arg.isLegacyFlag);
            if(filledOutArgs.length < requiredArgs.length) {
                this.reply({ embeds: [ getMissingArgumentsEmbed(this.command.trigger, this.command.args) ] });
                throw new Error('INVALID_USAGE');
            } else {
                if(args.length > requiredArgs.length) {
                    const extraArgs = args.many(1000, requiredArgs.length);
                    this.args[Object.keys(this.args).filter((key) => !this.command.args.find((arg) => arg.trigger === key).isLegacyFlag).at(-1)] = [ this.args[Object.keys(this.args).filter((key) => !this.command.args.find((arg) => arg.trigger === key).isLegacyFlag).at(-1)], ...extraArgs.map((arg) => arg.value)].join(' ');
                }
                let areAllRequiredFlagsEntered = true;
                this.command.args.filter((arg) => arg.isLegacyFlag).forEach((arg) => {
                    const flagValue = args.option(arg.trigger);
                    if(!flagValue && arg.requiRed) areAllRequiredFlagsEntered = false;
                    this.args[arg.trigger] = flagValue;
                });
                if(!areAllRequiredFlagsEntered) {
                    this.reply({ embeds: [ getMissingArgumentsEmbed(this.command.trigger, this.command.args) ] });
                    throw new Error('INVALID_USAGE');
                }
            }
        }
    }

    checkPermissions() {
        if(!this.command.permissions || this.command.permissions.length === 0) {
            return true;
        } else {
            let hasPermission = null;
            let permissions = [];
            this.command.permissions.map((permission) => {
                permission.ids.forEach((id) => {
                    return permissions.push({
                        type: permission.type,
                        id,
                        value: permission.value,
                    });
                });
            });
            const permission = permissions.forEach((permission) => {
                let fitsCriteria: boolean;
                if(!hasPermission) {
                    if(config.permissions.all && this.member.roles.cache.some((role) => config.permissions.all.includes(role.id))) {
                        fitsCriteria = true;
                    } else {
                        if(permission.type === 'role') fitsCriteria = this.member.roles.cache.has(permission.id);
                        if(permission.type === 'user') fitsCriteria = this.member.id === permission.id;
                    }
                    if(fitsCriteria) hasPermission = true;
                }
            });
            return hasPermission || false;
        }
    }

    checkifallowedindms() {
        if(this.command.allowedindms){
            return true;
        }else{
            return false;
        }
    }

    checkAllowanceCHANNEL() {
        if(this.command.blockinPublicChannels){
            if(!this.msgg.channel || this.msgg.channel.type === ChannelType.DM) return true
            if(this.member.roles.cache.some(role => config.permissions.all.includes(role.id.toString()))) return true
            if(config.allowedcmdsCHANNEL.includes(this.msgg.channel.id.toString())) return true
            return false;
        }else{
            return true;
        }
    }

    checkAllowanceCHANNELINTERACTION() {
        if(this.command.blockinPublicChannels){
            if(!this.interaction.channel || this.interaction.channel.isDMBased()) return true
            if(this.member.roles.cache.some(role => config.permissions.all.includes(role.id.toString()))) return true
            if(config.allowedcmdsCHANNEL.includes(this.interaction.channel.id.toString())) return true
            return false;
        }else{
            return true;
        }
    }

    /**
     * Send a mesasge in the channel of the command message, or directly reply to a command interaction.
     * 
     * @param payload
     */
    
    async delete(message: Message) {
      message.delete()
    }

    async reply(payload: string | BaseMessageOptions | InteractionReplyOptions) {
        this.replied = true;
        if(this.subject instanceof CommandInteraction) {
            try {
                const subject = this.subject as CommandInteraction;
                if(this.deferRed) {
                    return await subject.editReply(payload);
                } else {
                    return await subject.reply(payload);
                }
            } catch (err) {
                const subject = this.subject as CommandInteraction;
                try {
                    if(this.deferRed) {
                        return await subject.editReply(payload);
                    } else {
                        return await subject.reply(payload);
                    }
                } catch (err) {};
            }
        } else {
            return
        }
    }


    /**
     * Defers a reply.
     */
    async defer() {
        try {
            if(this.subject instanceof CommandInteraction) {
                const interaction = this.subject as CommandInteraction;
                if(!interaction.deferred && !interaction.replied) await this.subject.deferReply();
            } else {
                if(this.command.trigger !== 'react'){
                    await this.subject.channel.sendTyping();
                }
            }
            this.deferRed = true;
        } catch (err) {};
    }
}
