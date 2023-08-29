"use strict";
import funcmcData from 'minecraft-data';
import pkg from 'mineflayer-pathfinder';
const { Movements, goals : { GoalNear } } = pkg;
import { Client } from '../../index.js'

export default{
    name: "come",
    description: "Move bot to your position",

    /**
     * 
     * @param {string[]} args 
     * @param {string} username 
     * @param {string} message 
     * @param {Client} client 
     */
    async execute(args, username, message, client) {
        const mcData = funcmcData(client.bot.version);
        const defaultMove = new Movements(client.bot, mcData)
        defaultMove.canOpenDoors = false;
        defaultMove.canDig = false;
        
        const target = client.bot.players[username]?.entity
        if (!target) {
            client.bot.chat("/r I don't see you")
            return
        }
        const { x: playerX, y: playerY, z: playerZ } = target.position
  
        client.bot.pathfinder.setMovements(defaultMove)
        client.bot.pathfinder.setGoal(new  GoalNear(playerX, playerY, playerZ, 0))
    }
}