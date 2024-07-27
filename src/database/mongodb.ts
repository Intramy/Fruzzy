import { DatabaseProvider } from '../structures/DatabaseProvider';
import { AttachmentBuilder, CategoryChannel, ChannelType, Client, Guild, GuildMember, OverwriteResolvable, OverwriteType, PermissionResolvable, PermissionsBitField, Role, TextChannel, User, UserResolvable, ApplicationCommandType, ApplicationCommandOptionType, CommandInteraction } from 'discord.js';
import { DatabaseClan, DatabaseCodes, DatabaseInventory, DatabaseLastBattle, DatabaseOption1, DatabaseReactionRoles, DatabaseRules, DatabaseServerSettings, DatabaseStaffInfo, DatabaseStaffInfoMANY, DatabaseTags, DatabaseTickets, DatabaseTwitch, DatabaseUpdateLog, DatabaseUser, DatabaseUserAuthData, DatabaseUserPoints, DatabaseUserRep, DatabaseUserSettings, DatabaseWarns, DatabaseXps, DatabaseXpsMANY } from '../structures/types';
import { Schema, connect, model } from 'mongoose';
import { config } from '../config';
import { forEach, invert } from 'lodash';
import { provider } from './router';
import { discordClient } from '../main';
import { channel } from 'diagnostics_channel';
require('dotenv').config();
import axios from 'axios';








class MongoDBProvider extends DatabaseProvider {
    constructor() {
        super();
        if (config.database.enabled) connect("-", {
            serverSelectionTimeoutMS: 30000,
        }).catch(console.error);
    }

   



}

export { MongoDBProvider };