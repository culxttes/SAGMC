"use strict";
import pkg from 'prismarine-chat';
import { statSync } from "fs";
import { datestring } from "../../Utils/datestring.js";
import { Client } from '../../index.js';
import { ScoreBoard } from 'mineflayer';

/**
 * Returns true if the bot is at the server hub, false otherwise.
 * @param {Client} client 
 * @param {ScoreBoard} scoreboard 
 * @returns 
 */
function is_in_hub(client, scoreboard) {
    const ChatMessage = pkg(client.bot.version);
    const item = new ChatMessage(scoreboard.items[1].name).toString();
    return item.includes("PROFIL");
}

export default{
    name: "spawn",
    once: false,

    /**
     * Emitted once after you log in and spawn for the first time and then 
     * emitted when you respawn after death.
     * @param {Client} client 
     */
    async execute(client) {
        await new Promise(resolve => client.bot.once('message', resolve))
        if (!is_in_hub(client, client.bot.scoreboard.sidebar)) {
            return;
        }
        console.log(' --- THE BOT IS IN THE SERVER HUB --- ');
        await new Promise(r => setTimeout(r, 30000));
        console.log(" --- TRYING CONNECT ON FREECUBE --- ");
        let success;
        do {
            await new Promise(resolve => {setTimeout(resolve, 10000)});
            const stats = statSync("./Utils/join.js");
            success = await (await import(`../../Utils/join.js#${stats.mtimeMs}`)).default(client, null, "FREECUBEA");
        } while (!success)
        await new Promise(r => setTimeout(r, 3000));
        client.bot.chat("/fc tp Culottes 1");
        console.log(`${datestring()} /fc tp Culottes 1`)
    }

}