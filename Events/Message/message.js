import { datestring } from "../../Utils/datestring.js";
import { Client } from "../../index.js"
import { getChatEvents } from "../../Utils/getChatEvents.js";

export default {
    name: "message",
    once: false,
    /**
    * 
    * @param {Client} client
    */
    async execute(message, position , client) {
        console.log(datestring() + " " +message.toAnsi())
        getChatEvents(message);
        if (message.toString().startsWith("Erreur:")){
            client.bot.emit("message_error", message);
            return;
        }
        if (message.toString().startsWith("[File d'attente] Vous rejoignez ")){
            client.bot.emit('join_mod', (message.toString().slice(("[File d'attente] Vous rejoignez ").length)));
            return;
        }
        if (message.toString().includes("--- [FunSecurity") || message.toString() === "Le serveur a été stoppé."){
            client.bot.emit("hub");
            return;
        }
    }
}