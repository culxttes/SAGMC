"use strict";
import { Client } from '../../index.js'

export default{
    name: "look",
    description: "Bot look you",

    /**
     * 
     * @param {string[]} args 
     * @param {string} username 
     * @param {string} message 
     * @param {Client} client 
     */
    async execute(args, username, message, client) {
        let target = client.bot.players[username]?.entity
        if (!target) {
          bot.chat("/r I don't see you")
          return
        }
        client.bot.lookAt(target.position.offset(0, target.height, 0))
    }
}