"use strict";
import mineflayer from 'mineflayer';
import config from './Configuration/CreateBot.json' assert {type: 'json'};
import pkg from 'mineflayer-pathfinder';
import mysql from 'mysql2/promise'
const { pathfinder } = pkg;

import rl from 'serverline'

process.setMaxListeners(0);

export class Client{
    constructor(mysql){
        this.config = config;
        this.bot = mineflayer.createBot({
            version: config.version,
            host: config.host,
            username: config.username,
            password: config.password,
            auth: config.auth,
            checkTimeoutInterval: 100000,
            defaultChatPatterns: false
        });
        this.bot.loadPlugin(pathfinder);
        
        this.rl = rl;
        this.rl.init();
        this.commands = new Map();
        process.stdout.write('\x1Bc');
        this.db = mysql;
    }

    async execute (){
        (await import("./Handlers/Commands.js")).default(this);
        (await import("./Handlers/Events.js")).default(this);

        this.rl.on('line', string => {
            this.bot.chat(string)
        })
    }
};
const connection = await mysql.createConnection(config.database);
new Client(connection).execute();