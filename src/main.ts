import { WihusClient } from './structures/WihusClient';
import { handleInteraction } from './handlers/handleInteraction';
import { handleLegacyCommand } from './handlers/handleLegacyCommand';
import DisTube = require('distube');
require('dotenv').config();
require('./database/router');
require('./api');

// [Clients]
const discordClient = new WihusClient();
const distubeClient = new DisTube(discordClient, { leaveOnStop: false });
discordClient.login("MTA4MDU4NjIxNjMxMjkzMDMxNA.GY4F6e.04L5TmdFUN0YrsbOWHjQtTwLC5TzL6auffaaSg");

// [Handlers]
discordClient.on('interactionCreate', handleInteraction);
discordClient.on('messageCreate', handleLegacyCommand);

// [Module]
export { discordClient, distubeClient };
