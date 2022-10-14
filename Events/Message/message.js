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
    async execute(jsonMsg, position, sender, verified, client) {
        let [messageClickEvents, messageHoverEvents] = getChatEvents(jsonMsg);
        if (!messageClickEvents.length) messageClickEvents = "";
        if (!messageClickEvents.length) messageHoverEvents = "";
        console.log(datestring() + " " +jsonMsg.toAnsi(), messageClickEvents, messageHoverEvents)

        if (jsonMsg.toString().startsWith("Erreur:")){
            client.bot.emit("message_error", jsonMsg);
            return;
        }
        if (jsonMsg.toString().startsWith("[File d'attente] Vous rejoignez ")){
            client.bot.emit('join_mod', (jsonMsg.toString().slice(("[File d'attente] Vous rejoignez ").length)));
            return;
        }
        if (jsonMsg.toString().includes("--- [FunSecurity") || jsonMsg.toString() === "Le serveur a été stoppé."){
            client.bot.emit("hub");
            return;
        }
    }
}