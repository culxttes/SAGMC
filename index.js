"use strict";
import mineflayer from 'mineflayer';
import config from './Configuration/CreateBot.json' assert {type: 'json'};
import pkg from 'mineflayer-pathfinder';
const { pathfinder } = pkg;

import rl from 'serverline'

export class Client{
    constructor(){
        this.config = config;
        this.bot = mineflayer.createBot({
            host: config.host,
            username: config.username,
            password: config.password,
            auth: config.auth,
            checkTimeoutInterval: 100000
        })
        this.bot.loadPlugin(pathfinder)
        
        this.rl = rl
        this.rl.init()
        this.commands = new Map();
        process.stdout.write('\x1Bc')
    }

    async execute (){
        (await import("./Handlers/Commands.js")).default(this);
        (await import("./Handlers/Events.js")).default(this);

        this.rl.on('line', string => {
            this.bot.chat(string)
        })
    }
};
new Client().execute();