"use strict";
import { Client } from '../../index.js'

export default{
    name: "reload",
    description: "Reloads commands and detects new ones",

    /**
     * @param {string[]} args 
     * @param {string} username 
     * @param {string} message 
     * @param {Client} client 
     */
    async execute(args, username, message, client) {
        (await import("../../Handlers/Commands.js")).default(client);
    }
}