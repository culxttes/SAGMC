"use strict";
import { Client } from "../../index.js";

export default{
    name: "error",
    once: false,

    /**
     * Emitted when an error occurs.
     * @param {Error} err 
     * @param {Client} client 
     */
    async execute(err, client) {
        console.log("Error BOT: ", err)
    }
}