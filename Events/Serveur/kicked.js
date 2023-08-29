"use strict";
import { Client } from "../../index.js";

export default{
    name: "kicked",
    once: false,

    /**
     * Emitted when the bot is kicked from the server. reason is a chat message 
     * explaining why you were kicked. loggedIn is true if the client was kicked 
     * after successfully logging in, or false if the kick occurred in the login 
     * phase.
     * @param {string} reason 
     * @param {boolean} loggedIn 
     * @param {Client} client 
     */
    async execute(reason, loggedIn, client) {
        console.log("Kicked: ", reason)
    }
}