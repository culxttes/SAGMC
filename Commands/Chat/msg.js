"use strict";
import { Client } from "../../index.js";

export default{
    name: "msg",
    description: "The bot will send the message passed in parameter",

    /**
     * @param {string[]} args 
     * @param {string} username 
     * @param {string} message 
     * @param {Client} client 
     */
    async execute(args, username, message, client) {
        client.bot.chat(args.join(" "));
    }
}