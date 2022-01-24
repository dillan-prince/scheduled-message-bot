import { Client } from 'discord.js';

import { Keys } from './config/index.js';
import { onMessage } from './listeners/index.js';

const keys = await Keys();

process.on('unhandledRejection', (error) => {
    return console.error('Uncaught Promise Rejection:', error.toString());
});

const client = new Client();

client.once('ready', () => {
    console.log('<----- SMBot listening. ----->');
});

client.on('message', onMessage);

client.login(keys.DISCORD_TOKEN);
