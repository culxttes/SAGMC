"use strick";
import mineflayer from 'mineflayer';
import config from './Configuration/CreateBot.json' assert {type: 'json'};
import pkg from 'mineflayer-pathfinder';
const { pathfinder } = pkg;


export class Client{
    constructor(){
        this.config = config;
        this.bot = mineflayer.createBot({
            host: config.host,
            username: config.username,
            password: config.password,
            auth: config.auth
        })
        this.commands = new Map();
        this.bot.loadPlugin(pathfinder)
    }

    async execute (){
        (await import("./Handlers/Commands.js")).default(this);
        (await import("./Handlers/Events.js")).default(this);
    }
};
new Client().execute();