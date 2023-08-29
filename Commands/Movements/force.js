"use strict";
import { Client } from '../../index.js'

export default{
    name: "force",
    description: "Force the bot to do something",

    /**
     * 
     * @param {string[]} args 
     * @param {string} username 
     * @param {string} message 
     * @param {Client} client 
     */
    async execute(args, username, message, client) {
        switch (args[0]) {
            case 'avance':
              client.bot.setControlState('forward', true)
              break
            case 'back':
              client.bot.setControlState('back', true)
              break
            case 'left':
              client.bot.setControlState('left', true)
              break
            case 'right':
              client.bot.setControlState('right', true)
              break
            case 'sprint':
              client.bot.setControlState('sprint', true)
              break
            case 'stop':
              client.bot.clearControlStates()
              break
            case 'jump':
              client.bot.setControlState('jump', true)
              client.bot.setControlState('jump', false)
              break
            case 'njump':
              client.bot.setControlState('jump', true)
              break
            case 'sneak':
              client.bot.setControlState('sneak', true)
             
            break
        }
    }
}