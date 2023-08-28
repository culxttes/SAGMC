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
        if (position !== "game_info") {
            let [messageClickEvents, messageHoverEvents] = getChatEvents(jsonMsg);
            if (!messageClickEvents.length) messageClickEvents = "";
            if (!messageClickEvents.length) messageHoverEvents = "";
            console.log(datestring() + " " +jsonMsg.toAnsi(), messageClickEvents, messageHoverEvents)    
        }
    }
}