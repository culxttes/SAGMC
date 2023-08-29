"use strict";
import { statSync } from "fs";
import { datestring } from "../../Utils/datestring.js";
import { Client } from '../../index.js'

export default{
    name: "join",
    description: "Join a mini-games",

    /**
     * 
     * @param {string[]} args 
     * @param {string} username 
     * @param {string} message 
     * @param {Client} client 
     */
    async execute(args, username, message, client) {
        client.bot.chat("/hub")
        console.log(`${datestring()} /hub`)

        const game_name = (args[0] || "freecubeA").toUpperCase()
        await new Promise(r => setTimeout(r, 1000));
        const stats = statSync("./Utils/join.js");
        (await import(`../../Utils/join.js#${stats.mtimeMs}`)).default(client, username, game_name)
    }
}