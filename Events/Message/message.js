import { datestring } from "../../Fonctions/datestring.js";
import { Client } from "../../index.js"

export default {
    name: "message",
    once: false,
    /**
    * 
    * @param {Client} client
    */
    async execute(message, position , client) {
        console.log(datestring() + " " +message.toAnsi())
        if (message.toString().startsWith("Erreur:")){
            client.bot.emit("message_error", message);
        }
        if (message.toString().startsWith("[File d'attente] Vous rejoignez ")){
            client.bot.emit('join_mod', (message.toString().slice(("[File d'attente] Vous rejoignez ").length)));
        }
    }
}