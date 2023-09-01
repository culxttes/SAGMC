"use strict";
import mineflayer from 'mineflayer';
import config from './Configuration/CreateBot.json' assert {type: 'json'};
import pkg from 'mineflayer-pathfinder';
import mysql from 'mysql2/promise'
const { pathfinder } = pkg;

process.setMaxListeners(0);

/**
 * Object representing the bot's client
 */
export class Client{
    /**
     * @param {mysql.Client} mysql
     */
    constructor(mysql){
        this.config = config;
        this.bot = mineflayer.createBot({
            version: config.version,
            host: config.host,
            username: config.username,
            password: config.password,
            auth: config.auth,
            checkTimeoutInterval: 100000,
            defaultChatPatterns: false,
            brand: "Imagine Perrier tu regardes le brand du client"
        });
        this.bot.loadPlugin(pathfinder);
        this.commands = new Map();
    }

    /**
     * Run the handlers
     */
    async execute (){
        (await import("./Handlers/Commands.js")).default(this);
        (await import("./Handlers/Events.js")).default(this);
        this.db = await mysql.createConnection(config.database);
    }
};
new Client().execute();