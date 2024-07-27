import express, { response } from 'express';
import { config } from './config';
import { provider } from './database/router';
import { discordClient } from './main';
import ms from 'ms';
import { TextChange } from 'typescript';
import { EmbedBuilder, TextChannel, ApplicationCommandType, ApplicationCommandOptionType, Embed } from 'discord.js';
import { mainColor } from './handlers/locale';
import fs from 'fs';
const app = express();
require('dotenv').config();
import https from 'https'


let signals = [];




app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});
app.use(express.json());

app.get('/', (req, res) => {
    res.sendStatus(200);
    res.writeHead(200)
});

const generateSignalId = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 7; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    if (signals.find((signal) => signal.id === result)) return generateSignalId();
    return result;
}

const addSignal = (signal) => {
    signals.push({
        id: generateSignalId(),
        signal,
    });
}

if (config.api) {
    app.use((req, res, next) => {
        if (!req.headers.authorization || req.headers.authorization !== "wihusapicool") return res.send({ success: false, msg: 'Unauthorized' });
        next();
    });

    
}



app.listen(3001, () => {
    console.log("Fruzzy is runing at port 3001 | Local Machine");
})


export { addSignal };
