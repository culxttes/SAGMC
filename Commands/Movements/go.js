import pkg from 'mineflayer-pathfinder';
const { Movements, goals : { GoalNear } } = pkg;

import funcmcData from 'minecraft-data';

export default{
    name: "go",
    description: "Move bot to coordonate give",

    async execute(args, username, message, client) {
        const mcData = funcmcData(client.bot.version);
        const defaultMove = new Movements(client.bot, mcData)
        client.bot.pathfinder.setMovements(defaultMove)
        client.bot.pathfinder.setGoal(new  GoalNear(args[0], args[1], args[2], 0))
    }
}