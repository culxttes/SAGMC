"use strict";
import { Client } from '../../index.js'

export default{
    name: "end",
    once: false,

    /**
     * Emitted when you are no longer connected to the server. reason is a 
     * string explaining why the client was disconnected. 
     * (defaults to 'socketClosed')
     * @param {String} reason 
     * @param {Client} client 
     */
    async execute(reason, client) {
        console.log("END: ", reason)
        await new Promise(resolve => setTimeout(resolve, 10000));
        client.bot.removeAllListeners();
        client.db.close();
        new Client().execute();
    }
}